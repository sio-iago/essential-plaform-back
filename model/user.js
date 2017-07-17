// Validation and crypto
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const R = require('ramda');

// Validations
const hasLoginParams = user =>
  user.username && user.password;

const hasToken = user =>
  user.token && String(user.token).trim() !== '';

const isValidUser = user =>
  hasLoginParams(user) &&
  user.password &&
  validator.isEmail(user.email) &&
  validator.isLength(user.password, 6) &&
  validator.isLength(user.username, 5);

const passwordMatches = (claimer, user) =>
  bcrypt.compareSync(claimer.password, user.password);

const tokenMatches = (claimer, user) =>
  claimer.token &&
  user.token &&
  claimer.token === user.token;


// Modifiers
const encryptPassword = user =>
  Object.assign({}, user, {password: bcrypt.hashSync(user.password, salt)});

const generateToken = user =>
  Object.assign({}, user, {token: crypto.randomBytes(64).toString('hex')});

// Creators
const newUser = R.pipe(
  encryptPassword,
  generateToken
);

module.exports = {
  hasLoginParams: hasLoginParams,
  hasToken: hasToken,
  isValidUser: isValidUser,
  passwordMatches: passwordMatches,
  tokenMatches: tokenMatches,
  encryptPassword: encryptPassword,
  generateToken: generateToken,
  newUser: newUser,
};