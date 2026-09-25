# DevWise

Jogo instrutivo de **programação e engenharia de software** com *knowledge tracing*, histórias de problemas reais e tutor com IA. Derivado do [ENEMWise](https://github.com/pedromilken/enemwise).

**Jogar:** https://pedromilken.github.io/DevWise/

## Página inicial

A rota inicial do `index.html` é uma página de apresentação: o que é a ferramenta, os números do banco, o ciclo das missões, a base curricular da SBC, o modelo de rastreamento, a cobertura de idiomas e a nota sobre onde os dados ficam. Quem já jogou vê ali o resumo do próprio progresso e o botão de continuar. Ela é acessível a qualquer momento pelo item **Início** do menu ou pelo nome do jogo.

## Como funciona

Você entra na Ponte, uma pequena casa de software que atende a padaria, o posto de saúde, a escola e a cooperativa do bairro. Cada uma das 14 missões (6 de programação e 8 de engenharia de software) segue três passos:

1. **História**: o cliente conta um problema real (o caixa que não fecha, a fila de triagem, o código que sumiu na sexta-feira).
2. **Arsenal teórico**: três conceitos essenciais, exemplo de código na linguagem escolhida e as competências dos *Referenciais de Formação para os Cursos de Graduação em Computação* da SBC (2017) que estão sendo treinadas.
3. **Tickets (teste)**: prever a saída, ordenar código embaralhado (problemas de Parsons), caçar o bug, **classificar cartões** (requisito funcional ou não funcional, paga ou aumenta a dívida técnica), **ordenar etapas de um processo** (sprint, TDD, esteira de entrega) ou tomar uma decisão de engenharia. Toda resposta traz explicação e analogia prática.

| Recurso | Detalhe |
|---|---|
| Modelo do estudante | **Elo/Rasch** com dificuldade de item e chute pilota o jogo; **TRI 3PL com EAP, BKT, PFA e AFM** rodam como sombras e registram no log a previsão feita antes de cada resposta |
| Sequenciamento | Grafo de pré-requisitos (60% libera, 95% domina); item escolhido pela dificuldade mais próxima do domínio atual |
| Banco de itens | 95 itens, com nível de Bloom e dificuldade. As habilidades de entrada (Variáveis, Condicionais, Requisitos, Git) têm 10 ou 11 itens; as demais, 5 ou 6 |
| Idiomas | Português, inglês e espanhol completos; registro dos 20 idiomas do estudo e gerador de pacotes para os demais |
| Linguagens de programação | Python, JavaScript, Java e C, com o mesmo gabarito nas quatro |
| Tutor com IA | Dicas socráticas e novas analogias via Anthropic, qualquer API compatível com OpenAI ou servidor local (Ollama); sem IA, usa as dicas autorais |
| Relatório | Domínio por habilidade, acerto por nível de Bloom, recomendações e exportação do registro em formato longo de KT |

### Exercícios de código livre

O estudante escreve a função pedida e recebe uma nota em porcentagem, calculada pelos casos de teste (alguns ocultos, para impedir soluções decoradas) mais 20% de verificação estrutural quando o item a define.

| Linguagem | Como é avaliada |
|---|---|
| JavaScript | Executa num Web Worker isolado, sem DOM nem rede, com limite de 4 s |
| Python | Executa com Pyodide, baixado de um CDN na primeira vez que um exercício de código em Python é aberto |
| Java e C | **Não rodam no navegador.** Só são avaliadas com um serviço de execução compatível com o Piston, configurado em Ajustes > Para docentes e pesquisa (endereço e, se exigido, token). Sem serviço, os exercícios de código nessas linguagens ficam ocultos no quadro e no desafio do dia, e um aviso explica o motivo |

O programa de teste em Java e C é gerado a partir da assinatura tipada de cada item (`sig`), compilado e executado no servidor; cada caso roda isolado, então uma exceção num caso não derruba os outros. Código que não compila ou não roda vale **0**, com a mensagem do compilador. Falha da infraestrutura (serviço fora do ar, sem autorização, Python sem download) **não gera nota**: a entrega simplesmente não é registrada.

Sobre o Piston: a API pública em `emkc.org` deixou de ser aberta em 15/02/2026 e passou a exigir um token, concedido pelo mantenedor a projetos educacionais sem fins comerciais. A alternativa é rodar uma instância própria (o projeto é de código aberto e roda em Docker).

Faixas: Irregular (até 39%), Regular (40 a 59%), Bom (60 a 79%), Ótimo (80 a 94%), Excelente (95% ou mais). A partir de **60%** conta como acerto para o modelo, e o XP é proporcional à nota. O chute nesses itens é de 2%, o menor do jogo, o que faz deles a evidência mais forte. A verificação estrutural (laço, condição, retorno) só entra como 20% da nota quando o código de fato executou.

O botão **Pedir ajuda ao tutor** manda ao LLM o código do estudante, o erro e os casos que falharam, pedindo que explique o que está acontecendo e faça uma pergunta que leve à correção, sem escrever a solução.

**Registro e limites.** Cada entrega guarda nota, resultado por caso, data, um SHA-256 do código e o processo (colagens, tamanho da maior colagem, execuções, tempo até a primeira tecla, tempo total). Isso aparece para o estudante e no relatório do docente. Prova que aquele código foi enviado naquele instante; **não prova autoria**, porque tudo é registrado no navegador do próprio estudante. Para avaliação com peso em nota, combine com trabalho supervisado ou defesa do código.

### Desafios extras: bônus no quadro e Oficina

Doze desafios de código (`extra:true` em `data.js`), dois por habilidade de programação, em dois tipos:

| Tipo | O que avalia | Exemplos |
|---|---|---|
| **Com restrição** (`kind:"rule"`) | o fundamento, sem as ferramentas prontas | multiplicar só com soma e `for`; potência sem `**`/`pow`; maior valor sem `max`; média sem `sum`/`reduce`; par ou ímpar sem `%`; inverter texto sem `reverse`; calculadora sem `eval`; soma de dígitos sem laço |
| **Livre** (`kind:"free"`) | a resolução do problema, do jeito do estudante | IMC com classificação; contar vogais; FizzBuzz; segundos em hh:mm:ss |

As restrições são escritas por linguagem (`forbid`/`require`, com `all` quando valem para todas) e verificadas no código **sem comentários e sem textos entre aspas**, para que um `*` numa mensagem não conte. Código que funciona mas quebra uma regra tem a nota **limitada a Regular (59%)**, abaixo do corte de acerto. É verificação estática: um estudante determinado consegue driblar; para aprender basta, para prova não.

- **Bônus no quadro**: um desafio por vez, da habilidade cuja missão já foi aberta. Vale **XP ×1,5** e **conta para o domínio** no Elo. Serve para juntar XP antes de um chefão.
- **Oficina** (aba própria): todos os desafios, abertos por habilidade conforme as missões. Treino livre: o estudante escolhe a linguagem dentro do desafio, erra e tenta de novo à vontade. **Não altera o domínio**; o XP vem só na primeira vez que o desafio passa de 60%, para não virar fonte de XP infinito.
- **Relatório**: o perfil de competências mostra, por habilidade, a nota média nos desafios bônus com restrição e nos livres, e a atividade na Oficina à parte.
- Exercícios de código não têm relógio em nenhum modo: escrever um programa em 60 segundos não mede competência.

As soluções de referência dos 12 desafios foram executadas nas quatro linguagens (48 combinações) contra todos os casos e todas as regras.

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

### Modelos de rastreamento: um piloto e quatro sombras

O estudante não escolhe o modelo: o Elo/Rasch pilota sempre, e as sombras registram previsões em toda resposta. Para um experimento, o pesquisador pode trocar o piloto só pelo endereço, com `?piloto=bkt`, `?piloto=pfa` ou `?piloto=afm` (a TRI é estática e nunca pilota). A seção **Para docentes e pesquisa**, recolhida nos Ajustes, reúne as configurações técnicas: regra de confirmação em outro dia, serviço de execução de código e tutor com IA.

A escolha segue o estudo de confundidores com o ENEM (estrutura do lado do item sustenta a acurácia; BKT, AFM e PFA preveem mal e leem dependência serial como aprendizagem). Elo/Rasch **não** foi testado naquele estudo: é a inferência de projeto para um jogo sem dados de treino, e por isso os demais modelos ficam registrando previsões para validação posterior.

| Modelo | Papel | Observação |
|---|---|---|
| Elo/Rasch (`elo`) | **piloto fixo**, domínio em 85% | Rasch online com chute por formato; ganho decrescente; erro pesa 70% |
| TRI 3PL com EAP (`irt`) | só sombra | grade de 81 pontos, só respostas anteriores, como o teto do estudo; é estático e por isso nunca pilota |
| BKT, PFA, AFM | sombra em toda resposta | parâmetros a priori |

- **Exportação para pesquisa** (Relatório > Seus dados > Baixar tabela para pesquisa): CSV longo, uma linha por resposta, esquema `devwise-kt-1`, com identificador pseudônimo aleatório por navegador (`student`), sessão e posição (derivadas pela mesma regra do jogo nas linhas antigas), item, habilidade, linguagem, `b`, `c`, acerto, nota (código livre), modo, piloto e dois conjuntos de previsões:
  - `pred_*`: previsão que cada modelo gravou no jogo, antes da resposta (só em registros `log_version` 2);
  - `rpred_*`: previsão reconstruída por **replay**, reprocessando o registro na ordem a partir do **mesmo prior neutro** para os cinco modelos. É a coluna para comparar modelos: independe do piloto, cobre linhas antigas e é reprodutível.
- Por que o replay existe: até a v7, ao trocar o BKT pelo Elo, os cinco modelos foram inicializados com a estimativa do BKT antigo, sem reprocessar o histórico, e deixaram de ser independentes. As previsões gravadas no jogo carregam esse viés; as do replay não.
- A TRI com EAP usa todo o histórico de respostas (sem janela), como o teto do estudo do ENEM.
- Limites a declarar num artigo: o piloto escolhe a dificuldade dos itens, então os dados nascem condicionados a ele; os parâmetros de BKT, PFA e AFM são a priori, não ajustados; o replay começa cada par habilidade × linguagem no prior neutro, sem a transferência entre linguagens usada no jogo; a Oficina não entra no registro de rastreamento.
- Cada linha do log traz `preds` (previsão de cada modelo antes da resposta), `pilot`, `b` e `c` do item, `session`, `pos` (posição na sessão) e `rt` (tempo de resposta em ms). Posição e tempo existem para os testes de efeito de posição e de chute rápido que o ENEM não permite.
- **Confirmação em outro dia**: alcançar o limiar numa sessão deixa a habilidade "a confirmar"; ela só conta como dominada com acerto em pelo menos dois dias. Sessão única tem embalo e fadiga que não são conhecimento.
- DKT, DKVMN, SAKT, AKT, SAINT e SimpleKT exigem treino com muitos alunos: treine-os fora do jogo com o log exportado, que já está no formato (estudante, posição, item, habilidade, acerto).
- Todos os parâmetros em `src/models.js` são a priori de projeto. Recalibre as dificuldades em `ITEM_B` com os logs reais.
- O relatório tem botão **Imprimir ou salvar em PDF**, com nome do estudante opcional, para uso do próprio aluno ou de docentes.

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

### Qualidade dos pacotes gerados e romanização

- `tools/estilo.json` fixa a **forma de tratamento** de cada idioma (du, kamu, sen, вы, আপনি, 你...) e notas sobre expressões idiomáticas. O gerador reprova blocos fora do padrão, tenta de novo e fica com a melhor tentativa.
- `tools/pos-edicao.json` guarda correções manuais, reaplicadas ao fim de cada geração. `node tools/gerar-idioma.js revisar` repassa os 17 pacotes pagando só pelos blocos reprovados; `node tools/gerar-idioma.js pos-edicao` reaplica as correções sem usar API.
- **Romanização** (botão `Aa` ao lado do seletor de idiomas): russo, coreano, hindi, marata, bengali, punjabi, tâmil e télugo são convertidos por regra no navegador (`src/rom.js`, ISO 15919 para as escritas brâmicas e Romanização Revisada para o coreano). Chinês, japonês, árabe e urdu dependem de dicionário ou de vogais que a escrita não registra, então usam mapas gerados por `node tools/gerar-idioma.js romanizar` (`src/rom-xx.js`).
- **Glossário por idioma** em `tools/estilo.json`: fixa o termo de palavras-chave (por exemplo, ticket = 工单 em chinês, görev em turco, задача em russo) e lista os termos a evitar (bilet, билет, 任务单). Nomes de modo citados em outros textos entram por marcador (`{d}`, `{h}`), então nunca ficam em inglês no meio da frase.
- `node tools/aplicar-patch.js traducoes.json` recebe o JSON de um ou vários idiomas traduzidos fora do gerador, confere contra o inglês (chaves, marcadores, tamanho e ordem dos arrays, escrita esperada, texto que ficou em inglês) e grava os `lang-xx.patch.js` aprovados. Idioma com problema não é gravado, e o relatório diz onde. O prompt pronto para esse fluxo está em `tools/prompt-16-idiomas.md`.
- **Traduções feitas fora do gerador** (revisão humana ou outro modelo) vão em `src/lang-xx.patch.js`, com `Object.assign(LANG.xx.ui, {...})` e `Object.assign(LANG.xx.items, {...})`. Esse arquivo é carregado depois de `lang-xx.js` e **nunca é sobrescrito** por uma nova geração; o gerador o lê para enxergar o texto final. É o caminho recomendado quando um idioma é revisado no Qwen Code ou por um falante nativo.
- **Revisão de qualidade** (`node tools/gerar-idioma.js avaliar`): um "editor nativo" (LLM) julga coesão, compreensão e naturalidade de cada texto contra a fonte, reescreve só o que reprova e explica o motivo em português em `tools/relatorio-qualidade.md`. As mudanças ficam em cache próprio e sobrevivem a novas gerações. Para independência, vale usar na avaliação um modelo diferente do que traduziu (basta trocar as variáveis de ambiente).
- **Furigana** (botão `ふ`, só em japonês): leitura em hiragana sobre cada kanji, gerada junto com o romaji e validada automaticamente: remover as leituras precisa devolver o texto original, caractere por caractere.
- O seletor mostra cada idioma no alfabeto original e em inglês, por exemplo `한국어 (Korean)`.

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
src/models.js     modelos de rastreamento (piloto e sombras)
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
