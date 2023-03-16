import React,{useEffect, useState, useRef} from 'react'
import {auth, db} from "./firebase-config"
import {addDoc,collection,orderBy, onSnapshot, query, serverTimestamp, where} from "firebase/firestore"
import useAuth from './useAuth'

function Chat(props) {
    const {userData } = useAuth()
    const forView = useRef(null)
    
    const [newMessages, setNewMessages] = useState("")
    const [messages, setMessages] = useState([])
    const room = props.room 
    
    const messageRef = collection(db, "messages")
    // console.log("before map "+userId)
    // console.log("before map "+userData.email)
    const userID = localStorage.getItem("userID")
    

useEffect(()=>{
    setTimeout(()=>{

        forView.current.scrollIntoView({behavior: "smooth"})
    },2000)
    
},[])
useEffect(()=>{
    const queryMessages = query(
        messageRef,
        where("room", "==", room),
        orderBy("createdAt")
      );
   const unsbscribe = onSnapshot(queryMessages, (snapShot)=>{
        let message = []
        snapShot.forEach((doc)=>{
            message.push({...doc.data(), id: doc.id})
        })
        
        setMessages(message)
        
    })
    return  ()=>{unsbscribe }
},[])

    const handleSubmit= async(e)=>{
          e.preventDefault()
          if(newMessages=== "") return
          await addDoc(messageRef,{
              text: newMessages,
              createdAt: serverTimestamp(),
              user: auth.currentUser.displayName,
              photoURL: auth.currentUser.photoURL,
              room
      })
        setNewMessages("")
}
  return (
    <div className='main d-flex justify-content-center align-items-center bg-dark'>
    <div className=' chatbox d-flex vh-100 flex-column bg-light align-items-center' >
        <div className='msgs-room px-2 rounded-2 border-bottom'>
        <h5 className=''>Welcome to Room: {room.toUpperCase()}</h5>
        </div>
        <div className='msgsList bg-light w-100' >
        {messages.map((message )=>{
            
            return(<div key={message.id}>
                {userID === message.user ?
            <div className=' d-flex justify-content-end  my-0 p-2 align-items-center' key={message.id}>
            <p className='mx-1 px-3 rounded-pill text-white bg-primary'>{message.text}</p>  
                <img className='img-fluid   rounded-circle' src={message.photoURL} alt="photo url"/>
           
         </div>  :
            <div className=' d-flex justify-content-start  my-0 p-2 align-items-center' key={message.id}>
                <img className='img-fluid   rounded-circle' src={message.photoURL} alt="photo url"/>
            <p className=' user2msg mx-1 px-3 rounded-pill  '>{message.text}</p>  
            </div> 

                }
                        
                </div>
            )
        })}
        
<div ref={forView} className='forView'></div>
        </div>
        <div className='chatForm' >
        <form className='w-100' onSubmit={handleSubmit}>
            <input className='w-75  px-2 py-1  rounded-3' onChange={(e)=>{setNewMessages(e.target.value)}} value={newMessages} placeholder='Type your message'/>
            <button className='w-25 px-1 py-1 border border-primary rounded-3' type='submit'>Send</button>
        </form>
        </div>
    </div> </div>
  )
}

export default Chat