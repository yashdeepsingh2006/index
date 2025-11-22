"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

interface NavLink {
    name: string;
    href: string;
    icon: React.JSX.Element;
}

export default function Nav(): React.JSX.Element {

    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const links: NavLink[] = [
        {
            name: 'Home', 
            href: '/', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            )
        },
        {
            name: 'About', 
            href: '/direct/about', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
            )
        },
        {
            name: 'Contact', 
            href: '/direct/contact', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
            )
        },
        {
            name: 'Docs', 
            href: '/direct/docs', 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark" viewBox="0 0 16 16">
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                </svg>
            )
        },
    ];

    const handleLinkClick = (href: string): void => {
        router.push(href);
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Sidebar Navigation */}
            <div className='hidden xl:flex fixed left-0 top-0 h-screen w-1/5 min-w-[240px] max-w-[280px] flex-col p-4 lg:p-6 pl-6 lg:pl-8 bg-[#596229] z-10'>
                {/* Title */}
                <h1 className='text-[#F9F9EC] cinzel-text font-black text-2xl lg:text-3xl cursor-default'>Index</h1>
                <hr className='my-4 lg:my-6 border-[#F9F9EC]' />
                {/* Navigation Links */}
                <div className='flex flex-col gap-3 lg:gap-4 mt-6 lg:mt-10'>
                    {links.map(link => (
                        <button 
                            key={link.name} 
                            onClick={() => handleLinkClick(link.href)} 
                            className='flex items-center text-[#F9F9EC] hover:text-[#cfd592] cursor-pointer text-left py-2 px-2 rounded-lg hover:bg-[#494f25] transition-all duration-200 text-sm lg:text-base'
                        >
                            <span className='mr-3 flex-shrink-0'>{link.icon}</span>
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* developer info */}
                <div className='bottom-0 mt-auto pb-4 lg:pb-7'>
                    <h2 className='text-[#F9F9EC] cursor-default cinzel-text font-black text-lg lg:text-2xl mb-2'>Developed by</h2>
                    <p className='text-[#F9F9EC] cursor-pointer hover:text-[#cfd592] transition-colors duration-200 text-sm lg:text-base' onClick={() => window.open('https://yashdeepsingh2006.vercel.app', '_blank')}>
                        Yashdeep Singh
                    </p>
                </div>
            </div>

            {/* Tablet Navigation - Collapsible Sidebar */}
            <div className='hidden lg:flex xl:hidden'>
                {/* Tablet Header */}
                <div className='fixed top-0 left-0 right-0 bg-[#596229] p-3 lg:p-4 flex justify-between items-center z-50'>
                    <h1 className='text-[#F9F9EC] cinzel-text font-black text-xl lg:text-2xl cursor-default'>Index</h1>
                    
                    {/* Tablet Menu Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='text-[#F9F9EC] hover:text-[#cfd592] focus:outline-none p-2 rounded-lg hover:bg-[#494f25] transition-colors duration-200'
                        aria-label="Toggle navigation menu"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Tablet Sidebar */}
                <div className={`fixed top-0 left-0 h-full w-64 lg:w-72 bg-[#596229] transform transition-transform duration-300 ease-in-out z-40 ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <div className='flex flex-col h-full p-4 lg:p-6 pt-20'>
                        {/* Tablet Navigation Links */}
                        <div className='flex flex-col gap-3'>
                            {links.map(link => (
                                <button 
                                    key={link.name} 
                                    onClick={() => handleLinkClick(link.href)} 
                                    className='flex items-center text-[#F9F9EC] hover:text-[#cfd592] cursor-pointer py-3 px-3 rounded-lg hover:bg-[#494f25] transition-all duration-200 text-left w-full'
                                >
                                    <span className='mr-3 flex-shrink-0'>{link.icon}</span>
                                    {link.name}
                                </button>
                            ))}
                        </div>

                        {/* Tablet Developer info */}
                        <div className='mt-auto pb-4'>
                            <h2 className='text-[#F9F9EC] cursor-default cinzel-text font-black text-lg mb-2'>Developed by</h2>
                            <p className='text-[#F9F9EC] cursor-pointer hover:text-[#cfd592] transition-colors duration-200' onClick={() => window.open('https://yashdeepsingh2006.vercel.app', '_blank')}>
                                Yashdeep Singh
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tablet Overlay */}
                {isMenuOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30' onClick={() => setIsMenuOpen(false)} />
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='lg:hidden'>
                {/* Mobile Header - Fixed at top */}
                <div className='fixed top-0 left-0 right-0 bg-[#596229] p-3 sm:p-4 flex justify-between items-center z-50 shadow-lg'>
                    <h1 className='text-[#F9F9EC] cinzel-text font-black text-xl sm:text-2xl cursor-default'>Index</h1>
                    
                    {/* Hamburger Button */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='text-[#F9F9EC] hover:text-[#cfd592] focus:outline-none p-2 rounded-lg hover:bg-[#494f25] transition-colors duration-200'
                        aria-label="Toggle navigation menu"
                    >
                        <svg 
                            className="w-5 h-5 sm:w-6 sm:h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                // Close icon
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                // Hamburger icon
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Blur Overlay - only when menu is open */}
                {isMenuOpen && (
                    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30' onClick={() => setIsMenuOpen(false)} />
                )}

                {/* Mobile Menu - Slide in from right */}
                <div className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-[#596229] transform transition-transform duration-300 ease-in-out z-40 shadow-xl ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className='flex flex-col h-full p-4 sm:p-6'>
                        {/* Mobile Menu Header */}
                        <div className='flex justify-between items-center mb-6 pt-4 sm:pt-6'>
                            <h1 className='text-[#F9F9EC] cinzel-text font-black text-lg sm:text-xl cursor-default'>Menu</h1>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className='text-[#F9F9EC] hover:text-[#cfd592] focus:outline-none p-2 rounded-lg hover:bg-[#494f25] transition-colors duration-200'
                                aria-label="Close navigation menu"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <hr className='border-[#F9F9EC] mb-6' />
                        
                        {/* Mobile Navigation Links */}
                        <div className='flex flex-col gap-2 sm:gap-3'>
                            {links.map(link => (
                                <button 
                                    key={link.name} 
                                    onClick={() => handleLinkClick(link.href)} 
                                    className='flex items-center text-[#F9F9EC] hover:text-[#cfd592] cursor-pointer py-3 sm:py-4 px-3 sm:px-4 rounded-lg hover:bg-[#494f25] transition-all duration-200 text-left w-full text-sm sm:text-base'
                                >
                                    <span className='mr-3 sm:mr-4 flex-shrink-0'>{link.icon}</span>
                                    {link.name}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Developer info */}
                        <div className='mt-auto pb-4 sm:pb-6'>
                            <h2 className='text-[#F9F9EC] cursor-default cinzel-text font-black text-base sm:text-lg mb-2'>Developed by</h2>
                            <p className='text-[#F9F9EC] cursor-pointer hover:text-[#cfd592] transition-colors duration-200 text-sm sm:text-base' onClick={() => window.open('https://yashdeepsingh2006.vercel.app', '_blank')}>
                                Yashdeep Singh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
