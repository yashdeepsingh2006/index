"use client";

import React, { useState, useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface FileData {
  parsedData: {
    headers: string[];
    rows: Record<string, any>[];
    totalRows: number;
  };
  fileInfo: {
    name: string;
  };
}

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut';

export default function Graphs(): React.JSX.Element {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [selectedChart, setSelectedChart] = useState<ChartType>('bar');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    // Get data from sessionStorage
    const storedData = sessionStorage.getItem('fileData');
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setFileData(data);
        
        // Auto-select first two columns as default axes
        const headers = data?.parsedData?.headers || [];
        if (headers.length >= 2) {
          setXAxis(headers[0]);
          setYAxis(headers[1]);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
    setLoading(false);
  }, []);

  // Helper function to detect if a column contains numeric data
  const isNumericColumn = (columnName: string): boolean => {
    if (!fileData?.parsedData?.rows) return false;
    
    const values = fileData.parsedData.rows
      .map(row => {
        let val: any = row[columnName];
        // Convert objects to strings first
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        return val;
      })
      .filter(val => val !== null && val !== undefined && val !== '');
    
    if (values.length === 0) return false;
    
    // Check if at least 70% of non-empty values are numeric
    const numericCount = values.filter(val => !isNaN(parseFloat(String(val)))).length;
    return numericCount / values.length >= 0.7;
  };

  // Generate chart data based on selected axes
  const generateChartData = () => {
    if (!fileData?.parsedData?.rows || !xAxis || !yAxis) {
      return { labels: [], datasets: [] };
    }

    const rows = fileData.parsedData.rows;
    const isYNumeric = isNumericColumn(yAxis);

    if (isYNumeric) {
      // Numeric Y-axis: aggregate data by X-axis categories
      const aggregatedData: Record<string, number> = {};
      
      rows.forEach(row => {
        let xValue: any = row[xAxis];
        // Ensure xValue is a string
        if (xValue === null || xValue === undefined) {
          xValue = 'Unknown';
        } else if (typeof xValue === 'object') {
          xValue = JSON.stringify(xValue);
        } else {
          xValue = String(xValue);
        }
        
        const yValue = parseFloat(String(row[yAxis])) || 0;
        
        if (aggregatedData[xValue]) {
          aggregatedData[xValue] += yValue;
        } else {
          aggregatedData[xValue] = yValue;
        }
      });

      const labels = Object.keys(aggregatedData);
      const data = Object.values(aggregatedData);

      return {
        labels,
        datasets: [{
          label: yAxis,
          data,
          backgroundColor: [
            'rgba(150, 161, 65, 0.8)',
            'rgba(117, 127, 49, 0.8)',
            'rgba(89, 98, 41, 0.8)',
            'rgba(207, 213, 146, 0.8)',
            'rgba(116, 135, 206, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(150, 161, 65, 1)',
            'rgba(117, 127, 49, 1)',
            'rgba(89, 98, 41, 1)',
            'rgba(207, 213, 146, 1)',
            'rgba(116, 135, 206, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 2
        }]
      };
    } else {
      // Categorical Y-axis: count occurrences
      const categoryCount: Record<string, number> = {};
      
      rows.forEach(row => {
        let category: any = row[yAxis];
        // Ensure category is a string
        if (category === null || category === undefined) {
          category = 'Unknown';
        } else if (typeof category === 'object') {
          category = JSON.stringify(category);
        } else {
          category = String(category);
        }
        
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      const labels = Object.keys(categoryCount);
      const data = Object.values(categoryCount);

      return {
        labels,
        datasets: [{
          label: `Count of ${yAxis}`,
          data,
          backgroundColor: [
            'rgba(150, 161, 65, 0.8)',
            'rgba(117, 127, 49, 0.8)',
            'rgba(89, 98, 41, 0.8)',
            'rgba(207, 213, 146, 0.8)',
            'rgba(116, 135, 206, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ],
          borderColor: [
            'rgba(150, 161, 65, 1)',
            'rgba(117, 127, 49, 1)',
            'rgba(89, 98, 41, 1)',
            'rgba(207, 213, 146, 1)',
            'rgba(116, 135, 206, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 2
        }]
      };
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#494f25',
          font: {
            size: 12,
            weight: 'bold' as const
          }
        }
      },
      title: {
        display: true,
        text: `${selectedChart.toUpperCase()} Chart: ${xAxis} vs ${yAxis}`,
        color: '#3e4423',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      tooltip: {
        backgroundColor: 'rgba(73, 79, 37, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#96a141',
        borderWidth: 1
      }
    },
    scales: selectedChart === 'pie' || selectedChart === 'doughnut' ? {} : {
      x: {
        ticks: {
          color: '#596229',
          maxRotation: 45,
          minRotation: 0
        },
        grid: {
          color: 'rgba(207, 213, 146, 0.3)'
        }
      },
      y: {
        ticks: {
          color: '#596229'
        },
        grid: {
          color: 'rgba(207, 213, 146, 0.3)'
        }
      }
    }
  };

  const chartData = generateChartData();
  const headers = fileData?.parsedData?.headers || [];
  const numericHeaders = headers.filter(header => isNumericColumn(header));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec] p-4">
        <div className="text-center">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-[#96a141] border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base text-[#596229]">Loading graph data...</p>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec] p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#cfd592] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#757f31]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-[#494f25] mb-2">No Data Available</h2>
          <p className="text-sm sm:text-base text-[#596229] mb-4">Please upload a file first to view graphs.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#757f31] text-white rounded-lg hover:bg-[#596229] transition-colors text-sm sm:text-base"
          >
            Upload File
          </button>
        </div>
      </div>
    );
  }

  // Function to handle chart download
  const downloadChart = (): void => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const link = document.createElement('a');
      
      // Get current date for filename
      const now = new Date();
      const timestamp = now.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Create filename
      const filename = `${selectedChart}-chart_${xAxis}-vs-${yAxis}_${timestamp}.png`;
      
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  // Update the renderChart function to include the ref
  const renderChart = () => {
    const props = { 
      ref: chartRef,
      data: chartData, 
      options: chartOptions 
    };
    
    switch (selectedChart) {
      case 'bar':
        return <Bar {...props} />;
      case 'line':
        return <Line {...props} />;
      case 'pie':
        return <Pie {...props} />;
      case 'doughnut':
        return <Doughnut {...props} />;
      default:
        return <Bar {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9ec] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#3e4423] mb-2">
            Data Visualization
          </h1>
          <p className="text-sm sm:text-base text-[#596229] break-words">
            Create interactive charts from your data
            {fileData?.fileInfo?.name && (
              <span className="block sm:inline sm:before:content-['•'] sm:before:mx-2">
                {fileData.fileInfo.name}
              </span>
            )}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#494f25] mb-3 sm:mb-4">Chart Configuration</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Chart Type */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-[#494f25] mb-2">Chart Type</label>
              <select
                value={selectedChart}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedChart(e.target.value as ChartType)}
                className="w-full text-[#494f25] px-3 py-2 text-sm sm:text-base border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141] bg-white"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="doughnut">Doughnut Chart</option>
              </select>
            </div>

            {/* X-Axis */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-[#494f25] mb-2">X-Axis</label>
              <select
                value={xAxis}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setXAxis(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-base text-[#494f25] border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141] bg-white"
              >
                <option value="">Select X-Axis</option>
                {headers.map((header, index) => (
                  <option key={`x-option-${index}`} value={header}>{String(header)}</option>
                ))}
              </select>
            </div>

            {/* Y-Axis */}
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-[#494f25] mb-2">Y-Axis</label>
              <select
                value={yAxis}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setYAxis(e.target.value)}
                className="w-full text-[#494f25] px-3 py-2 text-sm sm:text-base border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141] bg-white"
              >
                <option value="">Select Y-Axis</option>
                {headers.map((header, index) => (
                  <option key={`y-option-${index}`} value={header}>
                    {String(header)} {isNumericColumn(header) ? '' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Info */}
            <div className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
              <div className="bg-[#f9f9ec] p-3 rounded-lg border border-[#dfe3b3]">
                <div className="text-xs sm:text-sm text-[#596229] space-y-1">
                  <div className="flex justify-between">
                    <span>Rows:</span>
                    <span className="font-medium">{fileData?.parsedData?.totalRows || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numeric columns:</span>
                    <span className="font-medium">{numericHeaders.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        {xAxis && yAxis ? (
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            {/* Chart Header with Download Button */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-[#494f25]">
                {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart
              </h3>
              <button
                onClick={downloadChart}
                className="flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 bg-[#96a141] text-white rounded-lg hover:bg-[#757f31] transition-colors font-medium text-sm sm:text-base"
                title="Download chart as PNG"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Download Chart</span>
              </button>
            </div>

            <div className="h-64 sm:h-80 lg:h-96">
              {renderChart()}
            </div>
            
            {/* Chart Stats */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-[#dfe3b3]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div className="bg-[#f9f9ec] p-3 rounded-lg">
                  <div className="font-semibold text-[#494f25] text-sm sm:text-base">X-Axis: {xAxis}</div>
                  <div className="text-[#596229] text-xs sm:text-sm">
                    {isNumericColumn(xAxis) ? 'Numeric data' : 'Categorical data'}
                  </div>
                </div>
                <div className="bg-[#f9f9ec] p-3 rounded-lg">
                  <div className="font-semibold text-[#494f25] text-sm sm:text-base">Y-Axis: {yAxis}</div>
                  <div className="text-[#596229] text-xs sm:text-sm">
                    {isNumericColumn(yAxis) ? 'Numeric data (aggregated)' : 'Categorical data (counted)'}
                  </div>
                </div>
                <div className="bg-[#f9f9ec] p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                  <div className="font-semibold text-[#494f25] text-sm sm:text-base">Data Points</div>
                  <div className="text-[#596229] text-xs sm:text-sm">
                    {chartData.labels?.length || 0} categories
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-[#cfd592]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="text-lg sm:text-xl font-semibold text-[#494f25] mb-2">Select Chart Parameters</h3>
              <p className="text-sm sm:text-base text-[#596229]">
                Choose X-Axis and Y-Axis from your data columns to generate a chart.
              </p>
              {headers.length === 0 && (
                <p className="text-red-500 mt-4 text-sm sm:text-base">
                  No data columns found. Please check your uploaded file.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Data Preview */}
        <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-[#494f25] mb-3 sm:mb-4">Available Columns</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
            {headers.map((header, index) => (
              <div 
                key={`column-${index}`}
                className="flex items-center justify-between p-2 sm:p-3 bg-[#f9f9ec] rounded-lg border border-[#dfe3b3]"
              >
                <span className="font-medium text-[#494f25] text-sm sm:text-base truncate mr-2">{String(header)}</span>
                <span className="text-xs sm:text-sm text-[#596229] flex-shrink-0">
                  {isNumericColumn(header) ? 'Numeric' : 'Text'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Download Information */}
        {xAxis && yAxis && (
          <div className="mt-4 sm:mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-blue-800">Download Info</h4>
                <p className="text-xs sm:text-sm text-blue-600 mt-1">
                  Click the &quot;Download Chart&quot; button to save your chart as a PNG image.
                </p>
                <p className="text-xs sm:text-sm text-blue-600 mt-1">
                  File name: <code className="bg-blue-100 px-1 py-0.5 rounded text-xs break-all">
                    {selectedChart}-chart_{xAxis}-vs-{yAxis}_{new Date().toISOString().split('T')[0]}.png
                  </code>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}