var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var app = express();

///Descorbir como colocar os models e rotas em outros arquivos 
var Users = mongoose.model('Users', {
    name: String,
    user: String,
    email: String,
    password: String,
});

//Como fazer um get com paginação 
app.get('/users', function(request, response) {
    Users.find(function(err, users) {
        response.json(users);
    });
});

///Entender como funcionam os parametros na url 
app.get('/users/:idUsuario', function(request, response) {
    Users.find({ _id:  request.params.idUsuario }, function(err, user) {
        response.json(user);
    });
});

app.remove('/users/:idUsuario', function(request, response) {
    Users.remove({ _id:  request.params.idUsuario }, function(err, status) {
        response.json(status);
    });
});

//Fazer esse codigo funcionar 
app.post('/users', function(request, response) {

    var user = new Users({
    	//Colocar outros dados do usuario 
		name : "asdasd"
    });

    //Entender como o processo de save é feito 

    // https://docs.mongodb.com/manual/crud/

    
    user.save(function(err) {
        if (err) {
            throw err;
        } else {
            response.send('Usuario inserido com sucesso');
        }
    });

});
