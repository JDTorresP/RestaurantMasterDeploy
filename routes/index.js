//Variables de los packages necesarios
var express = require('express'); // express
var router = express.Router(); // router para los paths del rest api
var MongoClient = require('mongodb').MongoClient; //mongodb para consultar la bd
var Restaurant = require('../modules/restaurant'); // modulo restaurant para consulta de los comments
var mongoose = require('mongoose'); //mongoose para post y put del rest api

//mongodb en Atlas Cloud
var uri = "mongodb://adminresta:elrestaurantepro@restaurantcluster-shard-00-00-nc7qp.mongod" +
        "b.net:27017,restaurantcluster-shard-00-01-nc7qp.mongodb.net:27017,restaurantclus" +
        "ter-shard-00-02-nc7qp.mongodb.net:27017/test?ssl=true&replicaSet=restaurantClust" +
        "er-shard-0&authSource=admin";

//@GET /restaurants - Obtener todos los restaurantes
router.get('/restaurants', function (req, res) {
    getRestaurants(function (restaurants) {
        res.json(restaurants);
    });
});
//@POST /restaurant - Crear restaurante
router.post('/restaurant', function (req, res) {
    mongoose.connect(uri);
    var restaur = new Restaurant();
    restaur.name = req.body.name;
    restaur.product = req.body.product;
    restaur.prodDescrip = req.body.prodDescrip;
    restaur.address = req.body.address;
    restaur.photo = req.body.photo;

    restaur.save(function (err) {
        if (err) {
            if (err.code == 11000) 
                return res.json({success: false, message: 'el restaurante con ese nombre ya existe'});
            else 
                return res.send(err);
            }
        res.json({message: 'Restaurante creado!'});
        mongoose
            .connection
            .close();
    });

})

    
router.route('/restaurant/:rest_id')
//@GET /restaurant/:id - Obtener restaurante por id
    .get(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            
            // return that user
            res.json(resta);
            mongoose
                .connection
                .close();
        })
    })
    //@DELETE /restaurant/:id - Elimina el restaurante con el id dado
    .delete(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            if(resta==null){
                return res.json({message: 'El restaurante no existe o ya fue eliminado!'});
            }
            resta.remove();
             res.json({message: 'restaurant removed!'});
                
        })
    })
    //@UPDATE /restaurant/:id - Actualizar restaurante
    .put(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            if (req.body.name) 
                resta.name = req.body.name;
            if (req.body.product) 
                resta.product = req.body.product;
            if (req.body.prodDescrip) 
                resta.prodDescrip = req.body.prodDescrip;
            if (req.body.address) 
                resta.address = req.body.address;
            if (req.body.photo) 
                resta.photo = req.body.photo;
            
            resta
                .save(function (err) {
                    if (err) 
                        res.send(err);
                    
                    // return a message
                    res.json({message: 'restaurant updated!'});
                    mongoose
                        .connection
                        .close();
                });
        });
    })
//@GET /restaurant/:id/comment/:id - Obtener un comentario de un restaurante
router
    .route('/restaurant/:rest_id/comment/:comm_id')
    .get(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            resta
                .comments
                .map((t) => {
                    if (t.id == req.params.comm_id) {
                        res.json(t);
                        mongoose
                        .connection
                        .close();
                    }
                })
        })
    }).delete(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            
            resta
            .comments
                .map((t) => {
                    if (t.id == req.params.comm_id) {
                        if (t == null) {
                            return res.json({message: 'El restaurante no existe o ya fue eliminado!'});
                        }
                        t.remove();
                        res.json({message: 'comment removed!'});

                        mongoose
                            .connection
                            .close();
                    }
                })
                
        })
    })
    
    

//@POST /restaurant/:id/comment - Crear un cometario de un restaurante
router
    .route('/restaurant/:rest_id/comment')
    .post(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            resta
                .comments
                .push({user_mail: req.body.user_mail, text: req.body.text, vote: req.body.vote});
            resta.save(function (err) {
                if (err) 
                    res.send(err);
                res.json(resta);
                mongoose
                    .connection
                    .close();
            });

        })
    })
//@GET /restaurant/:id/comments - Obtener los comentarios de un restaurante
router
    .route('/restaurant/:rest_id/comments')
    .get(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            res.json(resta.comments);
            mongoose
                .connection
                .close();
        });

    })
router.route('/restaurant/:rest_id/votes')
// @GET /restaurant/:id/votes - Obtiene el promedio de todos los votos del
// restaurante
    .get(function (req, res) {
        mongoose.connect(uri);
        Restaurant.findById(req.params.rest_id, function (err, resta) {
            if (err) 
                res.send(err);
            
            var cont = 0;
            var l = 0;
            resta
                .comments
                .map((t, i) => {
                    cont = cont + t.vote;
                    l++;
                })
            res.json((cont / l));
            mongoose
                .connection
                .close();
        });

    })
//funcion para get restaurantes mongodb sample
function getRestaurants(callback) {
    MongoClient
        .connect(uri, function (err, db) {
            if (err) 
                throw err;
            console.log("conectado!");
            var restaur = db.collection("restaurants");
            console.log("seleccionado la db restaurant");
            restaur
                .find({})
                .toArray(function (err2, restaurants) {
                    if (err2) 
                        throw err2;
                    console.log(restaurants.length);
                    callback(restaurants);
                });
            db.close();
        });
        
}

module.exports = router;
