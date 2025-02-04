import { useEffect, useState } from 'react';
import SideBar from '../../sideBar/SideBar';
import { useNavigate } from "react-router-dom";
import RenderPostAvatar from '../../retrieveImages/RenderPostAvatar';
import retrieveProfile from './retrieveProfile.js'
import RenderPostImg from '../../retrieveImages/RenderPostImg.jsx';
import unfollowUser from './unfollowUser.js';
import sendFollowRequest from './sendFollowRequest.js';
import FullPost from '../../popups/FullPost/FullPost.jsx';
import checkLikeStatus from '../feed/posts/icons/checkLikeStatus.js';

import { useParams } from 'react-router-dom';
import heartWhite from '../../../img/heartWhite.svg'
import commentIcon from '../../../img/commentWhite.svg'

import logout from '../../logout.js';
import checkTokenValidity from '../checkTokenValidity.js';
export default function Profile() {
  const { username } = useParams();

  let [profile,setProfileData]=useState()
  let [followingState,setFollowingState]=useState()
  
  // const [displayBigPost, setDisplayBigPost] = useState(false);
  // const [bigPostData, setBigPostData] = useState([]);
  // const [bigPostComments, setBigPostComments] = useState([]);
  // const [postImgRetrieved, setPostImgRetrieved] = useState();
  const [isLiked, setIsLiked] = useState();
  
  // let [token,setToken]=useState(localStorage.getItem("token"))
  
  const [postId, setPostId] = useState();
  const [fullPost, setFullPost] = useState(false);

  function changeFullPost(postId){
    setPostId(postId)
    setFullPost(!fullPost)
  }
  const navigate = useNavigate();
  useEffect(() => {
        
    checkTokenValidity().then((response)=>{
        if(response===false){
            navigate("/")
        }
    })
        
    localStorage.getItem("token") ? console.log("logged in") :navigate("/")
    const fetchData = async ()=>{
      try{
        if(localStorage.getItem("token")!=null){
            const result = await checkTokenValidity();
            console.log(result)
            if(result.result==false){
                logout()
                navigate("/")
              }
        } else {
            navigate("/")
        }
        let results=await retrieveProfile(username)
        setProfileData(results)
        setFollowingState(results.checkIfFollowing.response)
      } catch(e) {
          console.log(e)
      }
      retrieveProfile()
    }
    fetchData()
  }
    , [])
  return (
    <>
    
    <SideBar  />
      {fullPost && 
        <FullPost data={postId} changeFullPost={changeFullPost}/>
      }
    {profile && 
    <div style={{width:"52vw"}}>

      <div className='profileData'>
        <RenderPostAvatar url={profile.profileData.profilePic} />
        
        <div style={{display:"flex",flexDirection:"column"}} className='profileUser'> 
            <div style={{fontSize:"1.5vw",display:"flex",alignItems:"center"}}>
              <p> {profile.profileData.username}</p>
              {profile.profileData.username!=localStorage.getItem("username") &&
              <>
              {followingState=="accepted" &&
                <button className='followingButton' onClick={()=>{setFollowingState("none"),unfollowUser(profile.profileData.id,profile.checkIfFollowing.id)}} style={{marginLeft:"1vw",height:"100% "}}>Unfollow</button>
              }
              {followingState=="pending" &&
                <button className='followingButton' onClick={()=>{setFollowingState("none"),unfollowUser(profile.profileData.id,profile.checkIfFollowing.id)}} style={{marginLeft:"1vw",height:"100% "}}>Cancel Request</button>
              }
              {followingState=="denied" &&
                <button className='notFollowingButton' onClick={()=>{setFollowingState("pending"),sendFollowRequest(profile.profileData.id)}} style={{marginLeft:"1vw",height:"100% "}}>Follow</button>
              }
              {followingState=="none" &&
                <button  className='notFollowingButton'  onClick={()=>{setFollowingState("pending"),sendFollowRequest(profile.profileData.id)}} style={{marginLeft:"1vw",height:"100% "}}>Follow</button>
              }
              </>
              
              }

            </div>
          <div style={{display:"flex",fontSize:"2vw"}}>
            <p style={{fontWeight:"600",marginRight:".2vw",fontSize:"1vw"}}> {profile.profilePosts.length} </p><p style={{marginRight:".5vw",fontSize:"1vw"}}> Posts</p>
            <p style={{fontWeight:"600",marginRight:".2vw",fontSize:"1vw"}}> {profile.followersData.length} </p> <p style={{marginRight:".5vw",fontSize:"1vw"}}> Followers</p>
            <p style={{fontWeight:"600",marginRight:".2vw",fontSize:"1vw"}}>{profile.followingData.length} </p> <p style={{fontSize:"1vw"}}> Following</p>
          </div>
          <p style={{fontSize:"1vw",marginTop:"1VW"}}>{profile.profileData.bio}</p>
          <div >

          </div>
          </div>
        
      </div>
      <div className='profilePostsContainer'>
      {profile.profilePosts.length==0 && <p>No posts yet.</p>}
      {profile.profilePosts.map((obj)=>{
        let imgResult = <RenderPostImg  url={obj.img} />
        
        // let isLiked = await checkLikeStatus(obj.id)
        return (<div className='profilePosts' key={obj.id} onClick={()=>{setIsLiked(isLiked),changeFullPost(obj)}} >
        <div className="postStats">
          <img style={{display:"absolute",height:"1.2vw",width:"1.2vw"}} src={heartWhite}></img><p>{obj.likes}</p>
          <img style={{display:"absolute",height:"1.2vw",width:"1.2vw",marginLeft:"1vw"}} src={commentIcon}></img>  <p>{obj.postedIn.length}</p>
        </div>
        {imgResult}
        </div>)
      })}
      </div>
    </div>
    }
    </>
  )
}
