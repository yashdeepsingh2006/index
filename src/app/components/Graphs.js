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

export default function Graphs() {
  const [fileData, setFileData] = useState(null);
  const [selectedChart, setSelectedChart] = useState('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

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
  const isNumericColumn = (columnName) => {
    if (!fileData?.parsedData?.rows) return false;
    
    const values = fileData.parsedData.rows
      .map(row => row[columnName])
      .filter(val => val !== null && val !== undefined && val !== '');
    
    if (values.length === 0) return false;
    
    // Check if at least 70% of non-empty values are numeric
    const numericCount = values.filter(val => !isNaN(parseFloat(val))).length;
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
      const aggregatedData = {};
      
      rows.forEach(row => {
        const xValue = row[xAxis] || 'Unknown';
        const yValue = parseFloat(row[yAxis]) || 0;
        
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
      const categoryCount = {};
      
      rows.forEach(row => {
        const category = row[yAxis] || 'Unknown';
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
        position: 'top',
        labels: {
          color: '#494f25',
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: `${selectedChart.toUpperCase()} Chart: ${xAxis} vs ${yAxis}`,
        color: '#3e4423',
        font: {
          size: 16,
          weight: 'bold'
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
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#96a141] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#596229]">Loading graph data...</p>
        </div>
      </div>
    );
  }

  if (!fileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9ec]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#494f25] mb-2">No Data Available</h2>
          <p className="text-[#596229] mb-4">Please upload a file first to view graphs.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-[#757f31] text-white rounded-lg hover:bg-[#596229] transition-colors"
          >
            Upload File
          </button>
        </div>
      </div>
    );
  }

  // Function to handle chart download
  const downloadChart = () => {
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
    <div className="min-h-screen bg-[#f9f9ec] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3e4423] mb-2">
            Data Visualization
          </h1>
          <p className="text-[#596229]">
            Create interactive charts from your data • {fileData?.fileInfo?.name}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-[#494f25] mb-4">Chart Configuration</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* Chart Type */}
            <div>
              <label className="block text-sm font-medium text-[#494f25] mb-2">Chart Type</label>
              <select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="w-full text-[#494f25] px-3 py-2 border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141]"
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="doughnut">Doughnut Chart</option>
              </select>
            </div>

            {/* X-Axis */}
            <div>
              <label className="block text-sm font-medium text-[#494f25] mb-2">X-Axis</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full px-3 py-2 text-[#494f25] border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141]"
              >
                <option className='' value="">Select X-Axis</option>
                {headers.map(header => (
                  <option key={header} value={header}>{header}</option>
                ))}
              </select>
            </div>

            {/* Y-Axis */}
            <div>
              <label className="block text-sm font-medium text-[#494f25] mb-2">Y-Axis</label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full text-[#494f25] px-3 py-2 border border-[#cfd592] rounded-lg focus:ring-2 focus:ring-[#96a141] focus:border-[#96a141]"
              >
                <option value="">Select Y-Axis</option>
                {headers.map(header => (
                  <option key={header} value={header}>
                    {header} {isNumericColumn(header) ? '' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Data Info */}
            <div className="flex flex-col justify-end">
              <div className="text-sm text-[#596229]">
                <div>Rows: {fileData?.parsedData?.totalRows || 0}</div>
                <div>Numeric columns: {numericHeaders.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        {xAxis && yAxis ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Chart Header with Download Button */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#494f25]">
                {selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart
              </h3>
              <button
                onClick={downloadChart}
                className="flex items-center space-x-2 px-4 py-2 bg-[#96a141] text-white rounded-lg hover:bg-[#757f31] transition-colors font-medium"
                title="Download chart as PNG"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Download Chart</span>
              </button>
            </div>

            <div className="h-96">
              {renderChart()}
            </div>
            
            {/* Chart Stats */}
            <div className="mt-6 pt-4 border-t border-[#dfe3b3]">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-[#f9f9ec] p-3 rounded-lg">
                  <div className="font-semibold text-[#494f25]">X-Axis: {xAxis}</div>
                  <div className="text-[#596229]">
                    {isNumericColumn(xAxis) ? 'Numeric data' : 'Categorical data'}
                  </div>
                </div>
                <div className="bg-[#f9f9ec] p-3 rounded-lg">
                  <div className="font-semibold text-[#494f25]">Y-Axis: {yAxis}</div>
                  <div className="text-[#596229]">
                    {isNumericColumn(yAxis) ? 'Numeric data (aggregated)' : 'Categorical data (counted)'}
                  </div>
                </div>
                <div className="bg-[#f9f9ec] p-3 rounded-lg">
                  <div className="font-semibold text-[#494f25]">Data Points</div>
                  <div className="text-[#596229]">
                    {chartData.labels?.length || 0} categories
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            
            <h3 className="text-xl font-semibold text-[#494f25] mb-2">Select Chart Parameters</h3>
            <p className="text-[#596229]">
              Choose X-Axis and Y-Axis from your data columns to generate a chart.
            </p>
            {headers.length === 0 && (
              <p className="text-red-500 mt-4">
                No data columns found. Please check your uploaded file.
              </p>
            )}
          </div>
        )}

        {/* Data Preview */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-[#494f25] mb-4">Available Columns</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {headers.map(header => (
              <div 
                key={header}
                className="flex items-center justify-between p-3 bg-[#f9f9ec] rounded-lg border border-[#dfe3b3]"
              >
                <span className="font-medium text-[#494f25]">{header}</span>
                <span className="text-sm text-[#596229]">
                  {isNumericColumn(header) ? 'Numeric' : 'Text'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Download Information */}
        {xAxis && yAxis && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-blue-800">Download Info</h4>
                <p className="text-sm text-blue-600 mt-1">
                  Click the &quot;Download Chart&quot; button to save your chart as a PNG image.
                  The file will be named: <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">
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