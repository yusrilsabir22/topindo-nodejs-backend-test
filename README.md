## Require
- [nvm](https://github.com/nvm-sh/nvm) or you can use node version 18.16.0
- Docker

## How to run

Steps to run this project:
1. Run `nvm use` to select node js version
2. Run `./bootstrap` command | to setup postgres database and up the migration
3. Run `yarn start`
4. Go to http://localhost:3000/docs/ to see the documentation

## Default user

username: `admin`

password: `admin`

### DB Migration
Available commands:
- `up-migration`
- `gen-migration`

`gen-migration` required `args` as migration name
example:
```
./gen-migration migration-name
```

Note:

Sometime the `./bootstrap` command need to run twice since it takes a time to create the database