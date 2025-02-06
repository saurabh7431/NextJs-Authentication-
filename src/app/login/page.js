'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const LoginPage = () => {

  const [user, setUser] = useState({email:"", password:""})
  const [loading, setLoading] = useState(false)
  const [buttonDesable, setButtonDesable] = useState(false)
  const router =useRouter()
  const onLogin= async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data);
      toast.success("Login success")
      router.push("/profile")
      
    } catch (error) {
      console.log("Login failed", error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
      setButtonDesable(false)
    }else{
      setButtonDesable(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing": "Login"}</h1>
      <div className='flex flex-col items-center justify-center gap-4 p-4 [&>Input]: w-96'>
      <Input type="email" placeholder="Email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/>
      <Input type="password" placeholder="Password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
      {loading? <Button disabled={true}>No Login</Button> :
      <Button disabled={buttonDesable} onClick={onLogin} className="bg-blue-500 text-white p-2 rounded-md">
      {buttonDesable? "No Login": "Login"}</Button>}
      <Link href="/login"> Visit Signup page</Link>
      </div>
    </div>
  )
}

export default LoginPage
