'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'


const SignupPage = () => {
  const router= useRouter();

  const [user, setUser] = useState({name:"", username:"", email:"", password:""})
  const [loading, setLoading] = useState(false)
  const [buttonDesable, setButtonDesable] = useState(false)

  const onSignup= async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      toast.success("Signup success")
      router.push("/login")
      
    } catch (error) {
      console.log("Singup failed", error);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    if(user.name.length>0 && user.username.length>0 && user.email.length>0 && user.password.length>0){
      setButtonDesable(false)
    }else{
      setButtonDesable(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing": "Signup"}</h1>
      <div className='flex flex-col items-center justify-center gap-4 p-4 [&>Input]: w-96'>
      <Input type="text" placeholder="Name" value={user.name} onChange={(e)=> setUser({...user, name: e.target.value})} />
      <Input type="text" placeholder="Username" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})}/>
      <Input type="email" placeholder="Email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/>
      <Input type="password" placeholder="Password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
      {loading? <Button disabled={true}>Processing...</Button> :
      <Button disabled={buttonDesable} onClick={onSignup} className="bg-blue-500 text-white p-2 rounded-md">
      {buttonDesable? "No Signup": "Signup"}</Button>}
      <Link href="/login"> Visit Login page</Link>
      </div>
    </div>
  )
}

export default SignupPage
