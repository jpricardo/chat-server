# Correção App
Um app web (server + client), que corrige arquivos submetidos a partir de um gabarito.

## Como funciona?

- Pra instalar as dependências, use `cd <pasta_do_projeto> && npm install`.
- Após a instalação, rode o projeto com `npm start`.

### Server

- O Server será aberto, por padrão, na porta 3000 do localhost.
- O gabarito está em `src/gabarito.txt`, e deve seguir o padrão especificado no exercício.
- O server escuta eventos `'fileUpload'`, converte o arquivo em uma lista de objetos e a compara com o gabarito.
- Ao fim da correção, é emitido um evento `'resultado'` para o socket, com o número de acertos.

### Client

- Com o servidor aberto, acesse `localhost:3000`.
- O arquivo selecionado deve seguir o padrão especificado.
- Após o envio, será emitido um evento `'fileUpload'`.
- O client escuta eventos `'resultado'`, e exibe os dados recebidos na página.


### Problemas conhecidos

- Caso o arquivo não siga o padrão, erros podem ocorrer.
