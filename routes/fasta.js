const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:degId', function(req, res, next) {

  const degId = req.params.degId || '' ;

  if(degId.length === 0) {
    return res.status(422).send({error: 'You must provide a degId.'});
  }

  router.services.db.connection.select()
      .from('fasta_annotation')
      .where('degId', degId)
    .then((results) => results.length > 0 ? res.send(results[0]) : res.send(null))
    .catch((err)=> {
      console.log(err);
      return res.status(500).send({error: 'Something bad happened!'})
    });
  
});

module.exports = router;
