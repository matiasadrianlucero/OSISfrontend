import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function retrieveLikes(postId) {
    let adress=getAdress()
  
  let url = adress + '/retrieve/Likes/' + postId
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem("token")
      }
    });
    if (response && response.data) {
      return response.data
    } else {  
      
      
      return 0;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}