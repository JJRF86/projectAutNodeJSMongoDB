'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(1,'days').unix()
  };

  return jwt.encode(payload,config.SECRET_TOKEN);
}

function decodeToken(token){
  console.log('Service - decodeToken');
  const decode = new Promise((resolve,reject) => {
    try {
      console.log('TOKEN A DECODIFICAR: '+token);
      const payload = jwt.decode(token,config.SECRET_TOKEN);

      if(payload.exp < moment().unix()){
        reject({
          status: 401,
          message: 'El token ha expirado'
        });
      }

      resolve(payload.sub);
    } catch (e) {
      reject({
        status: 500,
        message: 'Token invalido'
      });
    }
  });

  return decode;
}

module.exports = {
  createToken,
  decodeToken
};
