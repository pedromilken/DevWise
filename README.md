# DevWise

Jogo instrutivo de **programação e engenharia de software** com *knowledge tracing*, histórias de problemas reais e tutor com IA. Derivado do [ENEMWise](https://github.com/pedromilken/enemwise).

**Jogar:** https://pedromilken.github.io/DevWise/

## Como funciona

Você entra na Ponte, uma pequena casa de software que atende a padaria, o posto de saúde, a escola e a cooperativa do bairro. Cada uma das 14 missões (6 de programação e 8 de engenharia de software) segue três passos:

1. **História**: o cliente conta um problema real (o caixa que não fecha, a fila de triagem, o código que sumiu na sexta-feira).
2. **Arsenal teórico**: três conceitos essenciais, exemplo de código na linguagem escolhida e as competências dos *Referenciais de Formação para os Cursos de Graduação em Computação* da SBC (2017) que estão sendo treinadas.
3. **Tickets (teste)**: prever a saída, ordenar código embaralhado (problemas de Parsons), caçar o bug, **classificar cartões** (requisito funcional ou não funcional, paga ou aumenta a dívida técnica), **ordenar etapas de um processo** (sprint, TDD, esteira de entrega) ou tomar uma decisão de engenharia. Toda resposta traz explicação e analogia prática.

| Recurso | Detalhe |
|---|---|
| Modelo do estudante | Bayesian Knowledge Tracing por habilidade; chute ajustado ao tipo de item; pedido de dica enfraquece a evidência |
| Sequenciamento | Grafo de pré-requisitos (60% libera, 95% domina); item escolhido pela dificuldade mais próxima do domínio atual |
| Banco de itens | 75 itens (30 de programação e 45 de engenharia de software), com nível de Bloom e dificuldade |
| Idiomas | Português, inglês e espanhol completos; registro dos 20 idiomas do estudo e gerador de pacotes para os demais |
| Linguagens de programação | Python, JavaScript, Java e C, com o mesmo gabarito nas quatro |
| Tutor com IA | Dicas socráticas e novas analogias via Anthropic, qualquer API compatível com OpenAI ou servidor local (Ollama); sem IA, usa as dicas autorais |
| Relatório | Domínio por habilidade, acerto por nível de Bloom, recomendações e exportação do registro em formato longo de KT |

### Camada de jogo

| Mecânica | Regra |
|---|---|
| Duas contas de XP | **Saldo** (gasta-se na loja e perde-se nos erros) e **XP acumulado** (nunca diminui; abre fases e chefões) |
| Dificuldade | Normal ×1, Médio ×1,5, Difícil ×2, Extra hardcore ×3. A partir do Difícil não há dicas e os tickets de saída pedem resposta digitada; no Extra hardcore há relógio de 60 s |
| Penalidade | Erro custa 2, 4, 6 ou 10 XP do saldo por nível do ticket, conforme o modo |
| Fases trancadas | Cada missão exige 60% de domínio nos pré-requisitos **e** um mínimo de XP acumulado (`GATES` em `src/game.js`) |
| Desafios extras | Três desafios por sprint e um desafio do dia com XP em dobro |
| Chefões | Três combates de 3 fases, sem dicas, com um único erro permitido; rendem XP e troféu |
| Loja | Poderes (Escudo, Eliminar duas, Tempo extra, XP em dobro) e títulos |

A resposta digitada reduz a probabilidade de chute do BKT de 25% para 3%, então acertos nos modos difíceis são evidência mais forte de domínio. Poderes que facilitam a resposta (dica, Eliminar duas) enfraquecem a evidência.

### Evolução e linguagens de programação

- **Evolução do conhecimento**: o relatório traça a curva de domínio de cada habilidade ao longo dos tickets (acertos em verde, erros em âmbar), com as linhas de desbloqueio (60%) e domínio (95%) e a tabela de ganho em pontos percentuais.
- **Um rastreador por linguagem**: habilidades de programação têm BKT separado para Python, JavaScript, Java e C. Ao estrear numa linguagem, a estimativa inicial é uma priori de transferência: `L0 + 0,5 x (melhor domínio nas outras - L0)` (`TRANSFER` em `src/app.js`). Habilidades de engenharia de software são independentes de linguagem.
- O registro exportado guarda `pl` (linguagem), `lang` (idioma), `mode`, `sprint` e a ordem `i` de cada interação.

### Idiomas do estudo multilíngue

`STUDY_LANGS` (`src/data.js`) registra os 20 idiomas da análise de tradução e tokenização, com código FLORES-200, escrita, direção (árabe e urdu são RTL) e custo em tokens por 1000 caracteres. Hoje há pacote completo para **pt, en e es**; os outros 17 são gerados por:

```bash
# PowerShell: $env:ANTHROPIC_API_KEY="..."      bash: export ANTHROPIC_API_KEY=...
node tools/gerar-idioma.js hi          # um idioma
node tools/gerar-idioma.js todos       # todos os pendentes
node tools/gerar-idioma.js hi --mock   # ensaio sem API
node tests.js && python build.py       # valida e publica
```

Também aceita `OPENAI_API_KEY` com `OPENAI_BASE_URL` (DeepSeek, Qwen, Ollama) e `DEVWISE_MODEL`. O script valida chaves, tamanhos de lista, marcadores `{x}`, ordem das opções e presença da escrita esperada; **não** valida naturalidade nem correção pedagógica, então cada pacote pede revisão de um falante antes de ir ao ar. A chave é lida só de variável de ambiente; nunca versione arquivos `.env`.

### Mapeamento para a SBC

| Habilidades | Competências |
|---|---|
| Variáveis, Condicionais, Laços, Funções | RF-CC C.1.3; RF-ES C.1.1 e C.6.4 |
| Coleções, Recursão | RF-CC C.1.3; RF-ES C.1.1 |
| Requisitos | RF-ES C.5.3 |
| Ágil | RF-ES C.4.2 e C.4.4 |
| Git | RF-ES C.6.3 |
| Testes | RF-ES C.6.2 e C.7.3 |
| Design | RF-ES C.6.1, C.6.7 e C.4.3 |
| Modelagem | RF-ES C.5.4 |
| Qualidade | RF-ES C.7.1, C.7.2 e C.6.2 |
| Entrega contínua | RF-ES C.6.5 e C.6.3 |

## Estrutura

```
index.html        arquivo único gerado, é o que o GitHub Pages serve
build.py          junta src/ em index.html
tools/gerar-idioma.js  gera o pacote de um idioma do estudo via LLM, com validação
tests.js          consistência do banco (3 idiomas x 4 linguagens) e simulação do motor
src/game.js       modos, portões de XP, loja, desafios e chefões
src/data.js       habilidades, mapeamento SBC, exemplos e itens com código
src/lang-pt.js    textos em português (en e es seguem o mesmo formato)
src/app.js        motor BKT, telas, tutor com IA
src/style.css
```

```bash
python3 build.py   # gera index.html
node tests.js      # valida o banco e simula um estudante
```

## Como ampliar

- **Novo idioma**: copie `src/lang-pt.js` para `src/lang-xx.js`, troque `LANG.pt` por `LANG.xx`, traduza e acrescente o arquivo à lista `order` de `build.py`. O seletor de idioma aparece sozinho; chaves ausentes caem no português.
- **Novo item**: acrescente a entrada em `ITEMS` (`src/data.js`) e os textos em cada `lang-*.js`. Em itens de múltipla escolha, a primeira opção é a correta. `node tests.js` acusa o que faltar.
- **Nova linguagem de programação**: acrescente a chave em `PLS` e o código correspondente em cada item e em `EX`.

## Publicação no GitHub Pages

Settings > Pages > Deploy from a branch > `main` / `(root)`.

## Tutor com IA e privacidade

A chave de API informada em Ajustes fica apenas no `localStorage` do navegador e é enviada direto ao provedor. Para uso em sala, prefira um servidor local (Ollama em `http://localhost:11434/v1`), que dispensa chave. O progresso do estudante também fica só no navegador.

## Referências

- SBC. *Referenciais de Formação para os Cursos de Graduação em Computação*. 2017.
- Corbett, A. T.; Anderson, J. R. Knowledge tracing: modeling the acquisition of procedural knowledge. *UMUAI*, 1995.
- Abdelrahman, G.; Wang, Q.; Nunes, B. P. Knowledge Tracing: A Survey. *ACM Computing Surveys*, 2023.
- Parsons, D.; Haden, P. Parson's programming puzzles. *ACE*, 2006.
