# Rentalx

Projeto principal desenvolvido com o conteúdo estudado ao longo da trilha de NodeJS do Bootcamp Ignite da Rocketseat

## :hammer_and_wrench: Ferramentas

- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [cors](https://www.npmjs.com/package/cors)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [csv-parse](https://www.npmjs.com/package/csv-parse)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [docker](https://docs.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [express](https://expressjs.com/pt-br/)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [handlebars](https://www.npmjs.com/package/handlebars)
- [jest](https://jestjs.io/pt-BR/)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://www.npmjs.com/package/nodemailer)
- [nodejs](https://nodejs.org/en/docs/)
- [supertest](https://www.npmjs.com/package/supertest)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [typescript](https://www.typescriptlang.org/)
- [tsyringe](https://www.npmjs.com/package/tsyringe)
- [typeorm](https://www.npmjs.com/package/typeorm)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [uuid](https://www.npmjs.com/package/uuid)

## :desktop_computer: Padronização de código

- [editorconfig](https://EditorConfig.org)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)

### :heavy_check_mark: Cadastro de carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar um novo carro.

**RN** => Regras de negócio

- Não deve ser possível cadastrar um carro com uma placa já existente.

- O carro deve ser cadastrado, por padrão, disponível.

- Apenas usuários admin podem realizar o cadastro.

### :heavy_check_mark: Listagem de carros

**RF** => Requisitos funcionais

- Deve ser possível listar os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN** => Regras de negócio

- Usuário não precisa estar logado no sistema.

### :heavy_check_mark: Cadastro de especificação no carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar uma especificação para um carro.

**RN** => Regras de negócio

- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.

- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

### :heavy_check_mark: Cadastro de imagens do carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar a imagem do carro.

**RNF** => Requisitos não funcionais

- Utilizar multer para realizar o upload dos arquivos.

**RN** => Regras de negócio

- O usuário deve cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser uma admin.

### :heavy_check_mark: Aluguel de carro

**RF** => Requisitos funcionais

- Deve ser possível cadastrar um aluguel

**RNF** => Requisitos não funcionais

- Utilizar multer para realizar o upload dos arquivos.

**RN** => Regras de negócio

- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel o status do carro deverá ser alterado para indisponível

### :heavy_check_mark: Devolução de carro

**RF** => Requisitos funcionais

- Deve ser possível realizar a devolução de um carro

**RN** => Regras de negócio

- Se o carro for devolvido com menos de 24 horas devera ser cobrado diária completa
- Ao realizar a devolução o carro deverá ser liberado para outro aluguel
- A realizar a devolução o usuário devera ser liberado para outro aluguel
- Ao realizar a devolução devera ser calculado o total do aluguel
- Caso o horário de devolução seja superior a previsto na entrega devera ser cobrado multa proporcional aos dias de atraso
- Caso haja multa devera ser somado ao total do aluguel
- O usuário deve estar logado na aplicação

### :heavy_check_mark: Recuperar senha

**RF** => Requisitos funcionais

- O usuário deve conseguir recuperar a senha informando o email
- O usuário deve receber um email com o passo a passo para a recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN** => Regras de negócio

- O usuário precisa informar uma nova senha
- o link enviado para a recuperação deve expirar em 3 horas
