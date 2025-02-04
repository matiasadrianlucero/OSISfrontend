import followRequests from "./followRequests"
import respondFollowRequest from "./respondFollowRequest"
import { useDebounce } from 'use-debounce';
import {useEffect, useState} from 'react'
import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"
import RenderFollowingAmmount from "../../misc/RenderFollowingAmmount"
export default  function RenderFollowRequests({maximizeSizeBar}){
    let [foundResults,setFoundResults]=useState()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await followRequests();
          setFoundResults(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
        };
        fetchData()
      },[])
    async function retrieveFeed(){
      const data = await followRequests();
      setFoundResults(data);
    }
    function reorderRequests(index){
      const arr=foundResults 
      const changedArr=arr.splice(1,index)
      setFoundResults(changedArr)
    }
    return (<>
        <h3 style={{marginLeft:"1vw",color:"black"}} onClick={()=>{maximizeSizeBar()}}>Back</h3>
        <h2 style={{marginLeft:"1vw",backgroundColor:"white",border:"none"}}>Follow Requests</h2>

        <div id='searchContent'>
          requests:
        {foundResults && foundResults.map((request,index)=>{

            return(
            <div key={request.id}
              className="findUser"
              style={{display:"flex",padding:"1vw"}}>
              <RenderPostAvatar url={request.sendingRelation.profilePic} />
                <div style={{display:"flex",flexDirection:"column",marginRight:"1vw"}}>
                  <p style={{fontWeight:"500",fontSize:".9vw"}}>{request.sendingRelation.username}</p>
                  <RenderFollowingAmmount id={request.sendingRelation.id}/>  
                </div>
                <div style={{alignItems:"center",display:"flex",flex:"1",justifyContent:"end",columnGap:"1vw"}}>
                  <button className="acceptRequest" style={{padding:".5vw"}} onClick={()=>{
                    respondFollowRequest(request.id,"accepted"),
                    reorderRequests(index)}} >Accept</button>
                  <button className="rejectRequest" style={{padding:".5vw"}} onClick={()=>{
                    respondFollowRequest(request.id,"denied"),
                    reorderRequests(index)}}>Deny</button>)
                </div>
                
            </div>
            )
        })}
        
        </div>

    </>
    )
}
