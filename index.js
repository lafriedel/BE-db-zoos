const express = require("express");
const helmet = require("helmet");
// const knex = require("knex");
// const knexConfig = require("./knexfile");

// const db = knex(knexConfig.development);

const server = express();

const zoosRouter = require('./routes/zoosRouter');
const bearsRouter = require('./routes/bearsRouter');

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zoosRouter);
server.use('/api/bears', bearsRouter);

server.get('/', (req,res) => {
  res.status(200).send("Welcome to the Zoo API. Use /api/zoos and /api/bears to access information.")
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
