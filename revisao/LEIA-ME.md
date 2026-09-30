# Revisão dos textos

Cada pasta tem `auditoria.txt` (o que o computador achou sozinho) e `parte-NN.md` (prompt + textos).

**Com o Qwen Code** (lê os arquivos sozinho), aberto na pasta do repositório:

> Leia revisao/zh/parte-01.md e faça exatamente o que ele pede. Salve só o JSON da resposta em revisao/zh/correcoes-01.json. Depois faça o mesmo com as próximas partes, sem pedir confirmação.

**No chat do Qwen**: abra a parte num editor, copie TUDO e cole na caixa de mensagem (não anexe o arquivo: anexo vira resumo). Salve o JSON da resposta como `correcoes-01.json` na mesma pasta.

**Aplicar** (valida marcadores, listas e caminhos; o que estiver errado é recusado com o motivo):

    node tools/aplicar-patch.js revisao/zh/correcoes-01.json --lang zh
    node tests.js
    python build.py
