 import { useState,useEffect} from "react";
 import Post from "../posts/Post";
 import retrievePosts from "./retrievePosts";
 import loading from '../../../../img/loading.svg'
 export default function Following({changeFullPost,auxSetFollowArr,auxSetFirstRetrieve}){
      const [feedData, setFeedData] = useState([]);
      const [fetching, setFetching] = useState(false);
      const [firstRetrieve, setFirsRetrieve] = useState(false);

      useEffect(() => {    
        const fetchData = async () => {
          if (fetching) {
            console.log("fetching")
            return
          } else {
            setFetching(true)
          }
          try {
            const data = await retrievePosts();
            
            if(data.postsList.length>0){
                auxSetFollowArr(data.followList);
    
                setFeedData(prevFeedData => [...prevFeedData, ...data.postsList]);
                localStorage.setItem("lastDate",data.postsList[0].dateOfCreation)
            }
            setFirsRetrieve(true)
            auxSetFirstRetrieve(true)
    
            // setFeedData(prevFeedData => [...prevFeedData, ...data]);
            // if (data.length > 0) {
            //   localStorage.setItem("lastDate",data[0].dateOfCreation)
            // }
          } catch (error) {
            console.error('Error fetching user:', error);
          } finally {
            setFetching(false)
          }
        };
      
        const interval = setInterval(async () => {
          await fetchData();
        }, 2000);
      
        return () => clearInterval(interval);
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