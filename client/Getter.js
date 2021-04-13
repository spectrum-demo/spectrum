
import config from './config';
// TO DO: store the data, load the data, update
// The method first init is going to check if the content was stored to the computer, otherwise fetch data.

export default class Getter {

  getAllData = async () => {
    
    try {
      let response = await fetch(config.API_ADDR + '/data');
      let res = await response.json();  
      
      return res;
    } catch (error) {
       console.error(error);
    }
  }

  getButtons = async () => {
    
    try {
      let getAllData = await this.getAllData();
       for (let i = 0; i < getAllData.pages.length; i++) {
        const element = getAllData.pages[i];
        if(element.title == "Butoane") {
          return element;
        }
      }
    } catch (error) {
       console.error(error);
    }
  }

  getCategs = async () => {
    let categs = [];
    try {
      let getAllData = await this.getAllData();
       for (let i = 0; i < getAllData.pages.length; i++) {
        const element = getAllData.pages[i];
        if(element.title != "Întrebări") {
          categs.push(element);
        }
      }
      return categs;
    } catch (error) {
       console.error(error);
    }
  }
  
  getSubcateg = async (titleCateg) => {
    let categs = await this.getCategs();

    for (let i = 0; i < categs.length; i++) {
      const element = categs[i];
      if(element.title == titleCateg) {
        return element.entries;
      }
    }
  }

  getCard = async (cardTitle, subcategTitle) => {
    let entriesSubcateg = await this.getSubcateg(subcategTitle);
    console.log(entriesSubcateg);
    console.log(cardTitle);

    for (let i = 0; i < entriesSubcateg.length; i++) {
      const element = entriesSubcateg[i];
      if(cardTitle == element.denumire) {
        
        return element;
      }
    }
  }

  getQuestions = async () => {
    
    try {
      let getAllData = await this.getAllData();
       for (let i = 0; i < getAllData.pages.length; i++) {
        const element = getAllData.pages[i];
        if(element.title == "Întrebări") {
          console.log(element);
          return element;
        }
      }
    } catch (error) {
       console.error(error);
    }
  }
}