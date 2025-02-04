import { useEffect,useState } from "react";
import { retrieveAvatar } from "./retrieveAvatar";
import defaultAvatar from "../../img/default.jpg";
export default function RenderPostAvatar({url}) {
    let [img,setImg]=useState('')
    useEffect(()=>{
        if(url === null){
            return
        }
      let imageUrl = null;

      const fetchData = async () => {
        imageUrl = await retrieveAvatar(url);
        setImg(imageUrl);
      };
    
      fetchData().catch(console.error);
    
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    },[])

    return (
      <>
      {img === null ? <img src={defaultAvatar} className="postAvatar"></img> : <img className="postAvatar" src={img}></img>}
      </>)
}