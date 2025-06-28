"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Redirect() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/direct/auth/login');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f9f9ec]'>
      <div className='text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4 border border-[#cfd592]'>
        <div className='mb-6'>
          <div className='w-16 h-16 bg-[#96a141] rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'></path>
            </svg>
          </div>
          <h2 className='text-2xl font-bold text-[#3e4423] mb-2'>Authentication Required</h2>
          <p className='text-[#596229] mb-6'>
            You must login to continue and access this content.
          </p>
        </div>
        
        <button
          onClick={handleLogin}
          className='w-full cursor-pointer bg-[#757f31] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#596229] transition-colors flex items-center justify-center space-x-2'
        >
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z' clipRule='evenodd'></path>
          </svg>
          <span>Login to Continue</span>
        </button>
      </div>
    </div>
  )
}