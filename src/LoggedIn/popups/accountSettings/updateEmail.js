import axios from "axios";
import logout from "../../logout";
import getAdress from "../../../getAdress";

export default async function updateEmail(setAlertFunc){

    const updateEmail=document.getElementById("updateEmail").value
    const email=localStorage.getItem("email")
  let adress=getAdress()

    axios.post(adress + '/update/Email', {updateEmail:updateEmail,email:email}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){
        setAlertFunc(response.data.msg)
        if(response.data.msg=="Email updated, please log in again."){
          setTimeout(() => {
            logout()
            window.location.reload();
  
          }, 4000);
        }
        
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
}