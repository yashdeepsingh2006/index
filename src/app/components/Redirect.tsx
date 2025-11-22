"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Redirect(): React.JSX.Element {
  const router = useRouter();

  const handleLogin = (): void => {
    router.push('/direct/auth/login');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f9f9ec] p-4 sm:p-6 lg:p-8'>
      <div className='text-center p-6 sm:p-8 lg:p-10 bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md lg:max-w-lg w-full mx-4 border border-[#cfd592]'>
        <div className='mb-6 sm:mb-8'>
          <div className='w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#96a141] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
            <svg className='w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'></path>
            </svg>
          </div>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-[#3e4423] mb-2 sm:mb-3'>Authentication Required</h2>
          <p className='text-sm sm:text-base lg:text-lg text-[#596229] mb-6 sm:mb-8 leading-relaxed'>
            You must login to continue and access this content.
          </p>
        </div>
        
        <button
          onClick={handleLogin}
          className='w-full cursor-pointer bg-[#757f31] text-white py-3 sm:py-4 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-lg font-medium hover:bg-[#596229] focus:bg-[#596229] focus:outline-none focus:ring-2 focus:ring-[#96a141] focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base lg:text-lg active:scale-95 transform'
        >
          <svg className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex-shrink-0' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z' clipRule='evenodd'></path>
          </svg>
          <span>Login to Continue</span>
        </button>

        {/* Additional help text for mobile users */}
        <div className='mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-[#dfe3b3]'>
          <p className='text-xs sm:text-sm text-[#757f31] opacity-75'>
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  )
}