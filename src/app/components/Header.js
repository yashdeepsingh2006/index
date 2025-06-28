"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header(props) {

  const router = useRouter();
  const { title } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session, status } = useSession();

  // Remove initial state values, use session data directly or fallbacks
  const profile = session?.user?.image || '/profile.jpg';
  const name = session?.user?.name || 'User';
  const email = session?.user?.email || 'user@example.com';

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
    setShowDropdown(false);
  };

  const confirmSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: '/direct/auth/login' });
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsSigningOut(false);
      setShowSignOutModal(false);
    }
  };

  const cancelSignOut = () => {
    setShowSignOutModal(false);
  };

  const login = async () => {
    setIsLoggingIn(true);
    try {
      router.push('/direct/auth/login');
    } catch (error) {
      console.error('Login redirect error:', error);
    } finally {
      // Reset loading state after a short delay for navigation
      setTimeout(() => setIsLoggingIn(false), 1000);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <div className='flex flex-row justify-between items-center p-4 pl-7 w-full relative'>
        <div className='text-[#3e4423] text-xl font-bold'>{title}</div>
        
        {/* Show loading state or content based on session status */}
        {status === 'loading' ? (
          <div className='flex items-center space-x-2'>
            <div className='w-12 h-12 rounded-full bg-gray-200 animate-pulse'></div>
            <div className='hidden sm:block'>
              <div className='h-4 bg-gray-200 rounded w-20 animate-pulse'></div>
            </div>
          </div>
        ) : session ? (
          <div className='relative' ref={dropdownRef}>
            <Image
              className='rounded-full border-2 cursor-pointer border-gray-100 hover:border-gray-300 transition-colors'
              height={50}
              width={50}
              src={profile}
              alt='Profile Picture'
              onClick={toggleDropdown}
            />
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className='absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50'>
                <div className='py-2'>
                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100'>
                    <div className='font-medium text-gray-900'>{name}</div>
                    <div className='text-sm text-gray-500'>{email}</div>
                  </div>
                  <button 
                    className='w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 disabled:opacity-50'
                    onClick={handleSignOutClick}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? (
                      <div className='flex items-center space-x-2'>
                        <div className='w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
                        <span>Signing Out...</span>
                      </div>
                    ) : (
                      'Sign Out'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Show login button when not authenticated
          <button
            onClick={login}
            disabled={isLoggingIn}
            className='px-4 py-2 bg-[#96a141] cursor-pointer text-white rounded-lg hover:bg-[#596229] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
          >
            {isLoggingIn ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                <span>Loading...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        )}
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
          <div className='bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              Sign Out
            </h3>
            <p className='text-gray-600 mb-6'>
              Exit the app to end session. Are you sure you want to sign out?
            </p>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={cancelSignOut}
                disabled={isSigningOut}
                className='px-4 py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                disabled={isSigningOut}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium disabled:opacity-50 flex items-center space-x-2'
              >
                {isSigningOut ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span>Signing Out...</span>
                  </>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
