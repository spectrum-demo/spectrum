const express = require('express');
const creds = require('./client_secret.json');
const router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');



/* GET users listing. */
router.get('/', async(req, res) => {
  console.log("hehe");
  //res.send('respond with a resource');
// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1JLBvXLXim23_um4hqVbSmApQcY5KaxrKz0OzxPCLzsA');

console.log(creds);
  doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);  

  res.json({"o":"l"});
});

module.exports = router;
