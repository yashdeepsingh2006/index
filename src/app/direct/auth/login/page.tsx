'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'

export default function LoginPage(): React.JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Google sign-in error:', error)
    } finally {
      setLoading(false)
    } 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9ec] to-[#eff0d7]">
      {/* Header at the top */}
      <Header title="Login" />
      
      {/* Main content centered */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-sm sm:max-w-md lg:max-w-lg w-full space-y-6 sm:space-y-8">
          {/* Login Card */}
          <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-lg border border-[#cfd592]">
            <div className="text-center mb-6 sm:mb-8">
              {/* App Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#96a141] to-[#757f31] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#3e4423] mb-2 sm:mb-3">
                Welcome Back
              </h2>
              <p className="text-sm sm:text-base text-[#596229] leading-relaxed">
                Use your Google account to continue securely
              </p>
            </div>

            {/* Google Sign In Button */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="group cursor-pointer relative w-full flex justify-center items-center py-3 sm:py-4 lg:py-5 px-4 sm:px-6 border-2 border-[#cfd592] text-sm sm:text-base lg:text-lg font-medium rounded-xl text-[#494f25] bg-white hover:bg-[#eff0d7] focus:outline-none focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-50 focus:border-[#96a141] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 transform"
              >
                {loading ? (
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#494f25] border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
              
              {/* Security Notice */}
              <div className="bg-[#f9f9ec] p-3 sm:p-4 rounded-lg border border-[#dfe3b3]">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#757f31] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[#494f25] mb-1">Secure Authentication</h4>
                    <p className="text-xs text-[#596229] leading-relaxed">
                      Your data is protected with industry-standard security. We never store your Google password.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#757f31] mb-2">
              By signing in, you agree to our terms of service
            </p>
            <div className="flex items-center justify-center space-x-4 sm:space-x-6">
              <a href="#" className="text-xs sm:text-sm text-[#96a141] hover:text-[#757f31] transition-colors duration-200">Privacy Policy</a>
              <span className="text-[#cfd592]">•</span>
              <a href="#" className="text-xs sm:text-sm text-[#96a141] hover:text-[#757f31] transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}