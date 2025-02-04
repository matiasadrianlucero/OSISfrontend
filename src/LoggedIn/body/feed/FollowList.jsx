import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"
import { useNavigate } from "react-router-dom";
import loading from '../../../img/loading.svg'
export default function FollowList({data,firstRetrieve}){
    const navigate = useNavigate();

    return(<>
        <div className="followingDiv" >
        {/* <div 
        // className="sideBar"
         style={{position:"fixed"}}> */}
        <div className="followList">
            <h4 style={{color:"black",fontSize:".8vw"}}>Following:</h4>
            {firstRetrieve==false && <img className='loading' src={loading}></img>}
            
            {data.length==0  && firstRetrieve==true && <p style={{color:"gray",fontSize:"1vw"}}>Not following anyone at the moment.</p>}
            {data && data.map((follow,index)=>{
                return(
                    <div key={index} className="follow" onClick={()=>{navigate(`/Profile/${follow.recieverRelation.username}`)}}>
                        <RenderPostAvatar url={follow.recieverRelation.profilePic}/>
                        <p style={{    width:"50%",
                            textOverflow: "ellipsis",textAlign:"start",
                            whiteSpace: "nowrap",
                            overflow: "hidden"}} >{follow.recieverRelation.username}</p>
                        {follow.response=="pending" && <p style={{textAlign:"end",flexGrow:"1",color:"#FF90E8",fontWeight:"600"}}>Pending</p>}
                    </div>
                )
            })}
        </div>    
        {/* </div>     */}
        </div>
    </>)
}