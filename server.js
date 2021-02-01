const { db } = require('./db_config')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()
const port = 3000

// Logging
app.use(morgan('combined'))
// Reading the body of a request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Allowing CORS
app.use(cors())

// All routes are in this singular file since this is a pretty naive implementation
// Root
app.get('/', (req, res) => {
	res.send('Nelson for the Rebel Software Developer Position')
})

// The weirdest response code
app.get('/teapot', (req, res) => {
	res.status(418).send('What\'s up, teapot?')
})

// GET all artists
app.get('/artists', (req, res) => {
	db.any('SELECT * FROM artists ORDER BY id')
		.then(function (data) {
			console.log(data)
			return res.send(data)
		})
		.catch(function (error) {
			console.log(error)
			return res.status(500).send(error.code)
		})
})

// GET artist by id
app.get('/artists/:id', (req, res) => {
	var id = req.params.id

	db.oneOrNone('SELECT * FROM artists WHERE id = $1', id)
		.then(function (data) {
			console.log(data)
			return res.send(data)
		})
		.catch(function (error) {
			console.log(error)
			return res.status(500).send(error.code)
		})
})

// CREATE artist
app.post('/artists', (req, res) => {
	let { artist, rate, streams } = req.body
	if (artist, rate, streams) {
		db.oneOrNone('INSERT INTO artists (artist, rate, streams) VALUES ($1, $2, $3) RETURNING *', [artist, rate, streams])
		.then(function (data) {
			return res.send(data)
		})
		.catch(function (error) {
			console.log(error)
			return res.status(500).send(error.code)
		})
	}
})

// UPDATE artist
app.put('/artists/:id', (req, res) => {
	let id = req.params.id
	let { artist, rate, streams, paid } = req.body
	console.log(req.body)

	if (artist, rate, streams) {
		db.oneOrNone('UPDATE artists SET (artist, rate, streams, paid) = ($2, $3, $4, $5) WHERE ID = $1 RETURNING *', [id, artist, rate, streams, paid])
		.then(function (data) {
			return res.send(data)
		})
		.catch(function (error) {
			console.log(error)
			return res.status(500).send(error.code)
		})
	}
})

// DELETE artist
app.delete('/artists/:id', (req, res) => {
	var id = req.params.id

	db.oneOrNone('DELETE FROM artists WHERE id = $1 RETURNING *', id)
		.then(function (data) {
			console.log(data)
			return res.send(data)
		})
		.catch(function (error) {
			console.log(error)
			return res.status(500).send(error.code)
		})
})

app.listen(port, () => {
	console.log(`Rebel app listening at http://localhost:${port}`)
})