const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
 res.send('ZECH is a SEXY BEAST');
});

// endpoints here
server.get('/api/zoos', async (req,res) => {
  try {
    const zoos = await db('zoos')
    res.status(200).json(zoos)
} catch (error) {
    res.status(500).json(error)
}
});

server.get('/api/zoos/:id', async (req,res) => {
  try {
    const zoos = await db('zoos')
    .where({ id:req.params.id })
    .first();
    res.status(200).json(zoos)
} catch (error) {
    res.status(500).json(error)
}
});

server.post('/api/zoos', async (req,res) => {
  try {
   const [id] = await db('zoos').insert(req.body);
   const zoos = await db('zoos')
   .where({ id })
   .first();
   res.status(201).json(zoos)
} catch (error) {
  res.status(500).json(error)
}
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
