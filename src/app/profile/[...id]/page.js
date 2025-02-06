import React from 'react'

const page =  async ({params}) => {
 const {id} =  await params;;
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className=' bg-green-600 text-white py-3 px-10 rounded'>{id}</h1>
    </div>
  )
}

export default page
