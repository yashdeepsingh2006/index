"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps): React.JSX.Element {

  const router = useRouter();
  const { title } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showSignOutModal, setShowSignOutModal] = useState<boolean>(false);
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Remove initial state values, use session data directly or fallbacks
  const profile = session?.user?.image || '/profile.jpg';
  const name = session?.user?.name || 'User';
  const email = session?.user?.email || 'user@example.com';

  const toggleDropdown = (): void => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOutClick = (): void => {
    setShowSignOutModal(true);
    setShowDropdown(false);
  };

  const confirmSignOut = async (): Promise<void> => {
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

  const cancelSignOut = (): void => {
    setShowSignOutModal(false);
  };

  const login = async (): Promise<void> => {
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
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      <div className='flex flex-row justify-between items-center p-3 sm:p-4 lg:p-6 pl-4 sm:pl-6 lg:pl-8 w-full relative'>
        <div className='text-[#3e4423] text-lg sm:text-xl lg:text-2xl font-bold truncate mr-2'>{title}</div>
        
        {/* Show loading state or content based on session status */}
        {status === 'loading' ? (
          <div className='flex items-center space-x-2'>
            <div className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 animate-pulse'></div>
            <div className='hidden sm:block'>
              <div className='h-3 sm:h-4 bg-gray-200 rounded w-16 sm:w-20 animate-pulse'></div>
            </div>
          </div>
        ) : session ? (
          <div className='relative' ref={dropdownRef}>
            <Image
              className='rounded-full border-2 cursor-pointer border-gray-100 hover:border-gray-300 transition-colors'
              height={40}
              width={40}
              src={profile}
              alt='Profile Picture'
              onClick={toggleDropdown}
              style={{ width: 'auto', height: 'auto' }}
            />
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className='absolute right-0 top-12 sm:top-14 bg-white border border-gray-200 rounded-lg shadow-lg w-48 sm:w-52 z-50'>
                <div className='py-2'>
                  <div className='px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100'>
                    <div className='font-medium text-gray-900 text-sm sm:text-base truncate'>{name}</div>
                    <div className='text-xs sm:text-sm text-gray-500 truncate'>{email}</div>
                  </div>
                  <button 
                    className='w-full text-left px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-100 text-red-600 disabled:opacity-50 text-sm sm:text-base'
                    onClick={handleSignOutClick}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? (
                      <div className='flex items-center space-x-2'>
                        <div className='w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin'></div>
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
            className='px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 bg-[#96a141] cursor-pointer text-white rounded-lg hover:bg-[#596229] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base'
          >
            {isLoggingIn ? (
              <>
                <div className='w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                <span className='hidden sm:inline'>Loading...</span>
                <span className='sm:hidden'>...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        )}
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
          <div className='bg-white rounded-lg p-4 sm:p-6 max-w-sm w-full mx-4 shadow-xl'>
            <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-2'>
              Sign Out
            </h3>
            <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6'>
              Exit the app to end session. Are you sure you want to sign out?
            </p>
            <div className='flex flex-col-reverse sm:flex-row justify-end space-y-reverse space-y-2 sm:space-y-0 sm:space-x-3'>
              <button
                onClick={cancelSignOut}
                disabled={isSigningOut}
                className='w-full sm:w-auto px-4 py-2.5 sm:py-2 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 text-sm sm:text-base border border-gray-300 rounded-lg sm:border-none sm:bg-transparent'
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                disabled={isSigningOut}
                className='w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base mb-2 sm:mb-0'
              >
                {isSigningOut ? (
                  <>
                    <div className='w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
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
