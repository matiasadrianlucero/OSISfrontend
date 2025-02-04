import axios from "axios"
import getAdress from "../../../../../getAdress";
export  default async function interactLike(postId,animateLike){
  let adress=getAdress()
  try {
    axios.post(adress + '/like/Post', {postId:postId}, 
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization':localStorage.getItem("token")
            }
        })
        .then(function (response) {
          console.log(response)
          if(response.data.result==true){
            animateLike()
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}