import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function respondFollowRequest(requestId,response) {
  let adress=getAdress()
  
  try {
    axios.post(adress + '/respond/followRequest', {requestId:requestId,response:response}, 
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
    } catch (error) {
        console.error('Error:', error);
    }
}