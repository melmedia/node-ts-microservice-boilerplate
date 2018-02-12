# PROJECT NAME

Boilerplate for backend REST microservice. Based on libraries:
* routing-controllers
* typeorm
* inversify

## Prerequisites

* node 6.11.1
* yarn 0.26
* PostgreSQL 9.5.5
* redis 2.8.17
* ant 1.9.4
* nginx 1.10.0
* supervisor 3.2.0

## Development environment

APIDOC generated documentation available at ./apidoc folder.

### Installation

Create database:
```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database replace_me owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```

Place in /opt/environment.sh:
```sh
export REPLACE_ME_ENV=dev
```

Install dependencies:
```sh
yarn install

```

Run migrations:
```sh
yarn run migrate
mkdir runtime/
```

Generate documentation:
```sh
yarn run apidoc
```


### Start application

In one console run typescript compiler in watch mode:
```sh
yarn run compile-dev
```
or `yarn run compile` without watch.

In another console run nodemon watching compiled files changes:
```sh
chmod +x bin/environment
yarn run start-dev
```
or `yarn run start` without watch.

See logs in `runtime` folder.


## Shared development, QA environment

### Before jenkins deployment

Create database:
```sh
psql -c "create user gorod with password '123qwe'" postgres
psql -c "create database replace_me owner gorod encoding 'UTF8' lc_collate 'ru_RU.UTF-8' LC_CTYPE 'ru_RU.UTF-8' template template0;" postgres
```

Place in /opt/environment.sh:
```sh
export REPLACE_ME_ENV=dev
```

### After jenkins deployment

Restart supervisor:
```sh
sudo service supervisor restart
```
