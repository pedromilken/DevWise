# Revisão de naturalidade no Qwen Code

Passo a passo para revisar um pacote de idioma do DevWise com um modelo diferente do que traduziu.
Roda no modo **interativo** do Qwen Code, que é o uso permitido pelo Token Plan (scripts em lote não são).

---

## 1. Instalar o Qwen Code (uma vez só)

```powershell
npm install -g @qwen-code/qwen-code@latest
qwen --version
```

## 2. Abrir na pasta do repositório

```powershell
cd ~\Downloads\DevWise-repo\devwise
qwen
```

Na primeira vez ele pede autenticação: escolha a opção do **Alibaba Cloud Model Studio / Coding Plan** e cole a chave do painel.
O Qwen Code lê os arquivos da pasta em que foi aberto, então não é preciso anexar nada: basta citar o caminho no pedido.

## 3. Arquivos que a revisão usa

| Arquivo | Papel |
|---|---|
| `src/lang-xx.js` | o pacote a revisar (troque `xx` pelo código do idioma) |
| `src/lang-en.js` | a fonte em inglês, para comparação |
| `tools/estilo.json` | forma de tratamento, glossário e rubrica de qualidade |
| `tools/pos-edicao.json` | onde as correções ficam registradas no fim |

## 4. Prompt (cole trocando `{IDIOMA}` e `{xx}`)

> Você é professor nativo de {IDIOMA} e revisor de texto didático. Revise o arquivo `src/lang-{xx}.js` do DevWise, um jogo que ensina programação e engenharia de software a iniciantes adultos por meio de histórias e analogias do cotidiano.
>
> Compare cada texto com o equivalente em `src/lang-en.js` e aplique a rubrica e o glossário de `tools/estilo.json` (campos `rubrica`, `geral`, e a entrada do idioma `{xx}` com `tratamento` e `glossario`).
>
> Julgue três coisas: **coesão** (conectivos, referências claras, mesmo termo para a mesma coisa); **compreensão** (um iniciante adulto entende na primeira leitura?); **naturalidade** (é assim que falantes de {IDIOMA} realmente falam e escrevem, sem cheiro de tradução).
>
> Dê atenção especial aos itens acrescentados agora, cujas analogias podem não funcionar culturalmente: **v6 a v10, c6 a c10, q7 a q11, g7 a g11**. Se uma analogia não fizer sentido no país, troque a imagem mantendo exatamente o mesmo conceito ensinado.
>
> Regras que não podem ser quebradas:
> - não altere nenhuma chave do objeto, apenas os valores de texto;
> - preserve os marcadores entre chaves como `{n}`, `{s}`, `{x}`, `{d}`, `{h}`, `{p}`;
> - não altere código, identificadores, números, nomes próprios (Dona Lúcia, Rosa, Marta, Caio, Bia, Helena, Seu Antônio, Ponte, Pix, Roda Viva) nem os códigos da SBC;
> - **não mude a ordem dos arrays**: em `opts` a primeira opção é a resposta correta, e em `cards` a ordem corresponde ao gabarito;
> - mantenha o tamanho de todos os arrays;
> - não troque o conceito ensinado, os fatos nem os números.
>
> Primeiro **liste** cada mudança proposta numa tabela com: chave, texto antes, texto depois e motivo em português. Espere minha confirmação antes de editar o arquivo.

## 5. Conferir

Depois de aplicar as mudanças, ainda no PowerShell:

```powershell
node tests.js
python build.py
```

O `tests.js` deve dizer **OK: sem inconsistências**. Se acusar algo naquele idioma, peça ao Qwen para corrigir o ponto exato que ele reportou.

## 6. Registrar as correções

As mudanças precisam sobreviver a uma futura geração. Acrescente em `tools/pos-edicao.json`, na entrada do idioma, cada par `["texto antigo", "texto novo"]` das correções relevantes. Depois:

```powershell
node tools/gerar-idioma.js pos-edicao
```

(esse comando não usa API nenhuma)

## 7. Publicar

```powershell
git add -A
git commit -m "revisao de naturalidade em {xx} (Qwen)"
git push
```

---

## Ordem sugerida

Um idioma por vez, conferindo o consumo de Credits no painel entre eles:

1. **coreano** (`ko`) — pior alvo no estudo de tradução
2. **japonês** (`ja`)
3. **chinês** (`zh`)
4. **turco** (`tr`) — foi o que mais precisou de pós-edição manual

Se o pacote inteiro (100 a 230 KB) pesar demais numa sessão, peça a revisão **por partes**: primeiro `ui` e `skills`, depois os itens em dois blocos. O Qwen Code lê o arquivo por conta própria; basta dizer qual trecho revisar.
