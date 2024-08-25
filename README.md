# Simple-File-Api

Simple server/DB with the goal to save files, users and groups

## How to start


## Tools used

Node.js
postgresql

pg library (postgres for node)
typeorm (with reflect-metadata)

### typeorm

#### Running migrations

To generate a new migration (after changes to entities) just run `npm run migration:generate -- src/migration/<name>`

To run `npm run migration:run`

To revert `npm run migration:revert`