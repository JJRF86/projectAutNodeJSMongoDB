'use strict'

const service = require('../service/index');
const localStorage = require('localStorage');

function isAuth(request,response,next){
  console.log('Middleware - isAuth');
  var token = localStorage.getItem('token') || request.headers.authorization;
  if(!token){
    return response.status(403).send({message : 'No tienes authorization'});
  }

  service.decodeToken(token)
    .then(response =>{
      request.user = response;
      next();
    })
    .catch(res => {
      response.status(res.status).send({message:res.message});
    });
}

module.exports = isAuth;
