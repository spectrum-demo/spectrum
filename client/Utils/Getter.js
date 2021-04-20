
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
      console.log("Getter buttons");
      let response = await fetch(config.API_ADDR + '/data/buttons');
      console.log("response");
      let res = await response.json();  
      console.log(res);
      
      return res;
    } catch (error) {
       console.error(error);
    }
  }

  getCategs = async () => {
    try {
      console.log("Getter categories");
      let response = await fetch(config.API_ADDR + '/data/categories');
      console.log("response");
      let res = await response.json();  
      console.log(res);
      
      return res;
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
      console.log("Getter questions");
      let response = await fetch(config.API_ADDR + '/data/questions');
      console.log("response");
      let res = await response.json();  
      console.log(res);
      
      return res;
    } catch (error) {
       console.error(error);
    }
  }

  getPhoneNumber = async () => {
    try {
      return '0040790376790';
    }
    catch (error) {
      console.error(error);
    }
  }

  getPhoneNumber = async () => {
    try {
      const value = await AsyncStorage.getItem('phoneNumber');
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };
}