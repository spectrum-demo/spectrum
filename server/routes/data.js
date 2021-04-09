const express = require('express');
const creds = require('./client_secret.json');
const router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');


const cols = ['denumire', 'imgURL', 'audioURL', 'prop1', 'prop2', 'prop3', 'prop4', 'prop5', 'prop6', 'prop7', 'prop8'];

/* GET users listing. */
router.get('/', async(req, res) => {
  let data = {
    'pages':[]
  };
  console.log("hehe");
  //res.send('respond with a resource');
  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('1JLBvXLXim23_um4hqVbSmApQcY5KaxrKz0OzxPCLzsA');

  doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  //console.log(doc);  

  for(let i = 0; i < doc.sheetsByIndex.length; i++) {
    const sheet = doc.sheetsByIndex[i];
    const rows = await sheet.getRows();

    console.log(sheet.title);
    console.log(rows);
    
    let page = {
      'title': sheet.title,
      'entries': []
    }


    for (let j = 0; j < rows.length; j++) {
      const row = rows[j];
      let entry = {};
      
      for (let k = 0; k < cols.length; k++) {
        
        const element = row[cols[k]];

        if(element != undefined) {
          try {
            entry[cols[k]] = JSON.parse(element);
          } catch (e) {
              entry[cols[k]] = element;
          }
        }
      }
      page.entries.push(entry);
    }
    console.log(page);
    data.pages.push(page);
  }
  res.json(data);
});

module.exports = router;
