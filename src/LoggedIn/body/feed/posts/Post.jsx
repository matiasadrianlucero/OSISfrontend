import RenderPostAvatar from "../../../retrieveImages/RenderPostAvatar"
import RenderPostImg from "../../../retrieveImages/RenderPostImg"
import ReactTimeAgo from 'react-time-ago'
import { useEffect,useState } from "react"

import { submitComment } from "./interactions/submitComment"
import { useNavigate } from "react-router-dom";

import thumbsUp from "../../../../img/heart.svg"
import commentIcon from "../../../../img/comment.svg"

import retrieveComments from "./retrieveComments"
import interactLike from "./icons/interactLike"
import checkLikeStatus from "./icons/checkLikeStatus"
export default function Post({data,changeFullPost}){
    const navigate = useNavigate();
    let [isLiked,setIsLiked]=useState()
    let [likes,setLikes]=useState(data.likes)
    let [comments,setComments]=useState([])
    let [postText,setPostText]=useState()

    useEffect(() => {
        const fetchData = async () => {
            const results= await checkLikeStatus(data.id)
            const retrieveResults = await retrieveComments(data.id);
            
            setComments(retrieveResults);
            setIsLiked(results.results)
        };
        fetchData()
    }, []);
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
    return (<>
    
            <div className="postUserInfo" onClick={()=>{document.getElementById("linkProfile").click()}}>
                <RenderPostAvatar url={data.user.profilePic} />
                <p className="postUsername"  onClick={()=>{navigate("/Profile/" + data.user.username)}}>{data.user.username} </p>
                <p  className="postDate">•<ReactTimeAgo date={data.dateOfCreation} locale="en-US"/></p>
            </div>
            <div className="postDivImg">
                <RenderPostImg url={data.img} />    
            </div>
            <div className='postInteractions'>
                {isLiked==true ?
                <button 
                    style={{filter:"grayscale(0%)"}}
                    onClick={()=>{interactLike(data.id,animateLike)}} className="likeButton"><img src={thumbsUp} className="thumbsUp"></img>
                </button>
                : 
                <button 
                    style={{filter:"grayscale(100%)"}}
                    onClick={()=>{interactLike(data.id,animateLike)}} className="likeButton"><img src={thumbsUp} className="thumbsUp"></img>
                </button>
                }
                <button onClick={()=>{changeFullPost(data)}} style={{filter:"grayscale(100%)"}} className="likeButton"><img src={commentIcon} className="thumbsUp"></img></button>
            </div>
            <p style={{fontWeight:"500",fontSize:".8vw"}}>{likes} Likes {comments.length} Comments</p>
            <div className="postBody">
                {data.text!=="" && 
                    <div className="postComment">
                        <p className="postUsername">{data.user.username} </p><p className="postText">{data.text}</p>     
                    </div>
                    
                }
                    {comments.length>0 &&
                        <div className="postComment">
                        <p className="postUsername">{comments[0].commentRelation.username} </p><p className="postText">{comments[0].response}</p>     
                        </div>                    
                    }
                    {comments.length>1 &&
                        <div className="postComment">
                        <p className="postUsername">{comments[1].commentRelation.username} </p><p className="postText">{comments[1].response}</p>     
                        </div>               
                    }
                    {comments.length>2 &&
                        <div className="postComment">
                            <button onClick={()=>{changeFullPost(data)}} >View More Comments</button>
                        </div>               
                        
                    }
            </div>

            <form className="leaveComment">
                <textarea placeholder="Add a comment..." name="commentPost" 
                onChange={(event)=>{setPostText(event.target.value)}}
                // id="commentPost"
                className="commentPost"></textarea>           
                <button style={{border:"none" }} onClick={(event)=>{
                    event.preventDefault(),
                    submitComment(data.id,postText,addComment)                    
                    }}
                >COMMENT</button>
            </form> 

    </>)
}