'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, {useEffect, useState } from 'react'

const VerifyEmail = () => {
  const [token, setToken]=useState('')
  const [verified, setVerified]=useState(false)
  const [error, setError]=useState(false)
  const router = useRouter();

  // console.log("useRouter",router.query);
  
  const verifyEmail = async () => {
    try {
        await axios.post('/api/users/verifyemail', {token})
        setVerified(true)
        setError(false)
    } catch (error) {
      setError(true)
      console.log(error.response.data);
      
    }
  }

  useEffect(() => {
    setError(true)
    const urlToken= window.location.search.split("=")[1]
    setToken(urlToken || '')  
    const {query} = router
    // const urlToken= query.token;
    // setToken(urlToken || '')  

  }, [])

  useEffect(() => {
    setError(false)
    if (token.length >0) {
      verifyEmail()
    }
  }, [token])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl font-bold'>Verify Email</h1>
      <h2 className='text-2xl font-bold'>{token ? `${token}`: "No Token"}</h2>
      {verified &&(
        <div>
          <h2 className='text-2xl font-bold'>Email Verified</h2>
          <Link href="/login" > Login</Link>
        </div>
      )}
      {error && <p className='text-red-500'>Error verifying email</p>}

    </div>
  )
}

export default VerifyEmail
