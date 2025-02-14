'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
const [data, setData] = useState("")
const router = useRouter()

const getUserData = async () => {
  try {
    const response = await axios.post("/api/users/me")
    // console.log(response.data);
    
    setData(response.data)
    
  } catch (error) {
    console.log(error)
    toast.error("Failed to fetch user data")
    
  }
}

useEffect(() => {
  getUserData()
}, [])

const logout = async () => {
  try {
    await axios.get("/api/users/logout")
    toast.success("Logged out successfully")
    router.push("/login")
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to logout")
  }
}
  return (
    <div className='flex flex-col items-center gap-8 justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <p className='text-center'>{JSON.stringify(data)}</p>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}

export default ProfilePage
