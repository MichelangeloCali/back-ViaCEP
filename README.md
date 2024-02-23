# Via Cep [BACKEND]

Esse é o repositório backend da API que se comunica com a Via Cep API e cumpre as regras do [desafio](https://swift-harrier-37f.notion.site/Avalia-o-t-cnica-Projeto-ViaCEP-6d597c201017425589e68e8a19fa6f83) backend.


## O projeto foi desenvolvido com as seguintes stacks

- Nest.js
- Typescript (para tipagem em tempo de desenvolvimento, visando boas práticas de código em legibilidade e manuntenibilidade).
- SQLite (persistência de dados SQL)
- TypeORM
- Class Validator (validação de dados)
- Jest (para os testes unitários no address.service.spec.ts)
- Husky (para utilização de hooks, automatizando o linter fix e leitura de testes unitários).
- Eslint
- Prettier

## Design de Software 

```
/dist
/src
  └── /address
        └── /__mocks__
        └── /dto
        └── /entities
  └── /redis
  └── /typeorm
/test
```

### Foi decidido seguir o padrão do Nest.js e adicionado uma camada de segurança para requisições no Banco de Dados (repository) 

## Para rodar localmente o repositório: 


- certifique-se que você tem instalado Node v.18.17 em sua máquina.
- clone o repositório em sua máquina `https://github.com/MichelangeloCali/back-ViaCEP.git`
- entre na pasta do projeto e rode `npm install`
- rode o comando `npm run start`

```bash
$ npm install
```

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Boas práticas:

- O código foi a todo momento desenvolvido para que pudesse ser o máximo desacoplado e seguindo boas práticas de padrão.
- Foi tomado um cuidado para o tratamento de erros, principalmente na resposta da API Via Cep que tem uma falha no status code quando retorna erro. 
- Foi configurando triggers com Husky, através de scripts pre-commit, onde é feito o fix do código, e pre-push, onde é rodado os testes unitários, evitando que todo e qualquer componente criado ou alterado suba para produção quebrado ou com algum bug.
  
 <img width="505" alt="image" src="https://github.com/MichelangeloCali/back-ViaCEP/assets/90471567/dc706626-41da-469e-af86-f3ea25146be1">

<img width="441" alt="image" src="https://github.com/MichelangeloCali/back-ViaCEP/assets/90471567/92e8f1cc-5d44-4c04-877b-68dd68a88ceb">



### Contato do desenvolvedor:

- [LinkedIn](https://www.linkedin.com/in/michelangelocali/)
- Email: michelangelocali@hotmail.com

