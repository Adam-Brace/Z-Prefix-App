# Inventory Manager

## Installation

Install the project with:

```sh
git clone https://github.com/Adam-Brace/Z-Prefix-App.git
```

Navigate to the root folder:

```sh
cd Z-Prefix-App
```

Create a `.env` file in the root directory and add the following values. These defaults ensure compatibility, but you can modify them if necessary:

```env
CLIENT_PORT=3000
SERVER_PORT=3001
DATABASE_PORT=3002
USER_NAME=postgres
USER_PASSWORD=password
DATABASE_NAME=database
```

Install the dependencies:

```sh
npm install
```

Run the project:

```sh
docker compose up --build
```

### Create the Database

List all running containers and copy the **CONTAINER ID** of the **postgres:latest** container:

```sh
docker ps -a
```

Access the PostgreSQL container:

```sh
docker exec -it <CONTAINER_ID> bash
```

Replace `<CONTAINER_ID>` with the copied ID.

Log in to PostgreSQL using credentials from your `.env` file:

```sh
psql -U "$USER_NAME" -p "$DATABASE_PORT"
```

Create the database:

```sql
CREATE DATABASE "$DATABASE_NAME";
```

Exit the PostgreSQL shell:

```sh
\q
```

## Seeding

Run the following commands inside the project directory after starting the project:

```sh
npx knex migrate:rollback --env production
npx knex migrate:latest --env production
npx knex seed:run --env production
```
