import axios from 'axios'
import getAdress from '../../getAdress';
export async function retrieveFollowers(id){
  let adress=getAdress()
    return new Promise((resolve, reject) => {
      let url = adress + '/followers/' + id
      axios.get(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': localStorage.getItem("token")
        }
      })
        .then(function (response) {
            resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    }
  )

}