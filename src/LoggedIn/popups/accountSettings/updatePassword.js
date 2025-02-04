import axios from "axios";
import logout from "../../logout";
import getAdress from "../../../getAdress";
export default async function updatePassword(setAlertFunc){
  let adress=getAdress()

    const updatePasswordUpdate=document.getElementById("updatePasswordUpdate").value
    const updatePasswordCurrent=document.getElementById("updatePasswordCurrent").value

    axios.post(adress + '/update/Password', {updatePasswordUpdate:updatePasswordUpdate,updatePasswordCurrent:updatePasswordCurrent}, 
    {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization':localStorage.getItem("token")
        }
    })
    .then(function (response) {
      if(response.data){

        setAlertFunc(response.data.msg)
        if(response.data.msg=="Password updated, please log in again."){
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