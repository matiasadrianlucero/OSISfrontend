import axios from 'axios'
import getAdress from '../../../getAdress'
export async function createPostJS(changePopUp,checked){
    let formData=new FormData()
    let adress=getAdress()
    
    let postImg=document.getElementById("postImg").files[0]
    let visibility=checked
    var postText=document.getElementById("postText").value
    formData.append("postImg",postImg)
      axios.post(adress + '/upload/Post', formData, 
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'folder': '/src/imgs/',
                'Authorization':localStorage.getItem("token")
            }
        })
      .then(function (response) {
        postImg=response.data
        axios.post(adress + '/create/Post', {postText:postText,postImg:postImg,visibility:visibility}, 
          {
              headers: {
                  'X-Requested-With': 'XMLHttpRequest',
                  // 'folder': 'posts/',
                  'Authorization':localStorage.getItem("token")
              }
          })
          .then(function (response) {
            if(response.data){
              changePopUp()
            }
          })
          .catch(function (error) {
            console.error('Error:', error);
        });
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
    }