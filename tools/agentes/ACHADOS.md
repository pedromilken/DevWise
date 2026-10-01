# Laboratório de agentes: achados

> **Atualização (piloto com variância, 1º/10/2026, 100 unidades):** qwen3:8b e gemma3:4b, sem e com dialeto, 5 idiomas, 5 alunos, 3 repetições, partida fixa e prior correto, intervalos de 95% por bootstrap. Os números da seção 5 abaixo, de um aluno só, **estavam inflados pelo ruído** e foram substituídos pela tabela da seção 0.

## 0. Piloto com variância (o que vale hoje)

| Modelo | Excesso onde não há o que aprender | Excesso onde há aprendizagem (programação com dialeto) | Leitura |
|---|---|---|---|
| Elo/Rasch | −0,05 [−0,07; −0,03] | −0,10 [−0,13; −0,07] | subestima de forma consistente |
| TRI 3PL (EAP) | −0,07 [−0,09; −0,05] | −0,15 [−0,19; −0,12] | cega para aprendizagem |
| **BKT** | **+0,00 [−0,02; 0,02]** | **−0,01 [−0,04; 0,02]** | sem viés nos dois regimes |
| PFA | +0,05 [0,02; 0,06] | +0,04 [0,00; 0,07] | exagera um pouco |
| AFM | +0,05 [0,03; 0,06] | +0,11 [0,08; 0,15] | exagera, mais onde há prática |

- **Mascaramento pela adaptação**, nas 4 combinações: a verdade cai na partida adaptativa (de −0,10 a −0,21, intervalos longe do zero) e sobe na fixa quando há aprendizagem (+0,09 a +0,12).
- **Ganho real com o dialeto** em programação: +0,11 [0,05; 0,17] no gemma3:4b e +0,17 [0,13; 0,24] no qwen3:8b.
- **O viés dos modelos varia com o idioma**: em hindi, BKT (+0,05) e AFM (+0,10) exageram mais do que em português (−0,02 e +0,02). O instrumento de medida pode ser desigual entre idiomas (QP4). Preliminar: intervalos de idiomas vizinhos se sobrepõem.
- **Custo do hindi** para o Qwen: 2,69× e 2,74× o inglês; no Gemma, no máximo 1,21×. Terceira replicação.
- A ordem dos modelos (Elo e TRI abaixo, BKT no meio, PFA e AFM acima) se repete nos dois cérebros; os valores absolutos mudam de um cérebro para outro.

---

*Abaixo, o registro das rodadas exploratórias de um aluno por condição (mantido para a história do método).*

# Rodadas exploratórias (1º de outubro de 2026)

Rodadas locais (Ollama, RTX 5070) com cinco cérebros: qwen3:8b, gemma3:4b, qwen3:1.7b, gemma3:1b e llama3.2:1b. Cinco idiomas (pt, en, zh, hi, ar), 95 itens sem código, 3 repetições por condição. Tudo aqui é **preliminar**: um aluno simulado por idioma e por condição, de 100 a 500 respostas por análise. Os números servem para orientar o desenho do estudo completo, não para afirmar resultados.

## 1. Conhecimento prévio domina os cérebros capazes

Sem notas, o qwen3:8b acerta 95% de 59 dos 95 itens. Notas ricas (conceitos e exemplos resolvidos de outros tickets) acrescentam no máximo +0,11 em média (gemma3:4b). Os cérebros de 1b não aproveitam nem as notas nem o dicionário do dialeto: **o desenho pede pelo menos ~4 bilhões de parâmetros**.

## 2. O dialeto cifrado cria um degrau pequeno, mas real, e preserva o controle

Com as palavras-chave do código trocadas por um vocabulário inventado por habilidade, o acerto sem notas em programação cai (qwen3:8b de 0,80 para 0,62) e as notas recuperam parte (ganho de +0,15). Os itens de engenharia de software, sem dialeto, ficam idênticos nos dois modos: o controle interno funciona. O degrau medido é de aprender um vocabulário, não programação.

