# rebel_server
Rebel Coding Test - Express REST API

## Implementation

This is a simple one file Express REST API, the database (Postgres) is a naive implementation with all the data in one table for the purposes of this coding test.\
If making a larger, more production style database, you'd have multiple tables (song plays, rate, payment info) all linked through artist id. 

This server is hosted on Heroku [https://rebel-server.herokuapp.com/](https://rebel-server.herokuapp.com/) and doesn't feature any sort of access security, which could easily be added by grabbing a login and recieving a token (like JWT) that would be sent and verified on every request through simple middleware.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app; open [http://localhost:8080](http://localhost:8080) to view it in the browser. If there's a different port specified in the `.env` file, it'll run through that port. This is important for Heroku.
