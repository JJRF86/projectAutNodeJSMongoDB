'use strict'

const express = require('express');
const api = express.Router();
const ProductCtrl = require('../controllers/product');
const UserCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');

api.get('/product',auth,ProductCtrl.getProducts);

api.get('/product/:productId',auth,ProductCtrl.getProduct);

api.post('/product',auth,ProductCtrl.saveProduct);

api.put('/product/:productId',auth,ProductCtrl.updateProduct);

api.delete('/product/:productId',auth,ProductCtrl.deleteProduct);

api.post('/createUser',UserCtrl.registerUser);

api.post('/loginUser',UserCtrl.login);

api.get('/private',auth,(resquest,response) =>{
  response.status(200).send({message:'Tienes acceso'});
});

module.exports = api;
