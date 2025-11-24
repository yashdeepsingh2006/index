import { NextRequest, NextResponse } from 'next/server';
import { DataProcessor } from '../../../services/dataProcessor';
import { LLMService } from '../../../services/llmService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls)$/i)) {
      return NextResponse.json(
        { error: 'Only CSV and Excel files are allowed' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process the file
    console.log('Processing file:', file.name);
    const dataSummary = await DataProcessor.processFile(buffer, file.name);

    // Generate insight using LLM
    console.log('Generating insight...');
    const insight = await LLMService.generateInsight(dataSummary);

    return NextResponse.json({
      success: true,
      data: {
        summary: dataSummary,
        insight
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}