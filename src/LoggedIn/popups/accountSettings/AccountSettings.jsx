import updateUsername from "./updateUsername"
import updateAvatar from "./updateAvatar"
import updateEmail from "./updateEmail"
import updatePassword from "./updatePassword"
import updateBio from "./updateBio"

import cross from '../../../img/cross.svg'
import { useEffect, useState } from "react"

import RenderPostAvatar from "../../retrieveImages/RenderPostAvatar"

import AlertMsg from "../alert/AlertMsg"
export default function AccountSettings({changePopUp}){
    const [file, setFile] = useState("");
    const [alert, setAlert] = useState("");
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));  
        updateAvatar(setAlertFunc)
    }
    function setAlertFunc(msg){
        setAlert(msg)
        setTimeout(function(){
        setAlert("")}
        , 5000)
        
    }
    useEffect(()=>{
        if(file!=""){
            updateAvatar(setAlertFunc)
        }
        
    },[file])
    return (<>
        {alert!=="" && 
            <AlertMsg msg={alert}/>
        }
        <div style={{display:"flex",justifyContent:"center"}}>    

            
            <div className="accountSettings">
                <img className="closeBigPost" style={{width:"2vw",height:"2vw",position:"absolute",right:"0",backgroundColor:"black"}} src={cross} onClick={()=>{changePopUp()}}></img>
                <h3>Profile Settings</h3>
                <div >
                    
                    <div className="" style={{display:"flex",flexWrap:"wrap", justifyContent:"center"}}>
                        <div className="updateAvatar" onClick={()=>{document.getElementById("updateAvatarFile").click()}}>
                            {file=="" ? 
                            <RenderPostAvatar url={localStorage.getItem("avatar")} />
                            : 
                            <img  src={file}/>
                            }
                            
                        </div>
                        {/* <button onClick={()=>{updateAvatar(setAlertFunc)}}>Update Avatar</button> */}
                        <div style={{display:"flex",flexDirection:"column"}}>
                            <form style={{display:"flex",flex:"1"}}>
                                
                                <input className="settingInput"  placeholder={localStorage.getItem("email")} id="updateEmail"></input>
                                <button className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updateEmail(setAlertFunc)}}>Update Email</button>
                            </form >
                            <form style={{display:"flex",flex:"1",marginTop:".5vw"}}>
                                
                                <input className="settingInput" placeholder={localStorage.getItem("username")} id="updateUsername"></input>
                                <button  className="updateButton" type="submit" onClick={(e)=>{e.preventDefault(),updateUsername(setAlertFunc)}}>Update Username</button>    
                            </form>               
                        </div>
                    </div>
                                            
                    <h4 style={{color:"black"}}>Bio:</h4>
                            <div>
                                <form style={{flexDirection:"column",display:"flex",flex:"1"}}>
                                    <textarea className="updateInput" id="updateBio"></textarea>
                                    <button className="updateButton"  type="submit" onClick={(e)=>{e.preventDefault(),updateBio(setAlertFunc)}}>Update Bio</button>    
                                </form>       
                            </div>
                            

                </div>
                <h3>Advanced Settings</h3>
                <div>
                    <div>
                        <form style={{display:"flex",flexWrap:"wrap",width:"90%",marginLeft:"1vw",marginRight:"1vw"}}>
                                <input className="settingInput" id="updatePasswordUpdate" placeholder='Updated Password'></input>
                                <input className="settingInput" id="updatePasswordCurrent"  placeholder='Current Password'></input>
                                <button className="updateButton"   type="submit" onClick={(e)=>{e.preventDefault(),updatePassword(setAlertFunc)}}>Update Password</button>    
                            </form> 
                        <form style={{display:"none"}}>
                            <input type="file" id="updateAvatarFile" onChange={handleChange} name='updateAvatarFile'/>
                            <button id="updateAvatarButton" className="settingsButton" type="submit"onClick={(e)=>{e.preventDefault(),updateAvatar(setAlertFunc)}}>avatar</button>
                        </form> 
                    </div>

                </div>
            </div>
    </div>
    </>)
}