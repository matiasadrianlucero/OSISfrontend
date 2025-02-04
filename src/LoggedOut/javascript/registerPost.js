import axios from 'axios'

import getAdress from '../../getAdress';
export default function registerUser(storeResult) {
  let adress=getAdress()
  
  const registerUsername=document.getElementById("registerUsername").value 
  const registerEmail=document.getElementById("registerEmail").value
  const registerPassword=document.getElementById("registerPassword").value

  axios.post(adress + '/register', {
    headers: {
      headers: {'X-Requested-With': 'XMLHttpRequest'},    
    },
    registerUsername:registerUsername,
    registerEmail:registerEmail,
    registerPassword:registerPassword

  })
  .then(function (response) {
    console.log(response)
      storeResult(response.data.errors)
    
  })
  .catch(function (error) {
    console.error('Error:', error);
  });
}
