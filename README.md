# Descrição do projeto
Esse projeto é um ecommerce de um cliente, seu produto é focado no vestuario em atacado para empresas ja vendendo atualmente no mercado livre. Os produtos são do tipo: Vendas de uniformes, vestuario de eventos, palestras e afins. <br>

# Estrutura
Não demandando altas reqs foi seguido o classico MVC com monolito para solucionar o problema de forma agil e eficiente. <br>

O banco é um postgress e estou usanod o docker para criar uma base local junto com adminner para gerenciar e visualizar os dados na web localhost. <br>
<br>
Foi separado de forma que existem produtos, categorias, pedidos, items de pedido. Sendo assim ha um gerenciamento desses produtos e pedidos assim como de usuarios.

# Como rodar local?

1. Instale as dependencias. <br>

- Baixe o docker. <br>
- clone o projeto: <br>
    $ git clone https://github.com/BrunoCotaXavier/api-ecommerce.git
    $ cd api-ecommerce
- instale as dependencias: <br>
    $ npm install 

<br>

2. Configure o ambiente. <br>

- certifique-se que o docker está rodando e rode: <br>
    $ docker compose up
- em um novo terminal rode as migrations: <br>
    $ npx prisma migrate deploy
- depois inicialize o ORM prisma: <br>
    $ npx prisma generate

<br>

3. Inicie o projeto. <br>
- agora é só rodar o projeto: <br>
    $ npm run dev


