<#
  DevWise - laboratório de agentes: rodada longa sem supervisão.

  Uso (na pasta do repositório):
    powershell -ExecutionPolicy Bypass -File tools\agentes\rodar-estudo.ps1 -Fase piloto
    powershell -ExecutionPolicy Bypass -File tools\agentes\rodar-estudo.ps1 -Fase completo

  piloto   : 5 idiomas, qwen3:8b e gemma3:4b, sem e com dialeto, 5 alunos, 3 repetições  (~2 h)
  completo : os 20 idiomas, mesmas configurações                                         (~7 h)

  Se parar no meio (queda de energia, reinício), rode o MESMO comando com a mesma -Rodada:
  o que já foi feito é retomado do disco.
#>
param(
  [ValidateSet("piloto", "completo")][string]$Fase = "piloto",
  [string]$Rodada = "",
  [string]$Cerebros = "qwen3:8b,gemma3:4b"
)
$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
if ($Rodada -eq "") { $Rodada = "$Fase-" + (Get-Date -Format "yyyy-MM-dd") }

# 1. Ollama: no caminho padrão ou no PATH
$ollama = Join-Path $env:LOCALAPPDATA "Programs\Ollama\ollama.exe"
if (-not (Test-Path $ollama)) {
  $c = Get-Command ollama -ErrorAction SilentlyContinue
  if ($c) { $ollama = $c.Source } else { Write-Host "Ollama não encontrado. Instale com: winget install Ollama.Ollama" -ForegroundColor Red; exit 1 }
}

# 2. Modelos: baixa só o que faltar
$lista = & $ollama list 2>$null | Out-String
foreach ($m in $Cerebros.Split(",")) {
  if ($lista -notmatch [regex]::Escape($m)) { Write-Host "Baixando $m ..."; & $ollama pull $m }
}
$specs = ($Cerebros.Split(",") | ForEach-Object { "ollama:$_" }) -join ","

# 3. Impede o Windows de hibernar enquanto esta janela estiver rodando (sem precisar de administrador)
Add-Type -Namespace Win32 -Name Power -MemberDefinition '[DllImport("kernel32.dll")] public static extern uint SetThreadExecutionState(uint esFlags);'
[Win32.Power]::SetThreadExecutionState([uint32]"0x80000001") | Out-Null

$idiomas = if ($Fase -eq "piloto") { "pt,en,zh,hi,ar" } else { "pt,en,es,zh,hi,fr,ar,bn,ru,ur,id,de,ja,mr,te,tr,ta,vi,ko,pa" }
$inicio = Get-Date
Write-Host "`nRodada '$Rodada' | fase $Fase | cérebros $Cerebros | idiomas $idiomas" -ForegroundColor Cyan
Write-Host "Pode deixar rodando. O Windows não vai hibernar enquanto esta janela estiver aberta.`n"

try {
  node tools/agentes/laboratorio.js piloto --cerebros $specs --dialeto ambos --idiomas $idiomas --repeticoes 3 --alunos 5 --tickets 80 --rodada $Rodada
  $ok = ($LASTEXITCODE -eq 0)
} finally {
  [Win32.Power]::SetThreadExecutionState([uint32]"0x80000000") | Out-Null   # devolve o controle de energia ao Windows
}

if (-not $ok) {
  Write-Host "`nA rodada parou antes do fim. Para continuar de onde parou:" -ForegroundColor Yellow
  Write-Host "  powershell -ExecutionPolicy Bypass -File tools\agentes\rodar-estudo.ps1 -Fase $Fase -Rodada $Rodada"
  exit 1
}

# 4. Consolida e compacta FORA do repositório
node tools/agentes/laboratorio.js consolidar --rodada $Rodada
$zip = Join-Path (Split-Path -Parent $repo) "resultado-$Rodada.zip"
Compress-Archive -Path "agentes\saida\$Rodada" -DestinationPath $zip -Force
$dur = (Get-Date) - $inicio
Write-Host ("`nConcluído em {0:N1} h. Envie este arquivo: {1}" -f $dur.TotalHours, $zip) -ForegroundColor Green
