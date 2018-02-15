# Replace Me

## Requirements

* node 6.9.1
* yarn 0.26
* PostgreSQL 9.5.5
* redis 2.8.17
* ant 1.9.4
* nginx 1.6.2
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

Build application:
```sh
yarn run compile
```

Run migrations:
```sh
chmod +x bin/environment
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

In another console run nodemon watching compiled files changes:
```sh
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
