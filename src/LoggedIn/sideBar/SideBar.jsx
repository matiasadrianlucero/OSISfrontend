import { useNavigate } from "react-router-dom";
//icons
import homeIcon from '../../img/home.svg'
import logoutIcon from '../../img/logout.svg'

import searchIcon from '../../img/search.svg'
import createPostIcon from '../../img/createPost.svg'
import settingsIcon from '../../img/settings.svg'
import friendRequest from '../../img/friendRequest.svg'

import logout from "../logout";
import {useState} from 'react'
import RenderFollowRequests from "./followRequests/RenderFollowRequests";
import RenderFindUser from "./findUser/RenderFindUser";

import CreatePost from "../popups/CreatePost/CreatePost"
import AccountSettings from "../popups/accountSettings/AccountSettings"
import RenderPostAvatar from "../retrieveImages/RenderPostAvatar";
export default function SideBar(){
    const navigate = useNavigate();
    const [sideBarDisplay, setSideBarDisplay] = useState();

    function minimizeSideBar(){
        document.getElementById("sideBarButtons").style.display="none"

                document.getElementById("sideBarButtons").style.flex="0"
        document.getElementById("sideBarButtons").style.flexBasis="11%"
        document.getElementById("sideBarButtons").style.borderRight=".1vw solid rgb(212, 212, 212)"
        document.getElementById("sideBarTitle").style.visibility="hidden"
    }
    function maximizeSizeBar(){
        document.getElementById("sideBarButtons").style.display="flex"
        setSideBarDisplay('')
        document.getElementById("sideBarTitle").style.visibility="visible"
        document.getElementById("sideBarButtons").style.flex=".4"
    }
    let [popUp,setPopUp]=useState('')
    
    function changePopUp(input){
        setPopUp(input)
    }
    return(<>

        {popUp=='CreatePost' &&
            <CreatePost changePopUp={changePopUp} />
        }
        {popUp=='AccountSettings' &&
            <AccountSettings changePopUp={changePopUp} />
        }
    <div style={{justifyContent:"flex-end",position:"absolute",display:"flex"}}>
        <div className="sideBar" style={{flexDirection:"row",display:"flex",position:"fixed"}}>
            <div id="sideBarButtons" style={{paddingTop:"1vw",overflow:"hidden",flexDirection:"column",display:"flex",rowGap:"2vw",borderRight:".1vw solid  rgb(212, 212, 212)"}}>
                <h1 id="sideBarTitle">OSIS</h1>
                <div className="topButtons" style={{flexGrow:"1",gap:"2vw",display:"flex",flexDirection:"column"}}>
                    <button className="sideBarButton" onClick={()=>{navigate("/Home/"),maximizeSizeBar()}}><img src={homeIcon}></img><p>Home</p></button>
                    <button className="sideBarButton" onClick={()=>{setSideBarDisplay("search"),minimizeSideBar()}}><img src={searchIcon}></img><p>Search</p></button>
                    <button className="sideBarButton" onClick={()=>{changePopUp("CreatePost")}}><img src={createPostIcon}></img><p>Create</p></button>
                    <button className="sideBarButton"  onClick={()=>{setSideBarDisplay("friend requests"),minimizeSideBar()}}><img src={friendRequest}></img><p>Requests</p></button>
                    <button className="sideBarButton"  onClick={()=>{navigate(`/Profile/${localStorage.getItem('username')}`),maximizeSizeBar()}}><RenderPostAvatar url={localStorage.getItem("avatar")}/><p>{localStorage.getItem("username")}</p></button>
                    
                </div>
                <div className="bottomButtons" style={{marginBottom:"2vw",display:"flex",gap:"1vw",flexDirection:"column"}}>
                    <button className="sideBarButton" onClick={()=>{changePopUp("AccountSettings")}}><img src={settingsIcon}></img><p>Settings</p></button>
                    <button onClick={()=>{navigate("/"),logout()}} className="sideBarButton"><img src={logoutIcon}></img><p>Logout</p></button>
                </div>
                
                
            </div>

            {sideBarDisplay=='friend requests' &&
            <>
                <div className="openedSideBar">
                    <RenderFollowRequests maximizeSizeBar={maximizeSizeBar} />
                </div>
            </>
            }
            {sideBarDisplay=='search' &&
            <>
                <div className="openedSideBar">
                    <RenderFindUser maximizeSizeBar={maximizeSizeBar} />
                </div>
            </>
            }
            
        </div>
        <div>

        </div>
    </div>
    </>)
}