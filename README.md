# Dictionary

Aplicativo de dicionário de inglês desenvolvido em Angular.

Realizado como teste de Desenvolvimento Front-End para Coodesh.

>  This is a challenge by [Coodesh](https://coodesh.com/)

Pode ser visualizado rapidamente no endereço: [https://dazzling-davinci.netlify.app/](https://dazzling-davinci.netlify.app/)

Para rodar localmente, baixe o repositório e execute os seguintes comandos (será necessário instalar o http-server):

```
npm i

ng build

http-server -p 8080 -c-1 dist/dictionary
```

## Recursos

- Carrega palavras aleatórias infinitamente ao rolar a lista na página inicial.
- Permite consultar uma palavra diretamente pela URL acrescentando-a logo após o endereço da raiz do site.
- Sinônimos e antônimos também funcionam como links de consulta.  
- Armazena informações das palavras consultadas previamente em cache local.
- Armazena histórico e favoritos em cache local.
- Totalmente responsivo para computadores e dispositivos móveis.
- Funciona off-line com dados armazenados anteriormente (PWA).

## Testes

(Em progresso)

```
ng test
```

## Dependências

- Angular
- SASS (SCSS)
- ngx-infinite-scroll
- word-list-json
- karma-jasmine

NodeJS versão 16.13.0
