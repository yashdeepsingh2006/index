"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'

export default function Aboutpage(): React.JSX.Element {

  const router = useRouter();

  return (
    <div className='flex flex-col'>
      <div>
        <Header title='About' />
      </div>
      <div className='p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full'>
        {/* Hero Section */}
        <div className='text-center mb-8 sm:mb-10 lg:mb-12'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#494f25] mb-3 sm:mb-4 lg:mb-6 px-2'>
            Turn Your Business Data Into Powerful Insights
          </h1>
          <p className='text-sm sm:text-base lg:text-lg text-[#494f25] px-2 sm:px-4 lg:px-7 leading-relaxed max-w-3xl mx-auto'>
            A simple, affordable solution designed specifically for small businesses to understand their data and make better decisions.
          </p>
        </div>

        {/* Problem Section */}
        <div className='bg-[#cfd592] border-l-4 border-[#757f31] p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 rounded-r-lg'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-[#494f25] mb-3 sm:mb-4'>The Problem We Solve</h2>
          <p className='text-[#494f25] text-sm sm:text-base lg:text-lg leading-relaxed'>
            As a small business owner, you're juggling data from everywhere - sales spreadsheets, inventory lists,
            customer information, marketing results. It's scattered, confusing, and expensive enterprise software
            is out of reach. You need insights but don't have time to become a data expert.
          </p>
        </div>

        {/* Solution Section */}
        <div className='bg-[#cfd592] border-l-4 border-[#757f31] p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 rounded-r-lg'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-[#494f25] mb-3 sm:mb-4'>Our Simple Solution</h2>
          <p className='text-[#494f25] text-sm sm:text-base lg:text-lg mb-4 leading-relaxed'>
            We've created a web application that works like having a data analyst on your team, but without the cost or complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12'>
          <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200'>
            <div className='text-[#494f25] mb-3 sm:mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 bi bi-database" viewBox="0 0 16 16">
                <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525" />
              </svg>
            </div>
            <h3 className='text-lg sm:text-xl lg:text-2xl text-[#757f31] font-semibold mb-2 sm:mb-3'>Easy Data Import</h3>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              Simply drag and drop your Excel files, CSV files, or connect to your online store.
              No technical setup required.
            </p>
          </div>

          <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200'>
            <div className='text-[#494f25] mb-3 sm:mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
            <h3 className='text-lg sm:text-xl lg:text-2xl text-[#757f31] font-semibold mb-2 sm:mb-3'>Automatic Data Cleaning</h3>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              Our app automatically fixes common data problems like duplicates and formatting issues,
              so you don't have to.
            </p>
          </div>

          <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200'>
            <div className='text-[#494f25] mb-3 sm:mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 bi bi-bar-chart" viewBox="0 0 16 16">
                <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5v12h-2V2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1z" />
              </svg>
            </div>
            <h3 className='text-lg sm:text-xl lg:text-2xl text-[#757f31] font-semibold mb-2 sm:mb-3'>Beautiful Visual Dashboards</h3>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              Create stunning charts and graphs with simple drag-and-drop.
              See your business trends at a glance.
            </p>
          </div>

          <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-200'>
            <div className='text-[#494f25] mb-3 sm:mb-4'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="sm:w-6 sm:h-6 lg:w-8 lg:h-8 bi bi-file-earmark" viewBox="0 0 16 16">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
              </svg>
            </div>
            <h3 className='text-lg sm:text-xl lg:text-2xl text-[#757f31] font-semibold mb-2 sm:mb-3'>Professional Reports</h3>
            <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
              Generate professional reports for investors, partners, or your own planning.
              Export to PDF with one click.
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className='bg-[#cfd592] p-4 sm:p-6 lg:p-8 rounded-lg mb-6 sm:mb-8 border-l-4 border-[#757f31]'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-[#494f25] mb-4 sm:mb-6'>Available For Everyone</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
            <div className='bg-white/20 p-4 rounded-lg'>
              <h4 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>Free Forever</h4>
              <p className='text-[#494f25] text-sm sm:text-base leading-relaxed'>No hidden costs or premium features. Everything is free for everyone.</p>
            </div>
            <div className='bg-white/20 p-4 rounded-lg'>
              <h4 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>Secure & Private</h4>
              <p className='text-[#494f25] text-sm sm:text-base leading-relaxed'>Your data is processed securely with no permanent storage. Privacy-focused design.</p>
            </div>
            <div className='bg-white/20 p-4 rounded-lg'>
              <h4 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>Cloud-Based Access</h4>
              <p className='text-[#494f25] text-sm sm:text-base leading-relaxed'>Access your data analysis from any device with an internet connection.</p>
            </div>
            <div className='bg-white/20 p-4 rounded-lg'>
              <h4 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>User Friendly</h4>
              <p className='text-[#494f25] text-sm sm:text-base leading-relaxed'>Simple and intuitive interface that anyone can use.</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className='mb-6 sm:mb-8'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-[#494f25] mb-4 sm:mb-6 text-center'>Perfect For Any Small Business</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            <div className='text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200'>
              <div className='text-3xl sm:text-4xl lg:text-5xl mb-3'>🛍️</div>
              <h4 className='font-semibold mb-2 text-[#494f25] text-sm sm:text-base lg:text-lg'>Retail Stores</h4>
              <p className='text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed'>Track sales, inventory, and customer trends</p>
            </div>
            <div className='text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200'>
              <div className='text-3xl sm:text-4xl lg:text-5xl mb-3'>💻</div>
              <h4 className='font-semibold mb-2 text-[#494f25] text-sm sm:text-base lg:text-lg'>Online Shops</h4>
              <p className='text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed'>Monitor website traffic, conversions, and revenue</p>
            </div>
            <div className='text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1'>
              <div className='text-3xl sm:text-4xl lg:text-5xl mb-3'>🏢</div>
              <h4 className='font-semibold mb-2 text-[#494f25] text-sm sm:text-base lg:text-lg'>Service Businesses</h4>
              <p className='text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed'>Analyze client data, project profitability, and growth</p>
            </div>
          </div>
        </div>

                {/* Contact & Support Section */}
        <div className='bg-[#cfd592] p-4 sm:p-6 lg:p-8 rounded-lg'>
          <div className='text-center mb-6 sm:mb-8'>
            <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold text-[#494f25] mb-3 sm:mb-4'>
              Questions? We're Here to Help
            </h2>
            <p className='text-sm sm:text-base lg:text-lg text-[#494f25] mb-4 sm:mb-6 leading-relaxed'>
              Get in touch with our friendly support team or explore our resources
            </p>
          </div>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            <div className='text-center bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
              <div className='text-[#494f25] mb-3 sm:mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 bi bi-chat-dots mx-auto" viewBox="0 0 16 16">
                  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125M8 2c3.314 0 6 2.357 6 5s-2.686 5-6 5c-1.593 0-2.99-.481-4.034-1.25-.35-.25-.737-.601-.89-.849-.302-.488-.462-1.05-.462-1.651 0-2.643 2.686-5 6-5"/>
                </svg>
              </div>
              <h3 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>Live Support</h3>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed'>Chat with our team Monday-Friday 9AM-5PM</p>
              <button onClick={()=>{router.push('/direct/contact')}} className='text-[#757f31] cursor-pointer font-medium hover:underline text-sm sm:text-base transition-colors duration-200'>Start Chat</button>
            </div>
            
            <div className='text-center bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
              <div className='text-[#494f25] mb-3 sm:mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 bi bi-book mx-auto" viewBox="0 0 16 16">
                  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                </svg>
              </div>
              <h3 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>User Guide</h3>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed'>Step-by-step tutorials and documentation</p>
              <button onClick={()=>{router.push('/direct/docs')}} className='text-[#757f31] cursor-pointer font-medium hover:underline text-sm sm:text-base transition-colors duration-200'>View Docs</button>
            </div>
            
            <div className='text-center bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1'>
              <div className='text-[#494f25] mb-3 sm:mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 bi bi-people mx-auto" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                </svg>
              </div>
              <h3 className='font-semibold text-[#494f25] mb-2 text-sm sm:text-base lg:text-lg'>Community</h3>
              <p className='text-gray-600 text-xs sm:text-sm mb-3 leading-relaxed'>Connect with other users and share tips</p>
              <button className='text-[#757f31] font-medium hover:underline text-sm sm:text-base transition-colors duration-200'>Join Forum</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
