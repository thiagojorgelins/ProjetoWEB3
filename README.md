**Instalar as dependências**

> _npm i_

**Rodar a aplicação**

> Criar um arquivo .env na raiz do projeto passando
```
DB_DIALECT=qual o banco que está conectando
DB_NAME=nome do banco
DB_USER=nome do usuario
DB_PASSWORD=senha do usuario
DB_HOST=host do banco
JWT_SECRET="Alguma string aqui"
```
> _npm run dev_

**Gerar as migrations e as models**

> _npx sequelize-cli db:migrate_

## Criar as tabelas manualmente

**Para iniciar o sequelize**

User o comando abaixo na raíz do projeto

<code>npx sequelize-cli init</code>

> _npx sequelize-cli model:generate --name Admin --attributes email:string,senha:string_

> _npx sequelize-cli model:generate --name User --attributes nome:string,email:string,senha:string,telefone:string,cpf:string,curriculo:string,role:string_

> _npx sequelize-cli model:generate --name Company --attributes nomeDono:string,razaoSocial:string,nomeFantasia:string,segmento:string,site:string,cnpj:string,telefone:string,email:string_

> _npx sequelize-cli model:generate --name Address --attributes logradouro:string,bairro:string,cidade:string,estado:string,pais:string_

> _npx sequelize-cli model:generate --name Review --attributes avaliação:integer,comentario:integer_

> _npx sequelize-cli model:generate --name Job --attributes titulo:string,descricao:string,salario:double_

## Criar um usuário ADMIN

> _npx sequelize migration:create --name add-admin-user_
```javascript
'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin', 10)
    await queryInterface.bulkInsert('Admins', [{
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
> _npx sequelize db:migrate_
