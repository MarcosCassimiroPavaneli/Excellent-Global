[PROTOCOLO DE CONTROLE E RESTRIÇÃO DE EXECUÇÃO - STRICT MODE]

ATENÇÃO: Interrompa imediatamente qualquer loop de execução, criação descontrolada de abas/processos no navegador e chamadas recursivas que estão sobrecarregando a memória e travando o sistema.

Aplique as seguintes diretrizes restritas de ambiente a partir de agora:

1. PROIBIÇÃO DE NOVAS ABAS / MULTI-PROCESSOS:
   - Não abra novas instâncias de navegador nem dispare comandos automáticos para abrir abas repetidas do `localhost` ou links externos.
   - Todo o ciclo de visualização deve ser mantido restrito a uma única porta/instância de visualização já aberta.

2. CONTENÇÃO DE PROCESSOS E MEMÓRIA:
   - Limite a execução de scripts em segundo plano.
   - Desative hot-reloads infinitos, watchers redundantes ou loops de auto-correção que fiquem disparando recompilações contínuas.
   - Elimine polling excessivo ou requisições em loop no frontend.

3. EXECUÇÃO DETERMINÍSTICA E DIRETA:
   - Não execute comandos em lote sem autorização explícita.
   - Faça alterações pontuais apenas nos arquivos estritamente solicitados.
   - Responda apenas com a confirmação da alteração ou o código direto sem disparar autotestes que instanciem novos processos no sistema operacional.
   # REGRAS PERMANENTES DE EXECUÇÃO DO SISTEMA (INVIOLÁVEL)
- PROIBIDO ABERTURA DE NAVEGADORES: Nunca execute comandos como `start`, `open`, `explorer` ou lance instâncias com `headless: false`.
- TESTES E SCRAPERS: Todos os scripts com Playwright/Puppeteer DEVEM usar estritamente `headless: true`.
- GESTÃO DE PORTAS: Antes de iniciar servidores locais, verificar e matar processos órfãos na porta 3000 para evitar sobrecarga de memória RAM.
- ENTREGA SILENCIOSA: O agente deve finalizar qualquer tarefa entregando apenas a URL em formato de texto no terminal, sem disparar aberturas automáticas.
