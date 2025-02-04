import axios from 'axios'
import getAdress from '../../../../../getAdress'
  export async function  submitComment(postId,postText,addComment){
    let comment =postText
    let adress=getAdress()
    let url = adress + '/comment/Post' 
    try {
      const response = await axios.post(url,{comment:comment,postId:postId}, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': localStorage.getItem("token"),
        },
      }
      
      );
      if (response.data.result) {
        if (response.data.result) {
          addComment(postText)
        }

      } else {  console.log('No data found');
        return null;
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }