import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"
import RenderPostImg from "../../retrieveImages/RenderPostImg"
import thumbsUp from "../../../img/heart.svg"
import commentIcon from '../../../img/comment.svg'
import cross from '../../../img/cross.svg'
import { useEffect,useState } from 'react'
import checkLikeStatus from "../../body/feed/posts/icons/checkLikeStatus"
import { submitComment } from "../../body/feed/posts/interactions/submitComment"

import interactLike from "../../body/feed/posts/icons/interactLike"


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

import React from 'react'
import ReactTimeAgo from 'react-time-ago'

import retrieveComments from "../../body/feed/posts/retrieveComments"
import retrieveLikes from "./retrieveLikes"
export default function FullPost({changeFullPost,data}){    

    let [comments,setComments]=useState([])
    let [isLiked,setIsLiked]=useState(false)
    let [likes,setLikes]=useState(0)
    let [postText,setPostText]=useState()

    function animateLike(){
        if(isLiked){
            setIsLiked(false)
            setLikes(likes-1)
        } else {
            setIsLiked(true)
            setLikes(likes+1)
        }
    }
    function addComment(text){
        setComments(prevFeedData => [...prevFeedData, ...[{response:text,commentRelation:
            {profilePic:localStorage.getItem("avatar"),
            username:localStorage.getItem("username")}}]]
        )
    }
    useEffect(() => {
    const fetchData = async () => {
        let results= await checkLikeStatus(data.id)
        const retrieveResults = await retrieveComments(data.id);
        const likesResult = await retrieveLikes(data.id);

        setIsLiked(results.results)
        setLikes(likesResult)
        setComments(retrieveResults)
    };
    fetchData()
    }, []);

    return (
    <div style={{justifyContent:"center",display:"flex"}}>
 
        <div className="bigPost" style={{position:"fixed",backgroundColor:"white"}}>
            <div className="bigPostImg">
                <RenderPostImg url={data.img} />
            </div>
            <div  className="postInfoDiv">
                <div className="bigPostUserInfo">
                    <RenderPostAvatar url={data.user.profilePic} />
                    <p className="postUsername">{data.user.username} </p>
                    <img className="closeBigPost" style={{width:"2vw",height:"2vw",position:"absolute",backgroundColor:"black",right:"0",top:"0"}} src={cross} onClick={()=>{changeFullPost("")}}></img>

                </div>
            
                <div className="bigPostComments">
                    {comments.length===0 ? 
                        <div className="emptyCommentsPostDiv"><p>No comments yet.</p></div>  
                    : 
                    comments.map((post,index)=>{    
                            return (
                                <div key={index} className="postComments">
                                    <RenderPostAvatar url={post.commentRelation.profilePic} />
                                    
                                    <p className="postCommentName">{post.commentRelation.username}</p>
                                    <p className="fullCommentText">{post.response}</p>
                                    
                                    
                                </div>
                                )  
                        })
                    }
                </div>
                
                <div className="bigPostInteractions">
                    <div className="bigPostIcons" style={{display:"flex",flex:"1"}}>
                        {isLiked==true ?
                            <button 
                            style={{filter:"grayscale(0%)"}}
                            onClick={()=>{
                                interactLike(data.id,animateLike)}}
                                // interactLike(postId),}}
                             className="likeButton"
                            >
                            <img src={thumbsUp} className="thumbsUp"></img>
                            </button>
                        : 
                            <button 
                            style={{filter:"grayscale(100%)"}}
                            onClick={()=>{interactLike(data.id,animateLike)
                            }}
                             className="likeButton"
                            ><img src={thumbsUp} className="thumbsUp"></img>
                            </button>
                        }
                        <button className="likeButton"><img src={commentIcon} className="thumbsUp"></img></button>
                    </div>
                    <div>
                        <p>{likes} Likes  {comments.length} Comments</p>
                        
                    </div>
                    <p>
                        <ReactTimeAgo date={data.dateOfCreation} locale="en-US"/>
                    </p>

                    <form className="bigComment" style={{flex:"2"}}>
                        <textarea onChange={(e)=>{setPostText(e.target.value)}} placeholder="Add a comment..." name="commentPost" id="commentPost" className="commentPost"></textarea>
                        <button className="commentButton" style={{color:"#FF90E8",border:"none" }} 
                        onClick={(event)=>{event.preventDefault()
                        ,submitComment(data.id,postText,addComment)
                        }}>COMMENT</button>
                    </form> 
                </div>
                
            </div>
        </div>
    </div>)

}