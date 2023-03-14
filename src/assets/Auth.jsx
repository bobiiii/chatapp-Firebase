import React, { useState } from 'react'
import {auth, provider} from "./firebase-config.js"
import {signInWithPopup} from "firebase/auth"
import Cookies from 'universal-cookie'
import useAuth from "./useAuth";

function Auth({setAuth}) {
  const {userData,setUserData, setUserId} = useAuth()

  const cookies = new Cookies()
  const signInWithGoogle = async()=>{
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    const token = result.user.refreshToken
    cookies.set("token", token)
        setUserData(result.user)
        localStorage.setItem('userID', result.user.displayName);
        setAuth(true)
        }

  return (
    <div className='d-flex min-vh-100 justify-content-center align-items-center'>
        <div className='text-center '><h3>Custom Chat App</h3>
        <button onClick={signInWithGoogle} className="btnauth text-light p-2 border-2 rounded-3">Sign In With Google</button>
        </div></div>
  )
}

export default Auth