import { useState,useEffect } from "react"
import { retrieveFollowers } from "./retrieveFollowers"
export default function RenderFollowingAmmount({id}){
    let [res,setRes]=useState(0)
    useEffect(()=>{
        const fetchData = async () =>{
            let result = await retrieveFollowers(id)
            console.log(result)
            setRes(result.length)
        }
        fetchData()
    },[])
    return(<>
    <p style={{color:"rgb(160, 160, 160)"}}>{res} Followers</p>
    </>)
}