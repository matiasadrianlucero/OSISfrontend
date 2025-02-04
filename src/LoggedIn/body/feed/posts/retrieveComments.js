import axios from 'axios'
import getAdress from '../../../../getAdress';
export default async function retrieveComments(postId) {
  let adress=getAdress()
  let url = adress + '/retrieve/Comments/' + postId
  try {
    const response = await axios.get(url, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization': localStorage.getItem("token")
      }
    });
    if (response && response.data) {
      return response.data
    } else {  console.log('No data found');
      return null;
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}