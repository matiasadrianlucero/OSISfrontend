import { createPostJS } from "./createPostJS"
import cross from '../../../img/cross.svg'
import {useState} from 'react'
import addImageIcon from '../../../img/addImage.svg'
import send from '../../../img/send.svg'
import lockOpen from '../../../img/lockOpen.svg'
import lockClosed from '../../../img/lockClosed.svg'

export default function CreatePost({changePopUp}){
    const [file, setFile] = useState("");
    const [checked, setChecked] = useState(false);

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div style={{display:"flex",justifyContent:"center",zIndex:"3"}}>
              
        <div className="createPost">
            
            <h2 style={{color:"black"}}>Create new post </h2>
            <img className="closeBigPost" style={{width:"2vw",height:"2vw",position:"absolute",right:"0",backgroundColor:"black"}} src={cross} onClick={()=>{changePopUp()}}></img>
            <div style={{flex:"2",display:"flex",width:"100%",justifyContent:"center",paddingLeft:"0",paddingRight:"0",flexDirection:"column",overflow:"hidden"}}>
                
                {file=="" ?
                <>
                    <img className="uploadImg"  src={addImageIcon} ></img>
                    <button className="uploadButton" 
                    onClick={()=>{document.getElementById("postImg").click()}}>Select from computer</button>
                </>
                :
                <img src={file}  style={{width:"100%",objectFit:"cover",zIndex:"-1",height:"100%",borderBottomRightRadius:"10PX",borderBottomLeftRadius:"10PX"}}/>
                }
                <input style={{display:"none"}}type='file' onChange={handleChange} id="postImg" name='postImgName'></input>
            </div>

            {file!=="" && 
                <>
                <div style={{flex:"1",width:"100%",display:"flex",position:"absolute",bottom:"1vw",gap:"1vw"}}>

                    
                    <textarea style={{borderRadius:"10px",resize:"none",outline:"none",border:"none",flex:"8",marginLeft:"1vw",backgroundColor: "white",filter:" drop-shadow(0 0 1.300px black)"}} id="postText"></textarea>  
                    
                    <button style={{border:"none",flex:"1",background:"none",backgroundColor:"none"}} onClick={()=>{document.getElementById("postImg").click()}}>
                        <img src={addImageIcon} className="createPostIcons"/>
                    </button>
                    {/* <input type="checkbox" id="visibility" name="visibility" value="Bike" style={{display:"none"}}/> */}
                    <div onClick={()=>{setChecked(!checked)}} style={{alignItems:"center",marginTop:".5vw",marginBottom:".5vw"}}>
                    {checked==false ?
                        <button style={{border:"none",flex:"1",background:"none"}} type="submit" onClick={(e)=>{document.getElementById("submitCreatePost").click()}}>
                            <img src={lockOpen} className="createPostIcons" style={{}}/>
                        </button>                    
                        :
                        <button style={{border:"none",flex:"1",background:"none"}} type="submit" onClick={(e)=>{document.getElementById("submitCreatePost").click()}}>
                            <img src={lockClosed} className="createPostIcons" style={{}}/>
                        </button>                    
                    }
                    </div>
                    <button style={{border:"none",flex:"1",background:"none"}} type="submit" onClick={(e)=>{document.getElementById("submitCreatePost").click()}}>
                        <img src={send} className="createPostIcons"/>
                    </button>
                    <form style={{display:"none"}}>  
                        <button type="submit" id="submitCreatePost" onClick={(e)=>{e.preventDefault(),createPostJS(changePopUp,checked)}}>Post</button>
                    </form> 
                </div>

                </>
            }
            
        
    </div>
        </div>
)
}