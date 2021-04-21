const express = require('express');
const fs = require('fs');
const creds = require('./client_secret.json');
const config = require('../config');
const router = express.Router();
const { GoogleSpreadsheet } = require('google-spreadsheet');


const cols = ['denumire', 'imgURL', 'audioURL', 'prop1', 'prop2', 'prop3', 'prop4', 'prop5', 'prop6', 'prop7', 'prop8'];
const pathCache = './data.json';
// Make and update every day
const updateInterval = 1000 * 60 * 60 * 24; 

let fetchAndStoreData = async () => {

    // Request data from the googleSpreadSheet
    
  console.log("hehi");
    let data = {
      'timeLastUpdate': new Date(),
      'pages':[]
    };
    
    //res.send('respond with a resource');
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(config.GOOGLE_SPREADSHEET_ID);
  
    doc.useServiceAccountAuth(creds);
  
    await doc.loadInfo(); // loads document properties and worksheets
  
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

    let dataString = JSON.stringify(data);
    fs.writeFileSync(pathCache, dataString);

    return data;
}

let getCachedData = async () => {
  // Check if the cached data file is already created
  try {
    console.log("before checking if the file exisits");
    await fs.promises.access(pathCache);
      console.log("hehe");
      let rawData = fs.readFileSync(pathCache);
      let data = JSON.parse(rawData);
      let date = new Date();
      if(date - data.timeLastUpdate > updateInterval) {
        data = await fetchAndStoreData();
      }
      console.log(data);
      return data;
  } catch(err) {
    console.error(err);
    console.log("hehe");
    let data = fetchAndStoreData();
    return data;
  }
}

/* GET users listing. */
router.get('/', async(req, res) => {

  let data = await getCachedData();
  res.json(data);
});


router.get('/buttons', async(req, res) => {
  try {
    let getAllData = await getCachedData();
     for (let i = 0; i < getAllData.pages.length; i++) {
      const element = getAllData.pages[i];
      if(element.title == "Butoane") {
        console.log(element)
        res.json(element);
      }
    }
  } catch (error) {
     console.error(error);
     res.json({'error': '500 Server Error'});
  }

});

router.get('/categories', async(req, res) => {
  let categs = [];
  try {
    let getAllData = await getCachedData();
    let categsElement = {};
    for (let i = 0; i < getAllData.pages.length; i++) {
      const element = getAllData.pages[i];
      if(element.title == "Categorii") {
        categsElement = element;
      }
    }

    console.log("#####################################");
    console.log(categsElement);
    console.log("#####################################");

    for (let i = 0; i < getAllData.pages.length; i++) {
      let element = getAllData.pages[i];
      if(element.title != "Întrebări") {
        for (let index = 0; index < categsElement.entries.length; index++) {
          const element2 =  categsElement.entries[index];
          element.imgURL = element2.imgURL;
          element.audioURL = element2.audioURL;
        }
        categs.push(element);
      }
    }
    res.json(categs);
  } catch (error) {
    res.json({'error': '500 Server Error'});
  }
});

router.get('/questions', async(req, res) => {
  try {
    let getAllData = await getCachedData();
    for (let i = 0; i < getAllData.pages.length; i++) {
      const element = getAllData.pages[i];
      if(element.title == "Întrebări") {
        console.log(element);
        res.json(element);
      }
    }
  } catch (error) {
    res.json({'error': '500 Server Error'});
  }
});

module.exports = router;
