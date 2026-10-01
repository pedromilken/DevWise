# Laboratório de agentes (tese STUDx: QP2, QP3, QP4)

Agente = **cérebro** (um LLM) + **base de conhecimento** (as notas que ele "estudou": o arsenal teórico do DevWise, no idioma do jogo).

| Papel | Pergunta | O que faz |
|---|---|---|
| Aprendiz | QP3, QP4 | joga o motor do DevWise com notas controladas: C0 sem notas (vazamento), C1 com todas (sem aprendizagem), C2 partida real com as notas chegando depois do 3º ticket de cada habilidade (degrau num instante conhecido), C3 = C2 embaralhado |
| Tutor | QP2 | diante de um erro simulado, escreve uma dica sem dar a resposta, por três estratégias: S1 geração direta no idioma-alvo, S2 RAG localizado, S3 gera em inglês e traduz |

**Notas** (`--notas ricas`, o padrão, ou `--notas basicas`): básicas são os três conceitos do arsenal teórico; ricas acrescentam até quatro exemplos resolvidos, as explicações de outros tickets da mesma habilidade, nunca do ticket respondido. Na partida, o agente recupera só as notas da habilidade do ticket.

**Dialeto cifrado** (`--dialeto sim`, `nao` ou `ambos`): nos itens de programação, as palavras-chave do JavaScript viram palavras inventadas, com **um dialeto por habilidade** (o `if` de Condicionais é `nataki`, o de Laços é outro). As notas trazem o dicionário da habilidade. Sem notas, o código fica ilegível até para quem sabe programar; com notas, volta a ser legível: um degrau limpo e por habilidade. Os itens de engenharia de software ficam sem dialeto e servem de controle interno. O degrau medido é o de aprender um vocabulário, não programação: serve para validar instrumentos de KT. Com `ambos`, cada cérebro roda sem e com dialeto, e as pastas de saída com dialeto terminam em `-dialeto`.

A verdade de cada resposta da C2 é **medida** (taxa de acerto do mesmo item em C0 antes do degrau, em C1 depois), não suposta. Os cinco modelos do jogo (Elo/Rasch, TRI 3PL, BKT, PFA, AFM) são avaliados por AUC, Brier contra a verdade, viés item a item antes e depois do degrau (positivo depois do degrau é aprendizagem fantasma) e queda sob embaralhamento.

## Piloto (uma hora, um cérebro local, cinco idiomas)

    winget install Ollama.Ollama
    ollama pull qwen3:8b
    node tools/agentes/laboratorio.js calibrar --cerebro ollama:qwen3:8b
    node tools/agentes/laboratorio.js piloto --cerebro ollama:qwen3:8b --idiomas pt,en,zh,hi,ar --minutos 60

Sem LLM, para testar o encanamento: `--cerebro simulado`.

Outros cérebros: `openai:<modelo>` (com `OPENAI_BASE_URL` e `OPENAI_API_KEY`; serve para DeepSeek, Qwen pago por uso, GPT e Gemini compatível) e `anthropic:<modelo>` (com `ANTHROPIC_API_KEY`). O Token Plan do Qwen não serve: proíbe uso em lote.

Saída em `agentes/saida/<data>-<cérebro>/`: `medicao.csv` (C0/C1), `jogo.csv` (C2, com previsões online e de replay e a verdade medida), `tutores.jsonl` (dicas, para LaBSE depois) e `RESUMO.md`.

## Limites

Agentes não cansam, não esquecem e já sabem programação (a C0 mede isso). O laboratório valida **instrumentos de medida**; não substitui aprendizes reais (Fase 5). No piloto, as notas são recuperadas pela habilidade do ticket; o estudo completo usa embeddings multilíngues.
