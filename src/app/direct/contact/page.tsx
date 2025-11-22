"use client"

import React, { useState } from 'react'
import Header from '@/app/components/Header'

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage(): React.JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
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
    <div className='min-h-screen bg-gradient-to-br from-[#f9f9ec] to-[#eff0d7]'>
      <Header title="Contact Us" />
      
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12 lg:mb-16'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3e4423] mb-3 sm:mb-4 lg:mb-6 px-2'>
            Get In Touch
          </h1>
          <p className='text-base sm:text-lg lg:text-xl text-[#596229] max-w-3xl mx-auto leading-relaxed px-4'>
            Have questions, feedback, or need support? We&apos;d love to hear from you.
            Send us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12'>
          {/* Contact Information */}
          <div className='space-y-6 sm:space-y-8'>
            <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-[#cfd592]'>
              <h2 className='text-xl sm:text-2xl font-semibold text-[#494f25] mb-4 sm:mb-6'>Contact Information</h2>
              
              <div className='space-y-4 sm:space-y-6'>
                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#96a141] to-[#757f31] rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
                      <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-sm sm:text-base text-[#494f25]'>Email</p>
                    <p className='text-xs sm:text-sm lg:text-base text-[#757f31] break-all'>support@yourbusiness.com</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#96a141] to-[#757f31] rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-sm sm:text-base text-[#494f25]'>Location</p>
                    <p className='text-xs sm:text-sm lg:text-base text-[#757f31]'>Available Worldwide</p>
                  </div>
                </div>

                <div className='flex items-center space-x-3 sm:space-x-4'>
                  <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#96a141] to-[#757f31] rounded-full flex items-center justify-center flex-shrink-0'>
                    <svg className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='font-semibold text-sm sm:text-base text-[#494f25]'>Response Time</p>
                    <p className='text-xs sm:text-sm lg:text-base text-[#757f31]'>Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-[#cfd592]'>
              <h3 className='text-lg sm:text-xl font-semibold text-[#494f25] mb-4 sm:mb-6'>Quick Help</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3'>
                <button className='cursor-pointer w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-[#596229] hover:bg-[#f9f9ec] rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95'>
                  📥 How to import data
                </button>
                <button className='cursor-pointer w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-[#596229] hover:bg-[#f9f9ec] rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95'>
                  📊 Creating dashboards
                </button>
                <button className='cursor-pointer w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-[#596229] hover:bg-[#f9f9ec] rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95'>
                  🔧 Technical support
                </button>
                <button className='cursor-pointer w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-[#596229] hover:bg-[#f9f9ec] rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95'>
                  💡 Feature requests
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg border border-[#cfd592]'>
            <h2 className='text-xl sm:text-2xl font-semibold text-[#494f25] mb-4 sm:mb-6'>Send us a Message</h2>
            
            {submitted ? (
              <div className='text-center py-6 sm:py-8 lg:py-12'>
                <div className='w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#96a141] to-[#757f31] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
                  <svg className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                  </svg>
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-[#494f25] mb-2 sm:mb-3'>Message Sent!</h3>
                <p className='text-sm sm:text-base text-[#757f31] px-4'>Your email client should open shortly. We&apos;ll get back to you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-xs sm:text-sm font-semibold text-[#494f25] mb-2'>
                      Full Name *
                    </label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full placeholder:text-[#757f31] text-[#3e4423] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#cfd592] rounded-lg focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-30 focus:border-[#96a141] transition-all duration-200 bg-[#f9f9ec]'
                      placeholder='Your full name'
                    />
                  </div>
                  
                  <div>
                    <label htmlFor='email' className='block text-xs sm:text-sm font-semibold text-[#494f25] mb-2'>
                      Email Address *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className='w-full placeholder:text-[#757f31] text-[#3e4423] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#cfd592] rounded-lg focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-30 focus:border-[#96a141] transition-all duration-200 bg-[#f9f9ec]'
                      placeholder='your.email@example.com'
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor='subject' className='block text-xs sm:text-sm font-semibold text-[#494f25] mb-2'>
                    Subject *
                  </label>
                  <select
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full text-[#3e4423] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#cfd592] rounded-lg focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-30 focus:border-[#96a141] transition-all duration-200 bg-[#f9f9ec]'
                  >
                    <option value='' className='text-[#757f31]'>Select a topic</option>
                    <option value='General Question'>General Question</option>
                    <option value='Technical Support'>Technical Support</option>
                    <option value='Feature Request'>Feature Request</option>
                    <option value='Bug Report'>Bug Report</option>
                    <option value='Business Inquiry'>Business Inquiry</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor='message' className='block text-xs sm:text-sm font-semibold text-[#494f25] mb-2'>
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className='w-full placeholder:text-[#757f31] text-[#3e4423] px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-[#cfd592] rounded-lg focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-30 focus:border-[#96a141] transition-all duration-200 resize-vertical min-h-[120px] sm:min-h-[140px] bg-[#f9f9ec]'
                    placeholder='Please describe your question or issue in detail...'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-gradient-to-r from-[#757f31] to-[#96a141] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:from-[#596229] hover:to-[#757f31] focus:ring-4 focus:ring-[#96a141] focus:ring-opacity-50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl active:scale-95 transform'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='currentColor' viewBox='0 0 20 20'>
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
        <div className='mt-8 sm:mt-12 lg:mt-16 text-center bg-white p-6 sm:p-8 lg:p-12 rounded-xl shadow-lg border border-[#cfd592]'>
          <h3 className='text-lg sm:text-xl lg:text-2xl font-semibold text-[#494f25] mb-3 sm:mb-4 lg:mb-6'>Need Immediate Help?</h3>
          <p className='text-sm sm:text-base lg:text-lg text-[#596229] mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed'>
            Check out our comprehensive documentation for quick answers to common questions.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6'>
            <button className='w-full sm:w-auto bg-gradient-to-r from-[#96a141] to-[#757f31] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:from-[#757f31] hover:to-[#596229] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 transform'>
              📚 Documentation
            </button>
            <button className='w-full sm:w-auto bg-white text-[#596229] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold border-2 border-[#cfd592] hover:bg-[#f9f9ec] transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 transform'>
              🎥 Video Tutorials
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
