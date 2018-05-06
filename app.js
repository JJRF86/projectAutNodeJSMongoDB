'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const localStorage = require('localStorage');
const app = express();

const api = require('./routes/index');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.engine('.hbs',hbs({
  defaultLayout: 'default',
  extname: '.hbs'
}));
app.set('view engine','.hbs');

app.use('/api',api);

app.get('/login',(request,response)=>{
  response.render('login');
});

app.get('/logout',(request,response)=>{
  localStorage.clear();

  response.redirect('/login');
});

app.get('/', (request, response) => {
  response.redirect('/home');
});

app.get('/passwordInvalid', (request, response) => {
  response.redirect('/passwordInvalid');
});

app.get('/error', (request, response) => {
  response.redirect('/error');
});

app.get('/home', (request, response) => {
  var token = localStorage.getItem('token');
  if(!token){
    response.render('noAutorizado');
  }else{
    response.render('product');
  }
});

module.exports = app;
