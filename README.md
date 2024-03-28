**Instalar as dependências**

> npm i

**Gerar as migrations e as models**

> npx sequelize-cli db:migrate

## Criar as tabelas manualmente

**Para iniciar o sequelize**

User o comando abaixo na raís do projeto

<code>npx sequelize-cli init</code>

> npx sequelize-cli model:generate --name Admin --attributes email:string,senha:string

> npx sequelize-cli model:generate --name User --attributes nome:string,email:string,senha:string,telefone:string,cpf:string,curriculo:string,role:string

> npx sequelize-cli model:generate --name Company --attributes nomeDono:string,razaoSocial:string,nomeFantasia:string,segmento:string,site:string,cnpj:string,telefone:string,email:string

> npx sequelize-cli model:generate --name Address --attributes logradouro:string,bairro:string,cidade:string,estado:string,pais:string

> npx sequelize-cli model:generate --name Review --attributes avaliação:integer,comentario:integer

> npx sequelize-cli model:generate --name Job --attributes titulo:string,descricao:string,salario:double

## Criar um usuário ADMIN

> npx sequelize migration:create --name add-admin-user
```javascript
'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin', 10)
    await queryInterface.bulkInsert('Admins', [{
      id: 1,
      nome: 'Admin',
      email: 'admin@email.com',
      senha: hashedPassword,
      tipo: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', { email: 'admin@example.com' }, {});
  }
};

```
> npx sequelize db:migrate
