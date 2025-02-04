import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function sendFollowRequest(id){
  let adress = getAdress()
  axios.post(adress + '/send/followRequest', {id:id}, 
  {
      headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization':localStorage.getItem("token")
      }
  })
  .then(function (response) {
    if(response.data){
      console.log("friend request added")
    }
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}