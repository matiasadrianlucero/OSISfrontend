import axios from 'axios'
import getAdress from '../../getAdress';
export async function retrieveAvatar(avatarName){
    let adress=getAdress()
  
    return new Promise((resolve, reject) => {
      let url = adress + '/avatar/' + avatarName
      axios.get(url, {
        responseType: 'blob',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(function (response) {
          if (response.status === 200 && response.data instanceof Blob) {
            const imgUrl = URL.createObjectURL(response.data);
            resolve(imgUrl);
          } else {
            reject(new Error('Failed to fetch image'));
          }
        })
        .catch(error => {
          reject(error);
        });
    }
  )

}