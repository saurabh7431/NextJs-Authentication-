'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {

  const [user, setUser] = useState({email:"", password:""})
  const [loading, setLoading] = useState(false)
  const [buttonDesable, setButtonDesable] = useState(false)
  const router =useRouter()
  const {toast}=useToast()

  // Login functionality
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
  
      // Handle 200 response (successful login)
      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${response.data.message}`,
        });
        router.push("/profile");
      }
    } catch (error) {
      // Check if the error response exists
      if (error.response) {
        
        // Extract the error message from the response
        toast({
          title: "Login Failed",
          description: error.response.data.message || "An error occurred during login.",
          variant: "destructive",
        });
      } else {
        // Handle cases where there's no response (e.g., network error)
        toast({
          title: "Login Failed",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
      setButtonDesable(false)
    }else{
      setButtonDesable(true)
    }
  },[user])
  return (
    <div className='flex flex-col items-center p-3 justify-center bg-gray-800 min-h-screen py-2'>
       <div className="w-full max-w-md p-8 space-y-2 bg-white rounded-lg shadow-md"> 
      <h1 className='text-center font-bold text-3xl'>Login</h1>
      <div className='flex flex-col items-center justify-center gap-4 p-4'>
      <div className='w-full'>
      <label>Email</label>
      <Input type="email" placeholder="Email" value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})}/>
      </div>
      <div className='w-full'>
        <label>Password</label>
      <Input type="password" placeholder="Password" value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})}/>
      </div>
      {loading ? <Button className="w-full"  disabled={true}>
        <Loader2 className='w-full animate-spin'/> Processing...
        </Button> :
      <Button disabled={buttonDesable} onClick={onLogin} className="bg-blue-500 w-full text-white p-2 rounded-md">
      {buttonDesable? "No Login": "Login"}</Button>}
      <div className="text-center ">
          <p>
          Not a member yet?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoginPage
