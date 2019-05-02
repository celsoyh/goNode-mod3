const express = require('express')

class App {
	constructor() {
		this.express = express()

		this.middlewares()
		this.routes()
	}

	middlewares() {
		this.express.use(express.json())
	}

	routes() {
		this.express.use('/', (req, res) => {
			return res.send('hello')
		})
	}
}

module.exports = new App().express
