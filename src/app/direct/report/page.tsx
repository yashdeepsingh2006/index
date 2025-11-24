"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Graphs from '@/app/components/Graphs';
import ChatbotInterface from '@/app/components/ChatbotInterface';

interface FileData {
  fileInfo: {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  };
  parsedData: {
    headers: string[];
    rows: Record<string, any>[];
    totalRows: number;
    totalColumns: number;
  };
  metadata: {
    processedAt: string;
    fileType: string;
    encoding: string;
    processedBy: string;
    sheetName?: string | null;
  };
}

export default function EditFilePage(): React.JSX.Element {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleColumns, setVisibleColumns] = useState<number>(5); // Show 5 columns by default
  const [scrollPosition, setScrollPosition] = useState<number>(0);
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

  const handleScroll = (direction: 'left' | 'right'): void => {
    const headers = fileData?.parsedData?.headers || [];
    const maxScroll = Math.max(0, headers.length - visibleColumns);
    
    if (direction === 'left' && scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    } else if (direction === 'right' && scrollPosition < maxScroll) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  const getVisibleHeaders = (): string[] => {
    const headers = fileData?.parsedData?.headers || [];
    return headers.slice(scrollPosition, scrollPosition + visibleColumns);
  };

  const getVisibleRowData = (row: Record<string, any>): Record<string, string> => {
    const headers = fileData?.parsedData?.headers || [];
    const visibleHeaders = headers.slice(scrollPosition, scrollPosition + visibleColumns);
    const visibleData: Record<string, string> = {};
    
    visibleHeaders.forEach(header => {
      const cellValue = row[header];
      // Ensure we only render strings or numbers, not objects
      if (cellValue === null || cellValue === undefined) {
        visibleData[header] = '';
      } else if (typeof cellValue === 'object') {
        visibleData[header] = JSON.stringify(cellValue);
      } else {
        visibleData[header] = String(cellValue);
      }
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
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9ec] to-[#eff0d7]">
      <Header title="Data Viewer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* File Information Header */}
        <div className="bg-white rounded-xl shadow-lg border border-[#cfd592] p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#3e4423] mb-2 sm:mb-3 truncate">
                {fileData?.fileInfo?.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#596229]">
                <span className="bg-[#f9f9ec] px-2 py-1 rounded">{rows.length} rows</span>
                <span className="bg-[#f9f9ec] px-2 py-1 rounded">{headers.length} columns</span>
                <span className="bg-[#f9f9ec] px-2 py-1 rounded hidden sm:inline">{new Date(fileData?.metadata?.processedAt).toLocaleString()}</span>
                <span className="bg-[#f9f9ec] px-2 py-1 rounded">{fileData?.metadata?.fileType?.toUpperCase()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-4 py-2 sm:py-3 bg-gradient-to-r from-[#757f31] to-[#96a141] text-white rounded-lg hover:from-[#596229] hover:to-[#757f31] transition-all duration-200 font-medium text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transform"
            >
              Back to Upload
            </button>
          </div>
        </div>

        {/* Google Sheets Style Table */}
        <div className="bg-white rounded-xl shadow-lg border border-[#cfd592] overflow-hidden">
          {/* Table Controls */}
          {hasMoreColumns && (
            <div className="bg-[#f8f9fa] px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-600">
                  Showing columns {scrollPosition + 1}-{Math.min(scrollPosition + visibleColumns, headers.length)} of {headers.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  className="p-1.5 sm:p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Scroll left"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  className="p-1.5 sm:p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Scroll right"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-auto" style={{ maxHeight: '60vh', minHeight: '300px' }}>
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead className="sticky top-0 bg-[#f8f9fa] z-10">
                <tr>
                  {/* Row Number Column */}
                  <th className="w-8 sm:w-12 px-2 sm:px-3 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200 bg-[#f1f3f4]">
                    #
                  </th>
                  
                  {/* Data Columns */}
                  {visibleHeaders.map((header, index) => (
                    <th 
                      key={`header-${scrollPosition + index}`}
                      className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-600 border-r border-b border-gray-200 bg-[#f8f9fa] min-w-24 sm:min-w-32 max-w-32 sm:max-w-48"
                    >
                      <div className="truncate" title={String(header)}>
                        {String(header)}
                      </div>
                      <div className="text-xs font-normal text-gray-400 mt-1 hidden sm:block">
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
                      <td className="w-8 sm:w-12 px-2 sm:px-3 py-1.5 sm:py-2 text-xs text-gray-500 border-r border-b border-gray-200 bg-[#f1f3f4] font-medium">
                        {rowIndex + 1}
                      </td>
                      
                      {/* Data Cells */}
                      {visibleHeaders.map((header, colIndex) => {
                        const cellValue = visibleRowData[header];
                        const displayValue = cellValue === null || cellValue === undefined || cellValue === '' ? '-' : String(cellValue);
                        
                        return (
                          <td 
                            key={`cell-${rowIndex}-${scrollPosition + colIndex}`}
                            className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 border-r border-b border-gray-200 min-w-24 sm:min-w-32 max-w-32 sm:max-w-48"
                          >
                            <div className="truncate" title={displayValue}>
                              {displayValue}
                            </div>
                          </td>
                        );
                      })}
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
          <div className="bg-[#f8f9fa] px-3 sm:px-4 py-2 sm:py-3 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-gray-600">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <span className="bg-white px-2 py-1 rounded">Total Rows: {rows.length}</span>
                <span className="bg-white px-2 py-1 rounded">Total Columns: {headers.length}</span>
                {hasMoreColumns && (
                  <span className="bg-white px-2 py-1 rounded">Viewing: {visibleHeaders.length} columns</span>
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
      
      {/* AI Chat Assistant */}
      {fileData && <ChatbotInterface fileData={fileData} />}
    </div>
  );
}
