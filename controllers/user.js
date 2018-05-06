'use strict'

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../service/index');
const localStorage = require('localStorage');
const bcrypt = require('bcrypt-nodejs');

function registerUser(request,response){
  console.log('Controllers - User - registerUser');
  const user = new User({
    email: request.body.email,
    displayName: request.body.displayName,
    password: request.body.password
  })

  user.avatar = user.gravatar(),

  bcrypt.genSalt(10,(err,salt)=>{
    if(err) return next(err);

    bcrypt.hash(user.password,salt,null,(err,hash) => {
        if(err)
          return next(err);

        user.password = hash;
    });
  });
  user.save((err) => {
    if(err)
      return response.status(500).send({message : `Error al crear el usuario: ${err}`});
    return response.status(200).send({token: service.createToken(user)});
  });
}

function login(request,response){
  console.log('Controllers - User - login');

  User.findOne({email: request.body.email},function(err,user){
    if(err)
      return response.status(500).send({message: `Ocurio un error interno: ${err}`});

    if(!user)
        return response.status(404).send({message: 'El usuario no existe'});

    return user.comparePassword(request.body.password, (err, isMatch) => {
      if (err) return response.status(500).send({codigoError:1, message: `Ocurrio un error al validar el password: ${err}` })
      if (!isMatch) return response.status(404).send({codigoError:2, message: `El password es invalido: ${request.body.email}` });

      request.user = user;

      const tokenGenerado = service.createToken(user);

      localStorage.setItem('token',tokenGenerado);

      return response.status(200).send({codigoError:0,message: 'Has ingresado satisfactoriamente', token:tokenGenerado});
    });
  });
}

module.exports = {
  registerUser,
  login
}
