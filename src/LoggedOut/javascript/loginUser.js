import storeUserInfo from './storeUserInfo';
import axios from 'axios'

import getAdress from '../../getAdress';
export default async function loginUser(redirect,storeResult) {
  let adress=getAdress()
  const loginEmail=document.getElementById("loginEmail").value
  const loginPassword=document.getElementById("loginPassword").value
  try{
    let results= await axios.post(adress + '/login', {
      headers: {
        headers: {'X-Requested-With': 'XMLHttpRequest'},
      },
      loginEmail:loginEmail,
      loginPassword:loginPassword,
    })
    console.log(results)
    if(Object.hasOwn(results.data, 'email')){
      storeUserInfo(results.data.username,results.data.email,results.data.token,results.data.img,redirect)
    
    }else {
      storeResult(results.data[0].errors)
    }


  } catch (error){
    console.log(error)
  }

  //     console.log(response.data)

  //   }
  //   return response
  // })
  // // .then(function(response){
  // //   if(response.data.error){
  // //     console.log(response.data)
  // //   } else {
  // //     redirect()
  // //   }

  // // })
  // .catch(function (error) {
  //   console.error('Error:', error);
  // });
}