"use client"

import React from 'react'

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-white py-8 cursor-default">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#494f25] mb-4">
            Index - Data Analysis Made Simple
          </h1>
          <p className="text-xl text-[#596229]">
            Your simple solution for turning business data into beautiful, easy-to-understand charts and reports!
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-4">Table of Contents</h2>
          <ol className="list-decimal list-inside space-y-2 text-[#494f25]">
            <li><a href="#getting-started" className="hover:underline">Getting Started</a></li>
            <li><a href="#uploading-data" className="hover:underline">Uploading Your Data</a></li>
            <li><a href="#viewing-data" className="hover:underline">Viewing Your Data</a></li>
            <li><a href="#creating-charts" className="hover:underline">Creating Charts and Graphs</a></li>
            <li><a href="#understanding-reports" className="hover:underline">Understanding Your Reports</a></li>
            <li><a href="#tips-best-practices" className="hover:underline">Tips and Best Practices</a></li>
            <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
            <li><a href="#getting-help" className="hover:underline">Getting Help</a></li>
          </ol>
        </div>

        {/* Getting Started Section */}
        <section id="getting-started" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Getting Started</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">What You&apos;ll Need</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>A computer with internet access</li>
              <li>Your business data in one of these formats:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Excel files (.xlsx, .xls)</li>
                  <li>CSV files (.csv)</li>
                  <li>JSON files (.json)</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">First Time Setup</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Open your web browser</li>
              <li>Go to the Index application</li>
              <li>Sign in with your Google account for security</li>
              <li>You&apos;re ready to start analyzing your data!</li>
            </ol>
          </div>
        </section>

        {/* Uploading Data Section */}
        <section id="uploading-data" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Uploading Your Data</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Step 1: Access the Upload Page</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>After signing in, you&apos;ll see the <strong>Home</strong> page</li>
              <li>Look for the file upload area in the center of your screen</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Step 2: Choose Your File</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Option A: Drag and Drop</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Simply drag your file from your computer</li>
                <li>Drop it onto the upload area</li>
                <li>You&apos;ll see &quot;Drop file here!&quot; when you&apos;re in the right spot</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-700 mb-2">Option B: Click to Browse</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Click the &quot;Click to browse files&quot; button</li>
                <li>Select your file from your computer folders</li>
                <li>Click &quot;Open&quot;</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Step 3: AI Processing</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Index automatically processes your file using AI</li>
              <li>This usually takes 10-30 seconds</li>
              <li>You&apos;ll see &quot;AI is processing your file...&quot; message</li>
              <li><strong className="text-red-600">Important</strong>: Don&apos;t close your browser during this step!</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Supported File Types</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span><strong>Excel Files</strong> (.xlsx, .xls) - Most common business spreadsheets</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span><strong>CSV Files</strong> (.csv) - Simple comma-separated data</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✅</span>
                <span><strong>JSON Files</strong> (.json) - Structured data files</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">File Size Limits</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li>Maximum file size: 50MB</li>
              <li>This typically handles thousands of rows of data</li>
              <li>If your file is too large, try splitting it into smaller files</li>
            </ul>
          </div>
        </section>

        {/* Viewing Data Section */}
        <section id="viewing-data" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Viewing Your Data</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">The Data Viewer</h3>
            <p className="text-gray-700 mb-4">After uploading, you&apos;ll see your data in a spreadsheet-like view:</p>
            
            <h4 className="text-lg font-medium text-[#596229] mb-3">Understanding the Layout</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>File Information</strong>: Shows your filename, number of rows/columns, and file type</li>
              <li><strong>Data Table</strong>: Your actual data displayed in rows and columns</li>
              <li><strong>Column Navigation</strong>: If you have many columns, use arrow buttons to scroll left/right</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Row Numbers</strong>: Each row is numbered on the left</li>
              <li><strong>Column Headers</strong>: Your data column names at the top</li>
              <li><strong>Column Types</strong>: Shows whether data is &quot;Numeric&quot; or &quot;Text&quot;</li>
              <li><strong>Data Preview</strong>: See all your imported information</li>
            </ul>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">Navigation Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li><strong>Scrolling</strong>: Use your mouse wheel to scroll up/down through rows</li>
              <li><strong>Column Viewing</strong>: If you have many columns, use ◀ ▶ buttons to see more</li>
              <li><strong>Back to Upload</strong>: Click &quot;Back to Upload&quot; to add a different file</li>
            </ul>
          </div>
        </section>

        {/* Creating Charts Section */}
        <section id="creating-charts" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Creating Charts and Graphs</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Getting Started with Charts</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>From the Data Viewer, scroll down to see the <strong>Chart Configuration</strong> section</li>
              <li>Here you can create beautiful visualizations of your data</li>
            </ol>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Step-by-Step Chart Creation</h3>
            
            <div className="mb-4">
              <h4 className="text-lg font-medium text-[#596229] mb-2">Step 1: Choose Chart Type</h4>
              <p className="text-gray-700 mb-2">Select from these options:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>Bar Chart</strong>: Great for comparing categories (like monthly sales)</li>
                <li><strong>Line Chart</strong>: Perfect for showing trends over time</li>
                <li><strong>Pie Chart</strong>: Shows parts of a whole (like market share)</li>
                <li><strong>Doughnut Chart</strong>: Similar to pie chart with a modern look</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-[#596229] mb-2">Step 2: Select Your Data</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li><strong>X-Axis</strong>: Choose what goes on the horizontal line (like months, products, etc.)</li>
                <li><strong>Y-Axis</strong>: Choose what goes on the vertical line (like sales amounts, quantities, etc.)</li>
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-[#596229] mb-2">Step 3: View Your Chart</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Once you select both axes, your chart appears automatically</li>
                <li>Charts are interactive - you can hover over parts to see exact values</li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Chart Examples for Business Data</h3>
            <div className="space-y-4">
              <div className="bg-[#f9f9ec] p-4 rounded">
                <h4 className="font-medium text-[#494f25]">Sales Data:</h4>
                <ul className="text-gray-700 mt-1">
                  <li>X-Axis: Month or Product Name</li>
                  <li>Y-Axis: Sales Amount</li>
                  <li>Chart Type: Bar or Line Chart</li>
                </ul>
              </div>
              <div className="bg-[#f9f9ec] p-4 rounded">
                <h4 className="font-medium text-[#494f25]">Customer Data:</h4>
                <ul className="text-gray-700 mt-1">
                  <li>X-Axis: Customer Type or Region</li>
                  <li>Y-Axis: Number of Customers</li>
                  <li>Chart Type: Bar Chart or Pie Chart</li>
                </ul>
              </div>
              <div className="bg-[#f9f9ec] p-4 rounded">
                <h4 className="font-medium text-[#494f25]">Inventory Data:</h4>
                <ul className="text-gray-700 mt-1">
                  <li>X-Axis: Product Category</li>
                  <li>Y-Axis: Stock Quantity</li>
                  <li>Chart Type: Bar Chart</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">Downloading Your Charts</h3>
            <ol className="list-decimal list-inside space-y-1 text-[#596229]">
              <li>Click the <strong>&quot;Download Chart&quot;</strong> button above your chart</li>
              <li>Your chart saves as a PNG image file</li>
              <li>Perfect for presentations, reports, or sharing with others</li>
              <li>File name includes chart type, data columns, and date</li>
            </ol>
          </div>
        </section>

        {/* Understanding Reports Section */}
        <section id="understanding-reports" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Understanding Your Reports</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Data Summary</h3>
            <p className="text-gray-700 mb-2">At the bottom of your charts, you&apos;ll see helpful information:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Data Points</strong>: How many categories your chart shows</li>
              <li><strong>Available Columns</strong>: All the data columns from your file</li>
              <li><strong>Column Types</strong>: Whether each column contains numbers or text</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Column Information</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Numeric Columns</strong>: Can be used for calculations and Y-axis values</li>
              <li><strong>Text Columns</strong>: Good for categories and X-axis labels</li>
              <li><strong>Row Count</strong>: Total number of data entries</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Making Sense of Your Data</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Trends</strong>: Line charts show if values are going up or down over time</li>
              <li><strong>Comparisons</strong>: Bar charts help you see which categories are largest/smallest</li>
              <li><strong>Proportions</strong>: Pie charts show what percentage each part represents</li>
            </ul>
          </div>
        </section>

        {/* Tips and Best Practices Section */}
        <section id="tips-best-practices" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Tips and Best Practices</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Before Uploading</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Clean Your Data</strong>: Remove empty rows and columns</li>
              <li><strong>Consistent Formatting</strong>: Use the same date format throughout</li>
              <li><strong>Clear Headers</strong>: Make sure column names are descriptive</li>
              <li><strong>One Sheet</strong>: If using Excel, put your data on the first sheet</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Choosing the Right Chart</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Time Data</strong>: Use line charts for trends over time</li>
              <li><strong>Categories</strong>: Use bar charts to compare different groups</li>
              <li><strong>Percentages</strong>: Use pie charts when showing parts of a whole</li>
              <li><strong>Large Numbers</strong>: Bar and line charts work better than pie charts</li>
            </ul>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">File Organization Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li><strong>Backup Your Files</strong>: Keep copies of original data</li>
              <li><strong>Descriptive Names</strong>: Name files clearly (e.g., &quot;Sales_Q4_2024.xlsx&quot;)</li>
              <li><strong>Regular Updates</strong>: Upload new data regularly to track progress</li>
            </ul>
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section id="troubleshooting" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Troubleshooting</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Common Upload Issues</h3>
            
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-medium text-red-800">&quot;File too large&quot; Error</h4>
                <p className="text-red-700 mt-1">Your file exceeds 50MB</p>
                <p className="text-red-700"><strong>Solution</strong>: Split data into smaller files or remove unnecessary columns</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-medium text-red-800">&quot;Unsupported file format&quot; Error</h4>
                <p className="text-red-700 mt-1">Your file type isn&apos;t supported</p>
                <p className="text-red-700"><strong>Solution</strong>: Save as .xlsx, .csv, or .json format</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-medium text-red-800">&quot;Processing failed&quot; Error</h4>
                <p className="text-red-700 mt-1">The AI couldn&apos;t read your file properly</p>
                <div className="text-red-700 mt-1">
                  <strong>Solutions:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    <li>Check for special characters in your data</li>
                    <li>Ensure your file isn&apos;t corrupted</li>
                    <li>Try saving in a different format</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Chart Issues</h3>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded">
                <h4 className="font-medium text-yellow-800">&quot;No numeric columns found&quot;</h4>
                <p className="text-yellow-700 mt-1">Your data doesn&apos;t have numbers for charts</p>
                <p className="text-yellow-700"><strong>Solution</strong>: Ensure some columns contain numerical data</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded">
                <h4 className="font-medium text-yellow-800">Chart looks distorted</h4>
                <p className="text-yellow-700 mt-1">Usually happens with too many data points</p>
                <p className="text-yellow-700"><strong>Solution</strong>: Filter your data to show fewer categories</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded">
                <h4 className="font-medium text-yellow-800">Can&apos;t see all data points</h4>
                <p className="text-yellow-700 mt-1">Chart might be too crowded</p>
                <p className="text-yellow-700"><strong>Solution</strong>: Try a different chart type or filter your data</p>
              </div>
            </div>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">Browser Issues</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li><strong>Slow loading</strong>: Check your internet connection</li>
              <li><strong>Page won&apos;t load</strong>: Try refreshing or using a different browser</li>
              <li><strong>Login problems</strong>: Clear your browser cookies and try again</li>
            </ul>
          </div>
        </section>

        {/* Getting Help Section */}
        <section id="getting-help" className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Getting Help</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Contact Options</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Email Support</strong>: Available through the Contact page</li>
              <li><strong>Response Time</strong>: Usually within 24 hours</li>
              <li><strong>Live Chat</strong>: Monday-Friday, 9AM-5PM</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Self-Help Resources</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Documentation</strong>: Comprehensive guides (you&apos;re reading one!)</li>
              <li><strong>FAQ Section</strong>: Quick answers to common questions</li>
              <li><strong>Video Tutorials</strong>: Step-by-step visual guides</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">What to Include When Asking for Help</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Describe the problem</strong>: What were you trying to do?</li>
              <li><strong>Error messages</strong>: Copy any error text you see</li>
              <li><strong>File details</strong>: What type of file and how large?</li>
              <li><strong>Browser info</strong>: Which browser and version you&apos;re using</li>
            </ol>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">Quick Help Topics</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li><strong>Data Import Issues</strong>: Problems uploading files</li>
              <li><strong>Chart Creation</strong>: Help making graphs</li>
              <li><strong>Technical Support</strong>: Login or performance issues</li>
              <li><strong>Feature Requests</strong>: Suggestions for improvements</li>
            </ul>
          </div>
        </section>

        {/* Security and Privacy Section */}
        <section className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Security and Privacy</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Your Data is Safe</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Temporary Processing</strong>: Your data is processed temporarily and not stored permanently</li>
              <li><strong>Secure Login</strong>: Google authentication protects your account</li>
              <li><strong>Private Processing</strong>: Only you can see your uploaded data</li>
              <li><strong>No Data Sharing</strong>: We never share your business information</li>
            </ul>
          </div>

          <div className="bg-[#f9f9ec] border-l-4 border-[#b3bc5f] p-4">
            <h3 className="text-lg font-semibold text-[#494f25] mb-2">Best Practices</h3>
            <ul className="list-disc list-inside space-y-1 text-[#596229]">
              <li><strong>Log Out</strong>: Always log out when using shared computers</li>
              <li><strong>Secure Files</strong>: Keep your data files in secure folders</li>
              <li><strong>Regular Updates</strong>: Keep your browser updated for security</li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: Is Index really free?</h3>
              <p className="text-gray-700">A: Yes! All features are completely free with no hidden costs.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: Do I need to install anything?</h3>
              <p className="text-gray-700">A: No, Index works entirely in your web browser.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: Do I need internet access?</h3>
              <p className="text-gray-700">A: Yes, Index is a web application that requires internet connection for all features including uploading, processing, and viewing your data.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: What happens to my data after I upload it?</h3>
              <p className="text-gray-700">A: Your data is processed temporarily and not stored permanently on our servers.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: Can I edit my data in Index?</h3>
              <p className="text-gray-700">A: Currently, Index is for viewing and visualizing data. Edit your files in Excel or similar programs before uploading.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-[#596229] mb-2">Q: How accurate is the AI processing?</h3>
              <p className="text-gray-700">A: Our AI is very accurate for standard business data formats. Always review your data after upload.</p>
            </div>
          </div>
        </section>

        {/* Getting the Most Out of Index Section */}
        <section className="bg-[#dfe3b3] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-3xl font-semibold text-[#494f25] mb-6">Getting the Most Out of Index</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Regular Business Use</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Weekly Reports</strong>: Upload weekly sales data to track trends</li>
              <li><strong>Monthly Reviews</strong>: Create charts for monthly business meetings</li>
              <li><strong>Quarterly Analysis</strong>: Compare performance across quarters</li>
              <li><strong>Annual Planning</strong>: Use yearly data for future planning</li>
            </ol>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#596229] mb-3">Sharing Results</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Download Charts</strong>: Save as images for presentations</li>
              <li><strong>Print Reports</strong>: Charts print clearly on standard paper</li>
              <li><strong>Email Updates</strong>: Share chart images with your team</li>
              <li><strong>Social Media</strong>: Use charts to showcase business growth</li>
            </ul>
          </div>

          <div className="bg-[#f9f9ec] border border-[#b3bc5f] rounded-lg p-6 text-center">
            <p className="text-lg text-gray-700 mb-4">
              Remember: Index is designed to be simple. If something seems complicated, you&apos;re probably overthinking it! 
              Start with basic uploads and simple charts, then explore more features as you get comfortable.
            </p>
            <p className="text-2xl font-semibold text-[#494f25]">
              Happy analyzing! 📊
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
