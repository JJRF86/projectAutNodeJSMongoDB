'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  email: {type:String, unique:true, lowercase:true},
  displayName: String,
  avatar: String,
  password: {type:String, select: true},
  signupDate: {type:Date, default: Date.now()},
  lastlogin: Date
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  });
}

UserSchema.methods.gravatar = function (){
  if(!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro';

  const md5 = crypto.createHash('md5').update(this.email).digest('hex');

  return `https://gravatar.com/avatar/${md5}?s=2006d=retro`;
};

module.exports = mongoose.model('User',UserSchema);
