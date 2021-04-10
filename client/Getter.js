
import config from './config';
// TO DO: store the data, load the data, update... 
export default class Getter {

  dataFetch = async () => {
      console.log("hehe");
    try {
      let response = await fetch(config.API_ADDR + '/data');
      let res = await response.json();  
      console.log(res);
      return res;
    } catch (error) {
       console.error(error);
    }
  }
}