import findUser from "./findUser"
import { useDebounce } from 'use-debounce';
import {useEffect, useState} from 'react'
import axios from 'axios'
import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar";
import RenderFollowingAmmount from "../../misc/RenderFollowingAmmount";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import retrieveProfile from "../../body/profile/retrieveProfile";

export default  function RenderFindUser({maximizeSizeBar}){
    let [userToFind,setUserToFind]=useState('')
    let [findUserResults,setFindUserResults]=useState()
    const [debouncedFindUser] = useDebounce(userToFind, 1500);

    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await findUser(userToFind);
          setFindUserResults(data);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
        };

      if (userToFind !== '') {
        fetchData();
        }
      },[debouncedFindUser])
    return (<>
        <div>
          <h3 style={{marginLeft:"1vw",color:"black"}} onClick={()=>{maximizeSizeBar()}}>Back</h3>
          <h2 style={{marginLeft:"1vw",backgroundColor:"white",border:"none"}}>Search</h2>
          <form>
              <input placeholder="Search" className="searchInput" onChange={(event)=>{setUserToFind(event.target.value)}} ></input>  
          </form> 
        </div>
      
        <div id='searchContent' >

          {findUserResults && findUserResults.map((user)=>{
              let profileUrl="/Profile/" + user.username
              return (
                <div key={user.id}
                className="findUser"
                style={{display:"flex",padding:"1vw"}}
                onClick={()=>{navigate(profileUrl),window.location.reload();
                }}
                >
                

                <RenderPostAvatar url={user.profilePic} />
                <div style={{display:"flex",flexDirection:"column"}}>
                  <p style={{fontWeight:"500",fontSize:".9vw"}} className="findUsername">{user.username}</p>
                  <RenderFollowingAmmount id={user.id}/>  
                </div>
                
              </div>
              )
          })}
        </div>

    </>)
}
