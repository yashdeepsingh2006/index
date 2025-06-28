"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Graphs from '@/app/components/Graphs';

export default function EditFilePage() {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(5); // Show 5 columns by default
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Get the new structured file data from sessionStorage
    const storedData = sessionStorage.getItem('fileData');

    if (!storedData) {
      // Redirect back to home if no file data
      router.push('/');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      
      // Console log the received JSON data
      console.log('=== RECEIVED JSON DATA ===');
      console.log('Full Data Object:', data);
      console.log('File Info:', data.fileInfo);
      console.log('Parsed Data:', data.parsedData);
      console.log('Headers:', data.parsedData?.headers);
      console.log('Rows:', data.parsedData?.rows);
      console.log('Metadata:', data.metadata);
      console.log('========================');
      
      setFileData(data);
      
    } catch (error) {
      console.error('Error parsing stored file data:', error);
      router.push('/');
      return;
    }

    setLoading(false);
  }, [router]);

  const handleScroll = (direction) => {
    const headers = fileData?.parsedData?.headers || [];
    const maxScroll = Math.max(0, headers.length - visibleColumns);
    
    if (direction === 'left' && scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    } else if (direction === 'right' && scrollPosition < maxScroll) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const getVisibleHeaders = () => {
    const headers = fileData?.parsedData?.headers || [];
    return headers.slice(scrollPosition, scrollPosition + visibleColumns);
  };

  const getVisibleRowData = (row) => {
    const headers = fileData?.parsedData?.headers || [];
    const visibleHeaders = headers.slice(scrollPosition, scrollPosition + visibleColumns);
    const visibleData = {};
    
    visibleHeaders.forEach(header => {
      visibleData[header] = row[header] || '';
    });
    
    return visibleData;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#96a141] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#596229]">Loading your file...</p>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#494f25] mb-2">No Data Found</h2>
          <p className="text-[#596229] mb-4">Unable to load file data.</p>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-[#757f31] text-white rounded-lg hover:bg-[#596229] transition-colors"
          >
            Back to Upload
          </button>
        </div>
      </div>
    );
  }

  const headers = fileData?.parsedData?.headers || [];
  const rows = fileData?.parsedData?.rows || [];
  const visibleHeaders = getVisibleHeaders();
  const hasMoreColumns = headers.length > visibleColumns;
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollPosition < headers.length - visibleColumns;

  return (
    <div className="min-h-screen bg-[#f9f9ec]">
      <Header title="Data Viewer" />
      
      <div className="max-w-7xl mx-auto p-8">
        {/* File Information Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#3e4423] mb-2">
                {fileData?.fileInfo?.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-[#596229]">
                <span>{rows.length} rows</span>
                <span>{headers.length} columns</span>
                <span>{new Date(fileData?.metadata?.processedAt).toLocaleString()}</span>
                <span>{fileData?.metadata?.fileType?.toUpperCase()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-[#757f31] text-white rounded-lg hover:bg-[#596229] transition-colors font-medium"
            >
              Back to Upload
            </button>
          </div>
        </div>

        {/* Google Sheets Style Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Table Controls */}
          {hasMoreColumns && (
            <div className="bg-[#f8f9fa] px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Showing columns {scrollPosition + 1}-{Math.min(scrollPosition + visibleColumns, headers.length)} of {headers.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Scroll left"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Scroll right"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-auto max-h-96" style={{ height: '500px' }}>
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="sticky top-0 bg-[#f8f9fa] z-10">
                <tr>
                  {/* Row Number Column */}
                  <th className="w-12 px-3 py-3 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200 bg-[#f1f3f4]">
                    #
                  </th>
                  
                  {/* Data Columns */}
                  {visibleHeaders.map((header, index) => (
                    <th 
                      key={`${header}-${index}`}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200 bg-[#f8f9fa] min-w-32 max-w-48"
                    >
                      <div className="truncate" title={header}>
                        {header}
                      </div>
                      <div className="text-xs font-normal text-gray-400 mt-1">
                        {String.fromCharCode(65 + scrollPosition + index)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {rows.map((row, rowIndex) => {
                  const visibleRowData = getVisibleRowData(row);
                  
                  return (
                    <tr 
                      key={rowIndex}
                      className={`hover:bg-blue-50 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      {/* Row Number */}
                      <td className="w-12 px-3 py-2 text-xs text-gray-500 border-r border-b border-gray-200 bg-[#f1f3f4] font-medium">
                        {rowIndex + 1}
                      </td>
                      
                      {/* Data Cells */}
                      {visibleHeaders.map((header, colIndex) => (
                        <td 
                          key={`${rowIndex}-${header}-${colIndex}`}
                          className="px-4 py-2 text-sm text-gray-900 border-r border-b border-gray-200 min-w-32 max-w-48"
                        >
                          <div className="truncate" title={visibleRowData[header]}>
                            {visibleRowData[header] || '-'}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
                
                {/* Empty state if no rows */}
                {rows.length === 0 && (
                  <tr>
                    <td 
                      colSpan={visibleHeaders.length + 1}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Stats */}
          <div className="bg-[#f8f9fa] px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Total Rows: {rows.length}</span>
                <span>Total Columns: {headers.length}</span>
                {hasMoreColumns && (
                  <span>Viewing: {visibleHeaders.length} columns</span>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {fileData?.metadata?.fileType} • {(fileData?.fileInfo?.size / 1024).toFixed(1)} KB
              </div>
            </div>
          </div>
        </div>
        

        <Graphs />

      </div>
    </div>
  );
}