## 3. A seleção adaptativa esconde a aprendizagem (6 de 6 rodadas)

Na partida real, o Elo escolhe itens cada vez mais difíceis conforme o aluno melhora, e a taxa de acerto **cai** mesmo com o aluno aprendendo (qwen3:8b com dialeto: de 0,86 para 0,66). Na partida fixa, com os mesmos itens em ordem aleatória, ela fica estável ou **sobe** (de 0,77 para 0,84). Taxa de acerto observada num tutor adaptativo não é medida de aprendizagem.

## 4. Um prior mal calibrado se disfarça de aprendizagem

Começando dos 15% de domínio do jogo, todos os modelos previram ganhos de +0,15 a +0,48 nos itens de engenharia de software, onde o ganho real era zero: estavam só alcançando um aluno que já acertava 60% a 90%. O AFM previu exatamente **+0,39 em todas as rodadas**, porque modela a aprendizagem só pela contagem de oportunidades, sem olhar acertos. Toda comparação de modelos precisa controlar o prior.

## 5. Com o prior correto, cada modelo tem um caráter de detector

Prior correto = cada habilidade começa do acerto medido do agente sem notas.

*Substituída pela seção 0: um aluno por condição superestimou os exageros.*

| Modelo | Alarme falso (6 rodadas) | Fração da aprendizagem real detectada (3 rodadas com dialeto) | Leitura |
|---|---|---|---|
| Elo/Rasch | −0,02 | 0,23 | não inventa, mas enxerga pouco: conservador |
| TRI 3PL (EAP) | −0,05 | ≈ 0 | estática por construção: cega para aprendizagem |
| BKT | +0,04 | 1,43 | o mais próximo do real, com algum exagero |
| PFA | +0,10 | 2,36 | infla a aprendizagem |
| AFM | +0,11 | 3,85 | infla muito: aprendizagem proporcional à prática |

*Alarme falso* = ganho previsto além do verdadeiro onde não há o que aprender. *Fração detectada* = ganho previsto dividido pelo verdadeiro (1,0 é perfeito). As frações são ruidosas: os ganhos reais foram pequenos (+0,06 a +0,13), e uma razão sobre um número pequeno oscila muito.

Convergência com o artigo do ENEM: lá, sem aprendizagem possível, os modelos com estrutura de aprendizagem "viam" ganho; aqui, com a verdade medida item a item, o mesmo padrão aparece, e se estende ao caso em que a aprendizagem existe.

## 6. Desigualdade entre idiomas (QP4)

**Custo de tokens** das mesmas tarefas, relativo ao inglês: hindi **2,60× e 2,69×** nos dois Qwen, 1,66× no llama3.2:1b, 1,07× a 1,14× nos Gemma. A desigualdade de tokenização depende da família do modelo (ressalva: o Ollama pode não contar trechos reaproveitados do cache; recontar com o tokenizador de cada modelo).

**Obediência ao formato**: o gemma3:4b respondeu no formato pedido 100% das vezes em inglês, chinês e árabe, 87% em português e 79% em hindi, traduzindo a palavra "ANSWER". O llama3.2:1b foi de 38% em inglês a 3% em hindi.

## 7. Tutores (QP2), com 8 itens por idioma

A escrita saiu no sistema certo nos 5 idiomas em todas as estratégias. Dos 4 vazamentos da resposta encontrados (todos reais, lidos um a um), 3 vieram da estratégia com RAG: dar notas e exemplos ao tutor melhora a terminologia (chrF do hindi de 17,7 para 22,8), mas aumenta a chance de ele entregar a resposta.

## O que falta para virar resultado

- mais de um aluno simulado por condição, para ter variância e intervalos;
- ganhos de aprendizagem maiores, para que a fração detectada deixe de ser ruidosa;
- os 20 idiomas, e não 5;
- recontagem de tokens com o tokenizador de cada modelo;
- a comparação com aprendizes reais (Fase 5), que nenhum destes resultados substitui.
