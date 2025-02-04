import { useEffect, useState } from 'react';
import loginUser from './javascript/loginUser';
import registerUser from './javascript/registerPost';
import { useNavigate } from "react-router-dom";
import checkLogged from '../checkLogged/checkLogged'
import { use } from 'react';
function App() {
  let [displayLogin,setDisplayLogin]=useState(true)
  const navigate = useNavigate();
  let [loginResults,setResults]=useState([])
  function redirect(){
    navigate('Home/');
  }
  useEffect((e) => {
    checkLogged() ? redirect() : null
  }, [])
  function storeResult(results){
    setResults(results)
  }
  return (
    <div className='landingFather'>
      <div className='landingDiv'>
      <h1 className='title'>OSIS</h1>
      {displayLogin ? 
          <form>
            <label >Email</label><input placeholder='Email' type='email' name="loginEmail" id="loginEmail"/>
            <label >Password</label><input placeholder='Password' type='password' name="loginPassword" id="loginPassword"/>
            <button onClick={(e)=>{event.preventDefault(),loginUser(redirect,storeResult)}} className='submitLandingFormButton'>Login</button>
            <ul>
            {loginResults && loginResults.map((error,index)=>{
            
            return (<>
              <li key={index}>{error.msg}</li>
            </>)
            })}
            </ul>
          </form>
      :
        <form style={{marginBottom:".5vw"}}>
          <label >Username</label><input type='text' id="registerUsername"/>
          <label >Email</label><input type='email' id="registerEmail"/>
          <label >Password</label><input type='password' id="registerPassword"/>
          <button className='submitLandingFormButton' onClick={(e)=>{e.preventDefault(),registerUser(storeResult)}}>Register</button>
          <ul>
          {loginResults && loginResults.map((error,index)=>{
            return (<>
              <li key={index}>{error.msg}</li>
            </>)
          })}
          </ul>
        </form>
        

      }
        {displayLogin ? <p>Don't have an account? Click <button className='smallButton' onClick={()=>{setDisplayLogin(!displayLogin),setResults([])}}>here</button> to register.</p> : <p>Already have an account? Click <button className='smallButton' onClick={()=>{setDisplayLogin(!displayLogin)}}>here</button> to login.</p>}

          
      </div>
    </div>
  )
}

export default App
