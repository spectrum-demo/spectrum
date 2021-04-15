const express = require('express');
const router = express.Router();
const config = require('../config');
const client = require('twilio')(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_AUTH_TOKEN
);

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: config.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
  
});

module.exports = router;
