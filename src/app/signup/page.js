'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const SignupPage = () => {
  const router= useRouter();
  const {toast}=useToast()

  const [user, setUser] = useState({name:"", username:"", email:"", password:""})
  const [loading, setLoading] = useState(false)
  const [buttonDesable, setButtonDesable] = useState(false)

  const onSignup= async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      toast({
        title:"Sent verification email",
        description: `Please check your email to verify your account`,
      })
      router.push("/login")
      
    } catch (error) {
      console.log("Singup failed", error);
      if(error.response){
        toast({
          title: "Error",
          description: `${error.response.data.message}. Please login with your email and password to continue`,
          variant: "destructive",
        })
      }else{
        toast({
          title: "Error",
          description: "Failed to send verification email",
          variant: "destructive",
        })
      }
      
    }finally{
      setLoading(false)
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
    <div className='flex flex-col items-center p-3 justify-center bg-gray-800 min-h-screen '>
      <div className="w-full max-w-md p-8 space-y-2 bg-white rounded-lg shadow-md">
      <h1 className=' text-center font-bold text-3xl'>Signup</h1>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
        <div className='w-full'>
          <label>Name</label>
          <Input type="text" placeholder="Name" value={user.name} onChange={(e)=> setUser({...user, name: e.target.value})} />
        </div>
        <div className='w-full'>
          <label>Username</label>
          <Input type="text" placeholder="Username" value={user.username} onChange={(e)=> setUser({...user, username: e.target.value})}/>
        </div>
        <div className='w-full'>
          <label>Email</label>
          <Input type="email" placeholder="Email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/>
        </div>
        <div className='w-full'>
          <label>Password</label>
      <Input type="password" placeholder="Password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
        </div>
      {loading? <Button className="w-full"  disabled={true}>Processing...</Button> :
      <Button disabled={buttonDesable} onClick={onSignup} className="bg-blue-500 w-full mt-2 text-white p-2 rounded-md">
      {buttonDesable? "No Signup": "Signup"}</Button>}
      <div className="text-center">
          <p>
            Already a member?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SignupPage
