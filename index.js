const express = require('express');

const server = express();

server.get('/teste', (req, res )=>{
    return res.json({message: 'Olá mundoooo!'});
});

server.listen(8002);