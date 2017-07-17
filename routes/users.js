const express = require('express');
const router = express.Router();
const userModel = require('./../model/user');

// Routes
router.post('/register', (req, res, next) => {
  const user = userModel.isValidUser(req.body) ? userModel.newUser(req.body) : null;
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
  if(userModel.hasLoginParams(claimer)) {
    router.services.db
      .selectOne('users', {username: claimer.username})
      .then(
        (users) => {
          const user = users[0];
          if(userModel.passwordMatches(claimer, user)) {
            const newToken = userModel.generateToken(user).token;
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
  const claimer = userModel.hasToken(req.params) ? {token: req.params.token} : null;
  if(claimer) {
    router.services.db
      .selectOne('users', claimer)
      .then((users)=> {
        const user = users[0];
        if(userModel.tokenMatches(claimer, user))
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
