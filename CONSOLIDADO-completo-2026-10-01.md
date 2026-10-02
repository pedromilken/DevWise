# Consolidado da rodada completo-2026-10-01

Cada linha: um cérebro num modo. Médias com intervalo de 95% por bootstrap de idiomas inteiros (alunos do mesmo idioma não são independentes), partida fixa, prior correto.

## Alarme falso (engenharia de software, nada a aprender)

| Cérebro | Dialeto | n | ELO | IRT | BKT | PFA | AFM |
|---|---|---|---|---|---|---|---|
| ollama:gemma3:4b | não | 100 | -0.08 [-0.10, -0.06] | -0.12 [-0.15, -0.11] | -0.01 [-0.03, 0.01] | +0.06 [0.04, 0.08] | +0.07 [0.05, 0.09] |
| ollama:gemma3:4b | sim | 100 | -0.06 [-0.09, -0.02] | -0.10 [-0.14, -0.06] | +0.01 [-0.02, 0.05] | +0.08 [0.05, 0.12] | +0.10 [0.06, 0.13] |
| ollama:qwen3:8b | não | 100 | -0.01 [-0.03, 0.01] | -0.02 [-0.04, 0.00] | +0.04 [0.02, 0.05] | +0.06 [0.04, 0.08] | +0.06 [0.04, 0.08] |
| ollama:qwen3:8b | sim | 100 | -0.02 [-0.04, 0.01] | -0.03 [-0.05, -0.01] | +0.02 [-0.00, 0.04] | +0.05 [0.03, 0.07] | +0.05 [0.03, 0.07] |

## Excesso em programação (com dialeto, onde há aprendizagem real)

| Cérebro | Ganho verdadeiro | ELO | IRT | BKT | PFA | AFM |
|---|---|---|---|---|---|---|
| ollama:gemma3:4b | +0.08 [0.05, 0.11] | -0.08 [-0.11, -0.05] | -0.12 [-0.16, -0.09] | +0.01 [-0.01, 0.04] | +0.06 [0.02, 0.09] | +0.21 [0.18, 0.24] |
| ollama:qwen3:8b | +0.16 [0.12, 0.20] | -0.11 [-0.14, -0.07] | -0.15 [-0.18, -0.12] | -0.03 [-0.06, 0.00] | +0.05 [0.02, 0.08] | +0.06 [0.03, 0.09] |

## Mascaramento pela adaptação

| Cérebro | Dialeto | Δ verdade, adaptativa | Δ verdade, fixa |
|---|---|---|---|
| ollama:gemma3:4b | não | -0.18 [-0.21, -0.15] | +0.09 [0.08, 0.11] |
| ollama:gemma3:4b | sim | -0.22 [-0.24, -0.20] | +0.10 [0.07, 0.12] |
| ollama:qwen3:8b | não | -0.11 [-0.13, -0.07] | +0.03 [0.01, 0.05] |
| ollama:qwen3:8b | sim | -0.09 [-0.14, -0.04] | +0.09 [0.07, 0.12] |

## Todos juntos (400 unidades)

| Modelo | Alarme falso | Excesso em programação (só com dialeto) |
|---|---|---|
| ELO | -0.04 [-0.05, -0.03] | -0.10 [-0.12, -0.07] |
| IRT | -0.07 [-0.09, -0.06] | -0.14 [-0.16, -0.11] |
| BKT | +0.01 [-0.00, 0.02] | -0.01 [-0.03, 0.01] |
| PFA | +0.06 [0.04, 0.07] | +0.05 [0.03, 0.07] |
| AFM | +0.07 [0.05, 0.08] | +0.13 [0.11, 0.16] |

## Idiomas: custo de tokens e viés da medida

Por cérebro: custo de tokens de entrada relativo ao inglês, e correlação de Spearman (entre idiomas) desse custo com o excesso dos modelos onde não há o que aprender, com p por permutação. Sinais opostos entre cérebros indicam que o viés é do par cérebro × idioma, não do idioma.

**ollama:gemma3:4b** · custo: pa 1.90×, te 1.45×, ur 1.27×, ta 1.25×, ko 1.25×, tr 1.22×, ar 1.21×, mr 1.21×, vi 1.20×, fr 1.18×, hi 1.18×, de 1.17×, ru 1.17×, bn 1.15×, ja 1.13×, es 1.12×, pt 1.11×, id 1.10×, zh 1.04×, en 1.00×

| Modelo | ρ (custo × excesso) | p |
|---|---|---|
| ELO | +0.08 | 0.747 |
| IRT | -0.07 | 0.783 |
| BKT | +0.33 | 0.151 |
| PFA | +0.51 | 0.022 |
| AFM | +0.57 | 0.011 |

**ollama:qwen3:8b** · custo: te 4.29×, pa 4.13×, ta 3.55×, bn 2.95×, hi 2.75×, mr 2.66×, ur 2.17×, ko 1.35×, tr 1.34×, ru 1.33×, ja 1.29×, ar 1.26×, de 1.26×, id 1.25×, fr 1.25×, vi 1.19×, es 1.19×, pt 1.17×, zh 1.05×, en 1.00×

| Modelo | ρ (custo × excesso) | p |
|---|---|---|
| ELO | -0.58 | 0.011 |
| IRT | -0.74 | 0.001 |
| BKT | -0.45 | 0.053 |
| PFA | -0.24 | 0.306 |
| AFM | -0.26 | 0.274 |



Gravado em agentes/saida/completo-2026-10-01/CONSOLIDADO.md
