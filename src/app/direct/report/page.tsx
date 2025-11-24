"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/app/components/Header'
import Graphs from '@/app/components/Graphs';
import ChatbotInterface from '@/app/components/ChatbotInterface';
import InsightsDisplay from '@/app/components/InsightsDisplay';

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
  const [activeSection, setActiveSection] = useState<'insights' | 'charts' | 'data'>('charts');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Data Analysis" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* File Information Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {fileData?.fileInfo?.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{rows.length} rows</span>
                <span>•</span>
                <span>{headers.length} columns</span>
                <span>•</span>
                <span>{fileData?.metadata?.fileType?.toUpperCase()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Simple Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveSection('charts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'charts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Charts
              </button>
              
              <button
                onClick={() => setActiveSection('insights')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'insights'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI Insights
              </button>
              
              <button
                onClick={() => setActiveSection('data')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSection === 'data'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                View Data
              </button>
            </nav>
          </div>
        </div>

        {/* Conditional Content Based on Active Section */}
        {activeSection === 'data' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Data Preview</h2>
              <p className="text-sm text-gray-600 mt-1">{rows.length} rows × {headers.length} columns</p>
            </div>
            
            <div className="overflow-auto max-h-96">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {headers.slice(0, 10).map((header, index) => (
                      <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {String(header)}
                      </th>
                    ))}
                    {headers.length > 10 && (
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        +{headers.length - 10} more
                      </th>
                    )}
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {rows.slice(0, 20).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {headers.slice(0, 10).map((header, colIndex) => {
                        const cellValue = row[header];
                        const displayValue = cellValue === null || cellValue === undefined || cellValue === '' ? '-' : String(cellValue);
                        
                        return (
                          <td key={colIndex} className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate" title={displayValue}>
                            {displayValue}
                          </td>
                        );
                      })}
                      {headers.length > 10 && (
                        <td className="px-4 py-3 text-sm text-gray-400">...</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {rows.length > 20 && (
              <div className="px-4 py-3 bg-gray-50 text-sm text-gray-600 text-center">
                Showing first 20 rows of {rows.length} total rows
              </div>
            )}
          </div>
        )}

        {activeSection === 'insights' && (
          <div>
            <InsightsDisplay fileData={fileData} />
          </div>
        )}

        {activeSection === 'charts' && (
          <div className="space-y-6">
            <div>
              <Graphs />
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Ask Questions About Your Data</h2>
              <ChatbotInterface fileData={fileData} />
            </div>
          </div>
        )}

      </div>
      
      {/* AI Chat Assistant */}
      {fileData && <ChatbotInterface fileData={fileData} />}
    </div>
  );
}
