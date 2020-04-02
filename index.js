const express = require('express');

const server = express();

server.use(express.json());

const users = ['Claudio','Odair','Laura', 'Lucia', 'Joana Dark'];


//Middleware GLobal
server.use((req, res, next)=>{
    console.log(`metodo ${req.method}; URL ${req.url}`);
 return next();
});

//Middleware Local( ppode ser chamado dentro dos metodos)
function chekUsers(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: 'User name is requered'});   
    }
     return next();
};
function chekUsersinArray(req, res, next){
    if(!users[req.params.index]){
        return res.status(400).json({error: 'User does not exiist'});   
    }
     return next();
};

server.get('/users', (req, res )=>{
    return res.json(users);
});


server.post('/users', chekUsers, (req, res)=>{
    const {name} = req.body;
    users.push(name);
    return res.json(users);
});
server.put('/users/:index', chekUsers, chekUsersinArray, (req, res)=>{
    const {index} = req.params;
    const {name} = req.body;
    users[index] = name ;
    return res.json(users);
});

server.delete('/users/:index', chekUsersinArray, (req, res)=>{
    const {index} = req.params;
    users.splice(index,1);
    return res.send("Usuário excluido com sucesso!");
});

server.listen(8001);
