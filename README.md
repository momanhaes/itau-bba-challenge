# Desafio Itaú BBA - Frontend

Clone o repositório usando o comando abaixo:

```sh
git clone https://github.com/momanhaes/itau-bba-challenge
```

O projeto foi desenvolvido com o framework Angular.

Caso queira acessar o projeto por um URL pública, abra [https://itau-bba-challenge.netlify.app/](https://itau-bba-challenge.netlify.app/) em seu navegador.

Para rodar o projeto localmente na sua máquina, siga os procedimentos abaixo.

## Inicialização da SPA

Instale as dependências do projeto rodando o comando abaixo:

```sh
npm install
```

Suba o projeto rodando o comando abaixo:

```sh
npm start
```

Abra [http://localhost:4200](http://localhost:4200) em seu navegador.

## Documentação das Features

### Cadastro

`/register`

* Página de formulário de cadastro de usuários com validação mockada de email e senhas.

`/login`

* Página de formulário de login com autorização mockada.

### Início

`/home`

* Página de exibição dos polos. 
* Nessa página você pode ver os polos cadastrados disponíveis para edição.
* É possível, na parte superior da página, fazer uma busca de polos por nome, business e valutaion.

### Cadastro de Polos

`/business-register`

* Página do formulário de cadastro de veículos.
* Nessa página você pode cadastrar um polo, porém, como o endpoint de CRUD está mockado, o resultado do cadastro não refletirá na listagem de polos.
  
`/business-register/:id`

* Página do formulário de edição de veículos.
* Nessa página você pode editar um polo, porém, como o endpoint de CRUD está mockado, o resultado da edição não refletirá na listagem de polos.

### Informações gerais

* Foi implementada uma página default para erros 404 (not found) a fim lidar com rotas não programadas do sistema.
* Todas as páginas foram desenvolvidas visando responsividade e usabilidade.
* Todas as páginas possuem tratamento de erro, loading e animações feitas a partir do módulo nativo do Angular para tornar a navegação do usuário mais fluida.
