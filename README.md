# Simple-File-Api

Simple server/DB with the goal to save files, users and groups

## Considerations

I assume that users cannot be individually added to a file. This way everything is neatly package within the group entity, if you want to share files the user must be in a group that has that file.

One of the big doubts was to either continue using typeorm query builder for the top shared endpoint or just use a raw SQL query. I decided
to go with the query builder for readability, but personally I would rather have the query itself. I left the query in a comment for curiosity sake

## How to start

1. Just run the `docker-compose up`

I also added a pgadmin for easy views of the db. Just have to login with the user:`user@example.com`  pwd: `admin`. 
The migrations should run directly in the container and DB, there's also a healthcheck retry for the pg db that is used on app start, so the app will only start when the db is up and running

## API routes

```bash
# File Routes:
GET /top-shared/:k
  Params: k

GET /:id
  Params: id

POST /
  Params: None

POST /:id/user/:entityId
  Params: id, entityId

POST /:id/group/:entityId
  Params: id, entityId

PUT /:id
  Params: id

DELETE /:id
  Params: id

# Group Routes:
GET /:id
  Params: id

POST /
  Params: None

POST /:id/user/:entityId
  Params: id, entityId

PUT /:id
  Params: id

DELETE /:id
  Params: id

DELETE /:id/user/:entityId
  Params: id, entityId

# User Routes:
GET /:id
  Params: id

POST /
  Params: None

PUT /:id
  Params: id

DELETE /:id
  Params: id
```

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
