/**
 * Authorization middleware.
 */
const userModel = require('./../model/user');
const db = require('./../services/database');

exports.default = function(req, res, next) {
	
  const token = req.headers['authorization'];
  
  if (!token) {
      return res.status(403).send();
  } 

  const claimer = {
    token: token
  };

  if(claimer) {
    db
      .selectOne('users', claimer)
      .then((users)=> {
        const user = users[0];
        if(userModel.tokenMatches(claimer, user)) {
          req.user = user;
          next();
        }
        else {
          throw Error('Invalid token');
        }
      })
      .catch( (e) => res.status(422).send({error: 'Invalid user!'}));
  }
  else
    return res.status(422).send({error: 'Invalid body!'});
};