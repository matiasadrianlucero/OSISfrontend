import { useState,useEffect} from "react";
import Post from "../posts/Post";
import retrieveExplore from "./retrieveExplore";
import loading from '../../../../img/loading.svg'
export default function Explore({changeFullPost}){
    // auxSetFollowArr,auxSetFirstRetrieve
     const [feedData, setFeedData] = useState([]);
     const [firstRetrieve, setFirsRetrieve] = useState(false);

     useEffect(() => {    
        const fetchData = async () => {
            const results= await retrieveExplore()
            setFeedData(prevFeedData => [...prevFeedData, ...results.postsList]);
            setFirsRetrieve(true)
        };
        fetchData()
     }, []);
   return(<>
       {firstRetrieve==false && <div className='emptyPosts'><img className='loading' src={loading}></img></div>}
       {firstRetrieve==true && feedData.length==0 && <div className='emptyPosts'><p style={{color:"gray"}}>No posts found boyo.</p></div>}
       {feedData && feedData.map((post,index)=>{
           return (
               <div key={index} className="post">
                   <Post data={post} changeFullPost={changeFullPost}/>
               </div>
           )}
       )}        
</>
   )
}