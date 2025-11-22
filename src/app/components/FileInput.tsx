"use client";

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface FileType {
  value: string;
  label: string;
  accept: string;
}

interface FileInputProps {
  onFileSelect?: (file: File | null) => void;
  acceptedTypes?: string;
  maxSize?: number;
}

export default function FileInput({ 
  onFileSelect, 
  acceptedTypes = ".csv,.xlsx,.json", 
  maxSize = 50 
}: FileInputProps): React.JSX.Element {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>('excel');
  const [processing, setProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fileTypes: FileType[] = [
    { value: 'csv', label: 'CSV Files (.csv)', accept: '.csv' },
    { value: 'excel', label: 'Excel Files (.xlsx, .xls)', accept: '.xlsx,.xls' },
    { value: 'json', label: 'JSON Files (.json)', accept: '.json' },
    { value: 'all', label: 'All Supported Files', accept: '.csv,.xlsx,.xls,.json' }
  ];

  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelection = (file: File): void => {
    // Validate file size (in MB)
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
    const selectedFileType = fileTypes.find(type => type.value === fileType);
    
    if (selectedFileType && selectedFileType.accept !== '.csv,.xlsx,.xls,.json' && 
        !selectedFileType.accept.includes(fileExtension)) {
      alert(`Please select a ${selectedFileType.label.split(' ')[0]} file`);
      return;
    }

    setSelectedFile(file);
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleContinue = async (): Promise<void> => {
    if (!selectedFile) return;

    setProcessing(true);

    try {
      // Create FormData to send file to API
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Call the API to extract data
      const response = await fetch('/api/ai/extractData', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const processedData = await response.json();

      // Store in sessionStorage
      sessionStorage.setItem('fileData', JSON.stringify(processedData));

      // Navigate to edit file route
      router.push('/direct/report');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('File processing error:', error);
      alert(`Error processing file: ${errorMessage}`);
    } finally {
      setProcessing(false);
    }
  };

  const removeFile = (): void => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
    // Clear session storage
    sessionStorage.removeItem('fileData');
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* File Type Dropdown */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="fileType" className="block text-sm sm:text-base font-medium text-[#494f25] mb-2">
          Select File Type
        </label>
        <div className="relative">
          <select
            id="fileType"
            value={fileType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFileType(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-[#757f31] bg-white border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141] transition-colors appearance-none cursor-pointer"
            disabled={processing}
          >
            {fileTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#757f31]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* File Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-[#96a141] bg-[#f9f9ec] scale-105' 
            : selectedFile
            ? 'border-[#96a141] bg-[#eff0d7]'
            : 'border-[#cfd592] bg-[#f9f9ec] hover:border-[#96a141] hover:bg-[#eff0d7]'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={fileTypes.find(type => type.value === fileType)?.accept || acceptedTypes}
          onChange={handleFileInput}
          className="hidden"
          disabled={processing}
        />

        {selectedFile ? (
          // Selected File Display
          <div className="space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#96a141] rounded-full flex items-center justify-center mx-auto">
              {processing ? (
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="sm:w-8 sm:h-8 bi bi-check-circle text-white" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>
              )}
            </div>
            
            <div className="px-2">
              <h3 className="text-base sm:text-lg font-semibold text-[#494f25] mb-1">
                {processing ? 'Processing File...' : 'File Ready!'}
              </h3>
              <p className="text-sm sm:text-base text-[#757f31] font-medium break-all">{selectedFile.name}</p>
              <p className="text-xs sm:text-sm text-[#596229]">
                Size: {formatFileSize(selectedFile.size)}
              </p>
              {processing && (
                <p className="text-xs text-[#757f31] mt-2">
                  AI is extracting and structuring your data...
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleContinue}
                disabled={processing}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#96a141] text-white rounded-lg hover:bg-[#757f31] transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className='cursor-pointer'>Continue</span>
                  </>
                )}
              </button>
              <button
                onClick={removeFile}
                disabled={processing}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-white text-[#757f31] border border-[#cfd592] rounded-lg hover:bg-[#f9f9ec] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Remove
              </button>
            </div>

            {/* File Preview Info */}
            <div className="bg-[#f9f9ec] p-3 rounded-lg border border-[#dfe3b3]">
              <p className="text-xs sm:text-sm text-[#596229] flex items-center justify-center text-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>
                  {processing 
                    ? 'AI is processing your file via API...' 
                    : 'Click "Continue to Edit" to view and modify your data'
                  }
                </span>
              </p>
            </div>
          </div>
        ) : (
          // Upload Prompt
          <div className="space-y-3 sm:space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#cfd592] rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#757f31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div className="px-2">
              <h3 className="text-base sm:text-lg font-semibold text-[#494f25] mb-2">
                Drop your file here or browse
              </h3>
              <p className="text-[#596229] text-xs sm:text-sm mb-3 sm:mb-4 break-words">
                Supports: {fileTypes.find(type => type.value === fileType)?.label || 'Multiple formats'}
              </p>
              <p className="text-xs text-[#757f31]">
                Maximum file size: {maxSize}MB
              </p>
            </div>

            <button
              onClick={handleBrowseClick}
              disabled={processing}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 cursor-pointer bg-[#757f31] text-white rounded-lg hover:bg-[#596229] focus:ring-2 focus:ring-[#96a141] focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Browse Files
            </button>
          </div>
        )}

        {/* Drag overlay */}
        {dragActive && !processing && (
          <div className="absolute inset-0 bg-[#96a141] bg-opacity-10 rounded-lg flex items-center justify-center">
            <div className="text-[#494f25] font-semibold text-base sm:text-lg">
              Drop file here!
            </div>
          </div>
        )}
      </div>

      {/* File Type Info */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#eff0d7] rounded-lg border border-[#cfd592]">
        <h4 className="text-xs sm:text-sm font-semibold text-[#494f25] mb-2">AI-Powered Data Processing:</h4>
        <div className="grid grid-cols-1 gap-1 sm:gap-2 text-xs text-[#596229]">
          <div>• AI automatically detects file format and structure</div>
          <div>• Intelligent parsing of CSV, Excel, and JSON files</div>
          <div>• Smart data normalization and cleaning</div>
          <div>• Advanced extraction via AI API endpoints</div>
        </div>
        
        {selectedFile && !processing && (
          <div className="mt-3 pt-3 border-t border-[#cfd592]">
            <p className="text-xs text-[#757f31] font-medium">
              Next: AI will process and structure your data for editing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}