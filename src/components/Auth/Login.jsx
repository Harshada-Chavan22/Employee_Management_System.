import React from 'react'

const Login = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
       <div className='border-2 rounded-xl border-emerald-600 p-20' >
        <form className='flex flex-col items-center justify-center'>
            <input required className=" text-black outline-none bg-transparent border-2 border-emerald-600 text-xl py-3 px-5 rounded-full" type="email" placeholder:text-gray-400 placeholder="Enter Your Email"/>
            <input required className=" text-black outline-none bg-transparent border-2 border-emerald-600 text-xl py-3 px-5 rounded-full mt-3" type="password" placeholder:text-gray-400 placeholder="Enter Your Password"/>
            <button className='mt-5 text-white border-none outline-none bg-emerald-600 text-xl py-3 px-5 rounded-full'>Log in</button>
        </form>
       </div>
    </div>
  )
}

export default Login