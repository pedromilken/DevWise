<#
  DevWise - laboratório de agentes: painel de cérebros para as quatro afirmações da tese.

  Uso (na pasta do repositório):
    powershell -ExecutionPolicy Bypass -File tools\agentes\rodar-painel.ps1
    powershell -ExecutionPolicy Bypass -File tools\agentes\rodar-painel.ps1 -Locais "" -Apis "deepseek:deepseek-chat"

  Para cada cérebro: triagem (critérios fixos; reprovado não entra) e, se aprovado, o estudo completo
  (20 idiomas, sem e com dialeto, 5 alunos, 3 repetições) na MESMA rodada dos cérebros anteriores.
  Tudo é retomável: rodar de novo o mesmo comando pula o que já foi feito.
#>
param(
  [string]$Rodada = "completo-2026-10-01",
  [string]$Locais = "llama3.1:8b,aya-expanse:8b,granite3.3:8b,gemma3:12b",
  [string]$Apis = "",
  [int]$Paralelo = 8
)
$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
$idiomas = "pt,en,es,zh,hi,fr,ar,bn,ru,ur,id,de,ja,mr,te,tr,ta,vi,ko,pa"
$comum = @("--dialeto", "ambos", "--idiomas", $idiomas, "--repeticoes", "3", "--alunos", "5", "--tickets", "80", "--rodada", $Rodada)

# Ollama (só se houver cérebros locais)
$ollama = $null
if ($Locais.Trim() -ne "") {
  $ollama = Join-Path $env:LOCALAPPDATA "Programs\Ollama\ollama.exe"
  if (-not (Test-Path $ollama)) { $c = Get-Command ollama -ErrorAction SilentlyContinue; if ($c) { $ollama = $c.Source } else { Write-Host "Ollama não encontrado. Instale com: winget install Ollama.Ollama" -ForegroundColor Red; exit 1 } }
}

# Chaves das APIs: pedidas uma vez, sem aparecer na tela, e só se ainda não estiverem definidas
function Pedir-Chave($var, $nome) {
  if ((Get-Item "env:$var" -ErrorAction SilentlyContinue).Value) { return }
  $sec = Read-Host "Cole a chave de $nome e dê Enter (ela não aparece na tela)" -AsSecureString
  $txt = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec))
  if ($txt.Length -lt 20) { Write-Host "Isso não parece uma chave ($($txt.Length) caracteres)." -ForegroundColor Red; exit 1 }
  Set-Item "env:$var" $txt
  Write-Host "Chave de $nome recebida ($($txt.Length) caracteres)."
}
foreach ($a in ($Apis.Split(",") | Where-Object { $_ -ne "" })) {
  switch ($a.Split(":")[0]) { "deepseek" { Pedir-Chave "DEEPSEEK_API_KEY" "DeepSeek" } "openai" { Pedir-Chave "OPENAI_API_KEY" "OpenAI" } "anthropic" { Pedir-Chave "ANTHROPIC_API_KEY" "Anthropic" } }
}

# Impede o Windows de hibernar enquanto esta janela estiver aberta
Add-Type -Namespace Win32 -Name Power -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint esFlags);'
[Win32.Power]::SetThreadExecutionState([uint32]"0x80000001") | Out-Null

$plano = @()
foreach ($m in ($Locais.Split(",") | Where-Object { $_ -ne "" })) { $plano += [pscustomobject]@{ spec = "ollama:$m"; nome = $m; local = $true } }
foreach ($a in ($Apis.Split(",") | Where-Object { $_ -ne "" })) { $plano += [pscustomobject]@{ spec = $a; nome = $a; local = $false } }
$inicio = Get-Date; $resumo = @()
Write-Host "`nPainel na rodada '$Rodada': $($plano.nome -join ', ')" -ForegroundColor Cyan

try {
  foreach ($p in $plano) {
    Write-Host "`n================ $($p.nome) ================" -ForegroundColor Cyan
    if ($p.local) {
      $lista = & $ollama list 2>$null | Out-String
      if ($lista -notmatch [regex]::Escape($p.nome)) { Write-Host "Baixando $($p.nome) ..."; & $ollama pull $p.nome }
    }
    $par = if ($p.local) { "1" } else { "$Paralelo" }
    node tools/agentes/laboratorio.js triagem --cerebro $p.spec --rodada $Rodada --paralelo $par
    if ($LASTEXITCODE -eq 2) { $resumo += "$($p.nome): reprovado na triagem (motivos no arquivo triagem-*.json da rodada)"; continue }
    if ($LASTEXITCODE -ne 0) { throw "a triagem de $($p.nome) falhou" }
    node tools/agentes/laboratorio.js piloto --cerebro $p.spec @comum --paralelo $par
    if ($LASTEXITCODE -ne 0) { throw "o estudo de $($p.nome) parou no meio" }
    $resumo += "$($p.nome): concluído"
  }
} catch {
  Write-Host "`n$($_.Exception.Message). Rode o MESMO comando para continuar de onde parou." -ForegroundColor Yellow
  [Win32.Power]::SetThreadExecutionState([uint32]"0x80000000") | Out-Null
  exit 1
}
[Win32.Power]::SetThreadExecutionState([uint32]"0x80000000") | Out-Null

node tools/agentes/laboratorio.js consolidar --rodada $Rodada | Out-Null
$zip = Join-Path (Split-Path -Parent $repo) "resultado-$Rodada.zip"
Compress-Archive -Path "agentes\saida\$Rodada" -DestinationPath $zip -Force
Write-Host "`nResumo:" -ForegroundColor Green; $resumo | ForEach-Object { Write-Host "  $_" }
Write-Host ("Concluído em {0:N1} h. Envie: {1}" -f ((Get-Date) - $inicio).TotalHours, $zip) -ForegroundColor Green
