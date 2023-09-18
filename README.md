# DMP Seller App (API)

## Description

Created with Nest.js new cli command. 

## Installing the app

### Dependencies
* Node.js: 19.0.0
* MySQL: 8.0.32

### Database setup
The API uses a MySQL to store information about stores, their items, and transactions.

Run the command below to setup a MySQL container:
```
docker run -p 33060:3306 --name mysql-server -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=dmp -d mysql/mysql-server:latest
```

### Node.js app setup
Before installing, ensure you have a copy the content of `.env.example` to `.env.development` and `.env.development` for both development and production configurations.
Run the command below to install the Node.js application dependencies:

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn dev

# debug
$ yarn debug

# production mode
$ yarn prod
```

## Testing the app

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](LICENSE).
