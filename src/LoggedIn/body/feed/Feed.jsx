import axios from 'axios'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

import {useEffect, useState} from 'react'


import logout from '../../logout';

import FullPost from '../../popups/FullPost/FullPost.jsx'

import FollowList from './FollowList'
import Following from './followingFeed/Following.jsx'
import Explore from './exploreFeed/Explore.jsx'
function Feed(){
  const timeAgo = new TimeAgo('en-US')

  const [followArr, setFollowArr] = useState([]);
  function auxSetFollowArr(data){
    setFollowArr(data)
  }
  const [firstRetrieve, setFirsRetrieve] = useState(false);
  function auxSetFirstRetrieve(data){
    setFirsRetrieve(data)
  }

  const [explore, setExplore] = useState(false);

  const [time, setTime] = useState(1000);

  // const [comments, setComments] = useState();
  // const [isLiked, setIsLiked] = useState();
  // const [likes, setLikes] = useState();
  const [fullPost, setFullPost] = useState(false);
  const [postData, setPostData] = useState();
  function changeFullPost(data){
    // data,isLiked,likes,comments
    setPostData(data)
    // setLikes(likes)
    // setIsLiked(isLiked)
    setFullPost(!fullPost)
    // setComments(comments)
  }
  // async function loadFeed(){
  //   const fetchData = async () => {
  //     try {
  //       const data = await retrievePosts();
                        
  //       setFeedData(prevFeedData => [...prevFeedData, ...data]);
  //       if (data.length > 0) {
  //         setLastPost(data[0].dateOfCreation)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     } finally {
  //       setFetching(false)
  //     }
  //   }
  //   fetchData()
  // }
    useEffect(()=>{
      document.getElementById("home").click()
      localStorage.setItem("lastDate",0)

    },[])
  // useEffect(() => {

  //   const fetchData = async () => {
  //     if (fetching) {
  //       console.log("fetching")
  //       return
  //     } else {
  //       setFetching(true)
  //     }
  //     try {
  //       const data = await retrievePosts();
        
        
  //       if(data.postsList.length>0){
  //         setFollowList(data.followList);

  //         setFeedData(prevFeedData => [...prevFeedData, ...data.postsList]);
  //         localStorage.setItem("lastDate",data.postsList[0].dateOfCreation)
  //       }
  //       setFirsRetrieve(true)

  //       // setFeedData(prevFeedData => [...prevFeedData, ...data]);
  //       // if (data.length > 0) {
  //       //   localStorage.setItem("lastDate",data[0].dateOfCreation)
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     } finally {
  //       setFetching(false)
  //     }
  //   };
  
  //   const interval = setInterval(async () => {
  //     await fetchData();
  //   }, 2000);
  
  //   return () => clearInterval(interval);
  // }, []);

  return (<>
      {fullPost && 
        <FullPost data={postData} changeFullPost={changeFullPost} 
        // likeProp={likes} commentsProp={comments} isLikedProp={isLiked}
        />
      }
      <div style={{display:"flex"}}>
        <div className="feed">
          <div className='feedButtons'>
            <button id='home' onClick={()=>{setExplore(false),
            document.getElementById("home").style.color="black",
            document.getElementById("explore").style.color="gray",
            localStorage.setItem("lastDate",0)

            }}>Home</button>
            <button id='explore' onClick={()=>{setExplore(true),

              document.getElementById("explore").style.color="black",
              document.getElementById("home").style.color="gray"

            }}>Explore</button>
          </div>
          {explore==true ? 
          <Explore changeFullPost={changeFullPost}/>      
          :
          <Following changeFullPost={changeFullPost} auxSetFollowArr={auxSetFollowArr} auxSetFirstRetrieve={auxSetFirstRetrieve} />      
          }
  

          {/* {feedData && feedData.map((post,index)=>{
            return (
              <div key={index} className="post"> */}
                {/* <Post data={post} changeFullPost={changeFullPost}/> */}
              {/* </div>
            )  
          }
          )} */}
        </div>
      </div>
      <FollowList firstRetrieve={firstRetrieve} data={followArr}/>
  </>)
}
export default Feed
