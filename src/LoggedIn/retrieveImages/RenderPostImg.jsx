import { useEffect,useState } from "react";
import { retrievePostImg } from "./retrievePostImg";
export default function RenderPostImg({url}) {
    let [img,setImg]=useState('')
    useEffect(()=>{
        if(url === null){
            return
        }
      let imageUrl = null;

      const fetchData = async () => {
        imageUrl = await retrievePostImg(url);
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
      <img className="postImg" src={img}></img>
      </>)
}