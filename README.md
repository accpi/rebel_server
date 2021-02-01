# rebel_server
Rebel Coding Test - Express REST API

## Implementation

This is a simple one file Express REST API, the database (Postgres) is a naive implementation with all the data in one table for the purposes of this coding test.\
If making a larger, more production style database, you'd have multiple tables (song plays, rate, payment info) all linked through artist id. 

This server is hosted on Heroku [https://rebel-server.herokuapp.com/](https://rebel-server.herokuapp.com/) and doesn't feature any sort of access security, which could easily be added by grabbing a login and recieving a token (like JWT) that would be sent and verified on every request through simple middleware.

## Endpoints

### `GET` /artists
**Code:** 200 <br />
**Content:** `[{artist: string, rate: decimal, streams: integer, paid: boolean}, ...]`

### `GET` /artists/:id
**Code:** 200 <br />
**Content:** `{artist: string, rate: decimal, streams: integer, paid: boolean}`

### `POST` /artists
**Required Body:**
`artist=[string]`
`rate=[decimal]`

**Optional Body:**
`streams=[integer]`

**Code:** 201 <br />
**Content:** `{artist: string, rate: decimal, streams: integer, paid: boolean}`

### `PUT` /artists/:id
**Required:**
`id=[integer]`
`artist=[string]`
`rate=[decimal]`
`streams=[integer]`
`paid=[boolean]`

**Code:** 200 <br />
**Content:** `{artist: string, rate: decimal, streams: integer, paid: boolean}`

### `DELETE` /artists/:id
**Required:**
`id=[integer]`

**Code:** 200 <br />
**Content:** `{artist: string, rate: decimal, streams: integer, paid: boolean}`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app; open [http://localhost:8080](http://localhost:8080) to view it in the browser. If there's a different port specified in the `.env` file, it'll run through that port. This is important for Heroku.
