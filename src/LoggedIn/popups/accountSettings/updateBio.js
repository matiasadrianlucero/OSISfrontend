import axios from "axios";
import getAdress from "../../../getAdress";

export default async function updateBio(setAlertFunc){
    let adress=getAdress()
  
    const bio=document.getElementById("updateBio").value

    axios.post(adress + '/update/Bio', {bio:bio}, 
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