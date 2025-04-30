# Projeto Backend - API de Autenticação

Este repositório contém o backend da aplicação, que foi construído utilizando **NestJS** e **Prisma**. A API oferece endpoints para autenticação com JWT e é estruturada para suportar diferentes tipos de usuários: **Médico**, **Empresa** e **Funcionário**.

A seguir, explico como instalar o projeto e realizar o login para obter o **JWT**, que será utilizado nas requisições subsequentes.

## 1. Pré-requisitos

Antes de começar, verifique se você tem as seguintes ferramentas instaladas:

- **Node.js** (versão 16 ou superior) - [Baixar Node.js](https://nodejs.org/)
- **PostgreSQL** - [Baixar PostgreSQL](https://www.postgresql.org/download/)
- **Prisma CLI** (para rodar as migrations) - Será instalado automaticamente com o projeto

## 2. Instalação

### 2.1 Clonar o repositório

Clone o repositório para o seu ambiente local.

```bash
git clone <url_do_repositório>
cd <nome_do_repositório>
```

### 2.2 Configuração do Ambiente

Copie o arquivo .env.example para um novo arquivo .env:

```bash

cp .env.example .env
```

Altere o arquivo .env com os dados corretos de conexão ao banco de dados PostgreSQL. Exemplo:

```bash

DATABASE_URL=postgresql://user:password@localhost:5432/nome_do_banco
JWT_SECRET=segredo123
```

## 3. Migrar o Banco de Dados
Para configurar o banco de dados, execute as migrações do Prisma:

```bash
npx prisma migrate dev
```
Isso vai criar as tabelas e os relacionamentos no banco de dados de acordo com o modelo Prisma.

Para rodar o projeto rode:
```bash
npm run start:dev
```

## 4. Como Criar Usuários
 API permite criar Usuários para três tipos de entidades: Médico, Empresa e Funcionário.

### 4.1 Criação do Médico, Empresa e Funcionário:

Antes de criar um User (usuário), é necessário criar primeiro as entidades Médico, Empresa e Funcionário, já que cada usuário será associado a uma dessas entidades.

Criando o Médico
Envie uma requisição POST para o endpoint /medicos:

Requisição:
```bash
POST /medicos
Content-Type: application/json

{
  "nome": "Dr. João Silva",
  "crm": "123456",
  "telefone": "123456789",
  "email": "joao@exemplo.com"
}
```

Resposta:
```bash
POST /medicos
Content-Type: application/json

{
  "nome": "Dr. João Silva",
  "crm": "123456",
  "telefone": "123456789",
  "email": "joao@exemplo.com"
}
```

Criando a Empresa
Envie uma requisição POST para o endpoint /empresas:

Requisição:
```bash
POST /empresas
Content-Type: application/json

{
  "nome": "Empresa X",
  "cnpj": "12345678000195",
  "telefone": "987654321",
  "email": "empresa@exemplo.com"
}
```

Resposta:
```bash
{
  "id": "uuid-da-empresa",
  "nome": "Empresa X",
  "cnpj": "12345678000195",
  "telefone": "987654321",
  "email": "empresa@exemplo.com"
}
```

Criando o Funcionário
Envie uma requisição POST para o endpoint /funcionarios:

Requisição:
```bash
POST /funcionarios
Content-Type: application/json

{
  "nome": "Carlos Oliveira",
  "cpf": "12345678901",
  "telefone": "987654321",
  "status": "ATIVO",
  "empresaId": "uuid-da-empresa"
}

```

Resposta:
```bash
{
  "id": "uuid-do-funcionario",
  "nome": "Carlos Oliveira",
  "cpf": "12345678901",
  "telefone": "987654321",
  "status": "ATIVO",
  "empresaId": "uuid-da-empresa"
}
```

#### 4.2 Criação do Usuário (User):

Agora que você tem os IDs das entidades (Médico, Empresa, Funcionário), pode criar o usuário correspondente, associando o ID da entidade.

Criando o Usuário para Médico, Empresa ou Funcionário
Envie uma requisição POST para o endpoint /users:

Requisição:
```bash
POST /users
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "senha_secreta",
  "role": "MEDICO",     // Pode ser "EMPRESA" ou "FUNCIONARIO" também
  "medicoId": "uuid-do-medico",   // Se for um Médico
  "empresaId": "uuid-da-empresa", // Se for uma Empresa
  "funcionarioId": "uuid-do-funcionario" // Se for um Funcionário
}
```

Resposta:
```bash
{
  "id": "uuid-do-usuario",
  "email": "usuario@exemplo.com",
  "role": "MEDICO",
  "medicoId": "uuid-do-medico",
  "empresaId": "uuid-da-empresa",
  "funcionarioId": "uuid-do-funcionario"
}
```

Com isso, o usuário será criado e associado à entidade correspondente (Médico, Empresa ou Funcionário).


## 5. Como Fazer Login
Agora que o Usuário foi criado, você pode fazer login para obter um JWT (Token de autenticação).

1. Envie uma requisição POST para o endpoint /auth/login com o email e senha do usuário:

Requisição:

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "senha": "senha_secreta"
}
```

Resposta:

```bash
{
  "access_token": "seu-token-jwt-aqui"
}
```
2. Usar o Token JWT nas Requisições:

Para acessar rotas protegidas da API, você deve enviar o token JWT no cabeçalho Authorization das requisições. O formato é:
```bash
Authorization: Bearer seu-token-jwt-aqui
```

## Conclusão
Agora você sabe como criar e gerenciar os usuários, médicos, empresas e funcionários na API, além de como fazer login e usar o JWT para autenticar as requisições. Caso haja dúvidas ou problemas, fique à vontade para me contatar!


