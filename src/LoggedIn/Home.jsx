import SideBar from "./sideBar/SideBar"
import Feed from "./body/feed/Feed"
import { useEffect,useState } from "react"
import checkTokenValidity from "./body/checkTokenValidity";
import { useNavigate } from "react-router-dom";

import logout from "./logout";

export default function Home(){
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem("lastDate",0)

        let checkIfLogin=async()=>{
            
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
        }
        checkIfLogin()
    }, []);

    return (<>

        <SideBar />
        <Feed />
    </>)
}