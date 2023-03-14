import React,{useState, useRef, useEffect} from 'react'
import Auth from './assets/Auth'
import Cookies from 'universal-cookie'
import Chat from './assets/Chat'

import "./App.css"
function App() {
  //Initialization
  const cookie = new Cookies()
  const buttonRef = useRef(null)

  //State Variables
  //set cookie to variable, later check user is logged in or not
  const[auth, setAuth]= useState(cookie.get("token"))
  const[room, setRoom]= useState(null)


  //handler Functions

  // function createRoomHandler(e){
  //   e.preventDefault()
  //   setRoom(buttonRef.current.value)
  // }
  
  //if cookie is not present then render Auth Comp
  if (!auth) {
      
    return <div><Auth setAuth={setAuth}/></div>
  }
  
  
  // useEffect(()=>{
    
  // },[]) 
  
  
    
    return(<>
    {room ? <Chat room={room}/> :
    <div className='room vh-100 d-flex justify-content-center align-items-center'>
      <form className='d-grid abcd' >
      <h3 className=' p-1 text-center '>Create or Join Room</h3>
        <input className='my-2 p-1' ref={buttonRef} type={"text"} placeholder="Enter room Name" autoFocus={true}/>
        <button className='btnroom p-1 fs-5 text-white border-primary rounded' onClick={()=>{setRoom(buttonRef.current.value)}} >Goto Chatroom  </button>
      </form>
    </div> }
    </>)



}

export default App