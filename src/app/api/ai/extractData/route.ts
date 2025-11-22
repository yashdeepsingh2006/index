import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as XLSX from 'xlsx';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

interface ParsedData {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
  totalColumns: number;
  aiInsights?: any;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    let fileContent: string;
    let parsedData: ParsedData;

    // Get file info
    const fileInfo: FileInfo = {
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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a data extraction expert. Analyze the following data and return ONLY a valid JSON object (no markdown, no backticks, no extra text).

Return this exact structure:
{
  "fileInfo": {
    "name": "${file.name}",
    "type": "${file.type || 'unknown'}",
    "size": ${file.size}
  },
  "extractedData": {
    "summary": "Brief description of the data",
    "xAxis": "suggested column name for x-axis",
    "yAxis": "suggested column name for y-axis",
    "chartType": "bar|line|pie|scatter"
  }
}

Data sample: ${typeof fileContent === 'string' ? fileContent.slice(0, 500) : JSON.stringify(parsedData.rows.slice(0, 3))}`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      
      // Clean the response to ensure it's valid JSON
      let cleanedResponse = responseText;
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```[a-zA-Z]*\s*/, '').replace(/\s*```$/, '');
      }
      
      const aiInsights = JSON.parse(cleanedResponse);
      
      // Add AI insights to metadata
      parsedData.aiInsights = aiInsights;
    } catch (aiError) {
      const errorMessage = aiError instanceof Error ? aiError.message : 'Unknown error';
      console.log('AI processing skipped:', errorMessage);
      // Continue without AI insights if it fails
      parsedData.aiInsights = null;
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
    const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
    console.error('Extract data error:', error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Helper functions (same as before)
function parseCSV(csvText: string): ParsedData {
  try {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };

    const headers = lines[0].split(',').map(h => String(h).trim().replace(/['"]/g, ''));
    const rows: Record<string, string>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const values = line.split(',').map(v => String(v).trim().replace(/['"]/g, ''));
        if (values.length === headers.length) {
          const rowObject: Record<string, string> = {};
          headers.forEach((header, index) => {
            const cellValue = values[index];
            // Ensure all values are strings
            rowObject[header] = cellValue || '';
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
  } catch (csvError) {
    const errorMessage = csvError instanceof Error ? csvError.message : 'Unknown CSV parsing error';
    console.error('CSV parsing error:', csvError);
    throw new Error(`Failed to parse CSV file: ${errorMessage}`);
  }
}

function parseJSON(jsonText: string): ParsedData {
  try {
    const data = JSON.parse(jsonText);
    
    if (Array.isArray(data)) {
      if (data.length === 0) {
        return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };
      }
      
      // Ensure all array elements are objects
      const validRows = data.filter(item => item && typeof item === 'object' && !Array.isArray(item));
      if (validRows.length === 0) {
        throw new Error('JSON array must contain objects');
      }
      
      const headers = Object.keys(validRows[0]);
      const processedRows = validRows.map(row => {
        const processedRow: Record<string, string> = {};
        headers.forEach(header => {
          const value = row[header];
          // Convert complex values to strings
          if (value === null || value === undefined) {
            processedRow[header] = '';
          } else if (typeof value === 'object') {
            processedRow[header] = JSON.stringify(value);
          } else {
            processedRow[header] = String(value);
          }
        });
        return processedRow;
      });
      
      return {
        headers,
        rows: processedRows,
        totalRows: processedRows.length,
        totalColumns: headers.length
      };
    } else if (typeof data === 'object' && data !== null) {
      const headers = Object.keys(data);
      const processedRow: Record<string, string> = {};
      headers.forEach(header => {
        const value = data[header];
        // Convert complex values to strings
        if (value === null || value === undefined) {
          processedRow[header] = '';
        } else if (typeof value === 'object') {
          processedRow[header] = JSON.stringify(value);
        } else {
          processedRow[header] = String(value);
        }
      });
      
      return {
        headers,
        rows: [processedRow],
        totalRows: 1,
        totalColumns: headers.length
      };
    } else {
      throw new Error('JSON must be an object or array of objects');
    }
  } catch (parseError) {
    const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown JSON parsing error';
    console.error('JSON parsing error:', parseError);
    throw new Error(`Invalid JSON format: ${errorMessage}`);
  }
}

function parseExcel(buffer: ArrayBuffer): ParsedData {
  try {
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });
    
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    
    if (jsonData.length === 0) {
      return { headers: [], rows: [], totalRows: 0, totalColumns: 0 };
    }
    
    const headers = jsonData[0]?.map(header => header ? String(header).trim() : '') || [];
    const rows: Record<string, string>[] = [];
    
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (row && row.some(cell => cell !== undefined && cell !== null && cell !== '')) {
        const rowObject: Record<string, string> = {};
        headers.forEach((header, index) => {
          const cellValue = row[index];
          // Ensure all values are strings
          if (cellValue === null || cellValue === undefined || cellValue === '') {
            rowObject[header] = '';
          } else if (typeof cellValue === 'object') {
            rowObject[header] = JSON.stringify(cellValue);
          } else {
            rowObject[header] = String(cellValue).trim();
          }
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
  } catch (excelError) {
    const errorMessage = excelError instanceof Error ? excelError.message : 'Unknown Excel parsing error';
    console.error('Excel parsing error:', excelError);
    throw new Error(`Failed to parse Excel file: ${errorMessage}`);
  }
}