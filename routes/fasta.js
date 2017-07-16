const express = require('express');
const router = express.Router();
const fasta = require('bionode-fasta');
const process = require('process');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  const sequencesQuery = req.query.seq || '';
  const name = req.query.name || '' ;

  const sequence = sequencesQuery && Array.isArray(sequencesQuery) ? sequencesQuery[0] : sequencesQuery;
  
  if(sequence.length === 0 && name.length === 0) {
    return res.status(422).send({error: 'You must provide a name or sequence (seq) param.'});
  }

  router.services.db.connection.select()
      .from('fasta_info')
      .where('name', 'like', '%'+name)
      .andWhere('sequence','like','%'+sequence+'%')
    .then((results) => res.send(results))
    .catch((err)=> {
      console.log(err);
      return res.status(500).send({error: 'Something bad happened!'})
    });
  
});

module.exports = router;
