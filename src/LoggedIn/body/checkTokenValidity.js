import axios from 'axios'
import getAdress from '../../getAdress';
export default async function checkTokenValidity(){
    let adress=getAdress()
    let url = adress + '/checkTokenValidity' 
  
    try {
      const response = await axios.get(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': localStorage.getItem("token"),
        },
      });
      if (response && response.data) {
        return response.data
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
}