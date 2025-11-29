import { NextRequest, NextResponse } from 'next/server';
import { generateStructuredInsight } from '@/services/aiServices';
import { DataProcessor } from '../../../services/dataProcessor';
import { withRateLimit } from '@/middleware/rateLimit';

export async function POST(req: NextRequest) {
  return withRateLimit(req, async () => {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      const userId = formData.get('userId') as string;

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

      // File size limit
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        return NextResponse.json(
          { error: 'File too large (max 10MB)' },
          { status: 413 }
        );
      }

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Process the file
      console.log('Processing file:', file.name);
      const dataSummary = await DataProcessor.processFile(buffer, file.name);

      // Generate insight using clean AI service with caching
      console.log('Generating insight...');
      const insight = await generateStructuredInsight(JSON.stringify(dataSummary), userId);

      return NextResponse.json({
        success: true,
        data: {
          summary: dataSummary,
          insight
        }
      });

    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof Error && error.message.includes('feature is currently disabled')) {
        return NextResponse.json(
          { error: error.message },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Failed to process file',
          details: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  });
}