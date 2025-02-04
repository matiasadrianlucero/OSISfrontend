import axios from 'axios'
import getAdress from '../../../getAdress';
export default async function unfollowUser(id,requestId){
  let adress=getAdress()
  axios.post(adress + '/unfollow', {id:id,requestId:requestId}, 
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