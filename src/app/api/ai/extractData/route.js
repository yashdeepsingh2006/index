import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from 'xlsx';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    let fileContent;
    let parsedData;

    // Get file info
    const fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified || Date.now()
    };

    // Read and parse file based on type
    if (fileName.endsWith('.csv')) {
      fileContent = await file.text();
      parsedData = parseCSV(fileContent);
    } else if (fileName.endsWith('.json')) {
      fileContent = await file.text();
      parsedData = parseJSON(fileContent);
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const buffer = await file.arrayBuffer();
      parsedData = parseExcel(buffer);
      fileContent = JSON.stringify(parsedData.rows.slice(0, 5)); // Sample for AI
    } else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    // Optional: Use AI for additional processing/validation
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are a data extraction expert. Extract structured data in form of json from the given ${file} of type ${type}.
    you have to return a json object with the following structure:
    {
      "fileInfo": {
        "name": "file name",
        "type": "file type",
        "size": "file size in bytes"
      },
      "extractedData": {
        // Your extracted data goes here
      }
    }.
    also choose the x axis and y axis for the data visualization which is most suitable and choose in such a manner that graph will not get distorted.`;

      const result = await model.generateContent(prompt);
      const aiInsights = JSON.parse(result.response.text());
      
      // Add AI insights to metadata
      parsedData.aiInsights = aiInsights;
    } catch (aiError) {
      console.log('AI processing skipped:', aiError.message);
      // Continue without AI insights if it fails
    }

    // Create response object
    const processedData = {
      fileInfo,
      parsedData,
      metadata: {
        processedAt: new Date().toISOString(),
        fileType: fileName.split('.').pop(),
        encoding: 'UTF-8',
        processedBy: 'AI API',
        sheetName: fileName.endsWith('.xlsx') || fileName.endsWith('.xls') ? 'Sheet1' : null
      }
    };

    return NextResponse.json(processedData);

  } catch (error) {
    console.error('Extract data error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process file' },
      { status: 500 }
    );
  }
}

// Helper functions (same as before)
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };

  const headers = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = line.split(',').map(v => v.trim().replace(/['"]/g, ''));
      if (values.length === headers.length) {
        const rowObject = {};
        headers.forEach((header, index) => {
          rowObject[header] = values[index] || '';
        });
        rows.push(rowObject);
      }
    }
  }

  return {
    headers,
    rows,
    totalRows: rows.length,
    totalColumns: headers.length
  };
}

function parseJSON(jsonText) {
  const data = JSON.parse(jsonText);
  
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };
    }
    const headers = Object.keys(data[0]);
    return {
      headers,
      rows: data,
      totalRows: data.length,
      totalColumns: headers.length
    };
  } else if (typeof data === 'object') {
    const headers = Object.keys(data);
    return {
      headers,
      rows: [data],
      totalRows: 1,
      totalColumns: headers.length
    };
  } else {
    throw new Error('JSON must be an object or array of objects');
  }
}

function parseExcel(buffer) {
  const data = new Uint8Array(buffer);
  const workbook = XLSX.read(data, { type: 'array' });
  
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  if (jsonData.length === 0) {
    return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };
  }
  
  const headers = jsonData[0].map(header => header ? header.toString().trim() : '');
  const rows = [];
  
  for (let i = 1; i < jsonData.length; i++) {
    const row = jsonData[i];
    if (row && row.some(cell => cell !== undefined && cell !== null && cell !== '')) {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row[index] ? row[index].toString().trim() : '';
      });
      rows.push(rowObject);
    }
  }
  
  return {
    headers,
    rows,
    totalRows: rows.length,
    totalColumns: headers.length
  };
}