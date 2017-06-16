const express = require('express');
const router = express.Router();

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


// Routes
router.post('/register', (req, res, next) => {
  const user = isValidUser(req.body) ? newUser(req.body) : null;
  if(user) {
    router.services.db
      .insert('users', user)
      .then(() => res.send({
          token: user.token,
          username: user.username
        }))
      .catch((e) => res.status(500).send({error: 'User exists!'}));
  }
  else
    res.status(422).send({error: 'Invalid user!'});

});

router.post('/login', (req, res, next) => {
  const claimer = req.body;
  if(hasLoginParams(claimer)) {
    router.services.db
      .selectOne('users', {username: claimer.username})
      .then(
        (users) => {
          const user = users[0];
          if(passwordMatches(claimer, user)) {
            const newToken = generateToken(user).token;
            router.services.db
              .update('users', {id: user.id}, {token: newToken})
              .then(() => {
                res.send({username: user.username, token: newToken});
              })
          }
          else
            throw Error('Invalid password');
        }
      )
      .catch( (e) => res.send(422).send({error: 'Invalid user!'}) );
  }
  else
    res.status(422).send({error: 'Invalid user!'});
});

router.get('/validate/:token', (req, res, next) => {
  const claimer = hasToken(req.params) ? {token: req.params.token} : null;
  if(claimer) {
    router.services.db
      .selectOne('users', claimer)
      .then((users)=> {
        const user = users[0];
        if(tokenMatches(claimer, user))
          res.send({token: user.token, username: user.username});
        else
          throw Error('Invalid token');
      })
      .catch( (e) => res.status(422).send({error: 'Invalid user!'}));
  }
  else
    res.status(422).send({error: 'Invalid body!'});
});

module.exports = router;
