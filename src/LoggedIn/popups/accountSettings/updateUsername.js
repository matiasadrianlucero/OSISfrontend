import axios from "axios";
import getAdress from "../../../getAdress";
export default async function updateUsername(setAlertFunc){
      let adress=getAdress()
    
    const updateUsername=document.getElementById("updateUsername").value
    const username=localStorage.getItem("username")

    axios.post(adress + '/update/Username', {updateUsername:updateUsername,username:username}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){
        setAlertFunc(response.data.msg)
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}
