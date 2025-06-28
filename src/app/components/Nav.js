"use client"

import React from 'react'
import { useRouter } from 'next/navigation';

export default function Nav() {

    const router = useRouter();

    const links = [
        {
            name: 'Home', href: '/', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>` },
        {
            name: 'About', href: '/direct/about', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg>` },
        {
            name: 'Contact', href: '/direct/contact', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
</svg>` },
        {
            name: 'Docs', href: '/direct/docs', svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
</svg>` },
    ];

    return (
        <div className='flex h-screen flex-col p-4 pl-8 bg-[#596229]'>
            {/* Title */}
            <h1 className='text-[#F9F9EC] cinzel-text font-black text-3xl cursor-default'>Index</h1>
            <hr />
            {/* Navigation Links */}
            <div className='flex flex-col gap-4 mt-10'>
                {links.map(link => (
                    <a key={link.name} onClick={() => router.push(link.href)} className='flex items-center text-[#F9F9EC] hover:text-[#cfd592] cursor-pointer'>
                        <span className='mr-2' dangerouslySetInnerHTML={{ __html: link.svg }} />
                        {link.name}
                    </a>
                ))}
            </div>

            {/* developer info */}
            <div className='bottom-0 mt-auto pb-7'>
                <h2 className='text-[#F9F9EC] cursor-default cinzel-text font-black text-2xl'>Developed by</h2>
                <p className='text-[#F9F9EC] cursor-pointer' onClick={() => window.open('https://yashdeepsingh2006.vercel.app', '_blank')}>Yashdeep Singh</p>
            </div>
        </div>
    )
}
