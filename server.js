const { db } = require("./db_config");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var morgan = require("morgan");
// express-validator to validate input + sql escape
const { body, param, validationResult } = require("express-validator");

var app = express();
const port = process.env.PORT || 8080;

// Logging
app.use(morgan("combined"));
// Reading the body of a request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allowing CORS
app.use(cors());

// All routes are in this singular file since this is a pretty naive implementation
// Root
app.get("/", (req, res) => {
    res.send("Nelson for the Rebel Software Developer Position");
});

// The weirdest response code
app.get("/teapot", (req, res) => {
    res.status(418).send("What's up, teapot?");
});

// GET all artists
app.get("/artists", (req, res) => {
    db.any("SELECT * FROM artists ORDER BY id")
        .then((data) => {
            console.log(data);
            return res.send(data);
        })
        .catch((error) => {
            console.log(error.message || error);
            return res.status(500).send(error.code);
        });
});

// GET artist by id
app.get("/artists/:id", param("id").isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var id = req.params.id;

    db.oneOrNone("SELECT * FROM artists WHERE id = $1", id)
        .then((data) => {
            return res.send(data);
        })
        .catch((error) => {
            console.log(error.message || error);
            return res.status(500).send(error.code);
        });
});

// CREATE artist
app.post(
    "/artists",
    body("artist").not().isEmpty().escape(),
    body("rate").isFloat(),
    body("streams").isNumeric().optional(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let data = ({ artist, rate, streams } = req.body);
        db.oneOrNone(
            "INSERT INTO artists(${this:name}) VALUES(${this:csv}) RETURNING *",
            data
        )
            .then((data) => {
                return res.status(201).send(data);
            })
            .catch((error) => {
                console.log(error.message || error);
                return res.status(500).send(error.code);
            });
    }
);

// UPDATE artist
app.put(
    "/artists/:id",
    param("id").isInt(),
    body("artist").not().isEmpty().escape(),
    body("rate").isFloat(),
	body("streams").isNumeric(),
	body("paid").isBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let id = req.params.id;

        db.oneOrNone(
            "UPDATE artists SET (artist, rate, streams, paid) = ($2, $3, $4, $5) WHERE ID = $1 RETURNING *",
            [id, artist, rate, streams, paid]
        )
            .then((data) => {
                return res.send(data);
            })
            .catch((error) => {
                console.log(error.message || error);
                return res.status(500).send(error.code);
            });
    }
);

// DELETE artist
app.delete("/artists/:id", param("id").isInt(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    var id = req.params.id;

    db.oneOrNone("DELETE FROM artists WHERE id = $1 RETURNING *", id)
        .then((data) => {
            return res.send(data);
        })
        .catch((error) => {
            console.log(error.message || error);
            return res.status(500).send(error.code);
        });
});

app.listen(port, () => {
    console.log(`Rebel app listening at http://localhost:${port}`);
});
