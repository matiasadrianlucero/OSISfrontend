import axios from "axios";
import getAdress from "../../../getAdress";
export default async function updateAvatar(setAlertFunc){
  let adress=getAdress()
    const updateAvatarFile = document.getElementById("updateAvatarFile").files[0]
    let formData = new FormData()
    formData.append('updateAvatarFile', updateAvatarFile)
    
    axios.post(adress + '/update/Avatar/', formData, 
    {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem("token"),
            'folder': '/src/imgs/',
        }
    },
  )
    .then(function (response) {
      if(response.data){
        setAlertFunc(response.data.msg)
        localStorage.setItem("avatar",response.data.newName)
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
  }
