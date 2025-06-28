"use client"

import React, { useState } from 'react'
import Header from '@/app/components/Header'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create mailto link
    const mailtoLink = `mailto:support@yourbusiness.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <div className='min-h-screen'>
      <Header title="Contact Us" />
      
      <div className='max-w-4xl mx-auto p-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-[#3e4423] mb-4'>
            Get In Touch
          </h1>
          <p className='text-xl text-[#596229] max-w-2xl mx-auto'>
            Have questions, feedback, or need support? We&apos;d love to hear from you.
            Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Information */}
          <div className='space-y-8'>
            <div className='bg-[#eff0d7] p-6 rounded-lg shadow-md border border-deco-200'>
              <h2 className='text-2xl font-semibold text-[#494f25] mb-6'>Contact Information</h2>
              
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-[96a141] rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-[#596229]' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-medium text-[#494f25]'>Email</p>
                    <p className='text-[#757f31]'>support@yourbusiness.com</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-[96a141] rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-[#596229]' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-medium text-[#494f25]'>Location</p>
                    <p className='text-[#757f31]'>Available Worldwide</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-[96a141] rounded-full flex items-center justify-center'>
                    <svg className='w-5 h-5 text-[#596229]' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-medium text-[#494f25]'>Response Time</p>
                    <p className='text-[#757f31]'>Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className='bg-[#eff0d7] p-6 rounded-lg border border-deco-300'>
              <h3 className='text-lg font-semibold text-[#494f25] mb-4'>Quick Help</h3>
              <div className='space-y-2'>
                <button className='block cursor-pointer w-full text-left px-4 py-2 text-[#596229] hover:bg-[#dfe3b3] rounded transition-colors'>
                  📥 How to import data
                </button>
                <button className='block cursor-pointer w-full text-left px-4 py-2 text-[#596229] hover:bg-[#dfe3b3] rounded transition-colors'>
                  📊 Creating dashboards
                </button>
                <button className='block cursor-pointer w-full text-left px-4 py-2 text-[#596229] hover:bg-[#dfe3b3] rounded transition-colors'>
                  🔧 Technical support
                </button>
                <button className='block cursor-pointer w-full text-left px-4 py-2 text-[#596229] hover:bg-[#dfe3b3] rounded transition-colors'>
                  💡 Feature requests
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-[#eff0d7] p-8 rounded-lg shadow-md border border-deco-200'>
            <h2 className='text-2xl font-semibold text-[#494f25] mb-6'>Send us a Message</h2>
            
            {submitted ? (
              <div className='text-center py-8'>
                <div className='w-16 h-16 bg-[96a141] rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg className='w-8 h-8 text-[#596229]' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-[#494f25] mb-2'>Message Sent!</h3>
                <p className='text-[#757f31]'>Your email client should open shortly. We&apos;ll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-[#494f25] mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full placeholder:text-[#757f31] text-[#757f31] px-4 py-3 border border-deco-300 rounded-lg focus:ring-2 focus:ring-deco-500 focus:border-deco-500 transition-colors'
                      placeholder='Your full name'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-[#494f25] mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full placeholder:text-[#757f31] text-[#757f31] px-4 py-3 border border-deco-300 rounded-lg focus:ring-2 focus:ring-deco-500 focus:border-deco-500 transition-colors'
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-sm font-medium text-[#494f25] mb-2'>
                    Subject *
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full placeholder:text-[#757f31] text-[#757f31] px-4 py-3 border border-deco-300 rounded-lg focus:ring-2 focus:ring-deco-500 focus:border-deco-500 transition-colors'
                  >
                    <option value=''>Select a topic</option>
                    <option value='General Question'>General Question</option>
                    <option value='Technical Support'>Technical Support</option>
                    <option value='Feature Request'>Feature Request</option>
                    <option value='Bug Report'>Bug Report</option>
                    <option value='Business Inquiry'>Business Inquiry</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='message' className='block text-sm font-medium text-[#494f25] mb-2'>
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className='w-full placeholder:text-[#757f31] text-[#757f31] px-4 py-3 border border-deco-300 rounded-lg focus:ring-2 focus:ring-deco-500 focus:border-deco-500 transition-colors resize-vertical'
                    placeholder='Please describe your question or issue in detail...'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-[#757f31] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#596229] focus:ring-2 focus:ring-deco-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
                      </svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Additional Help Section */}
        <div className='mt-12 text-center bg-[#eff0d7] p-8 rounded-lg border border-deco-300'>
          <h3 className='text-xl font-semibold text-[#494f25] mb-4'>Need Immediate Help?</h3>
          <p className='text-[#596229] mb-6'>
            Check out our comprehensive documentation for quick answers to common questions.
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <button className='bg-white text-[#596229] px-6 py-3 rounded-lg border border-deco-300 hover:bg-[#f9f9ec] transition-colors'>
              📚 Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
