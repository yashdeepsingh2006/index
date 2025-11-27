import { NextRequest, NextResponse } from 'next/server';
import { getActiveProvider } from '../../../../services/settings';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface ChatRequest {
  message: string;
  fileData: any;
  chatHistory?: ChatMessage[];
}

// Data analysis functions
function calculateDataAnalysis(rows: any[], headers: string[]) {
  const analysis: any = {};
  
  headers.forEach(header => {
    const values = rows.map(row => row[header]).filter(val => val !== null && val !== undefined && val !== '');
    
    // Try to parse as numbers
    const numericValues = values.map(val => {
      const num = parseFloat(String(val).replace(/[$,]/g, ''));
      return isNaN(num) ? null : num;
    }).filter(val => val !== null) as number[];
    
    if (numericValues.length > 0) {
      // Numeric analysis
      analysis[header] = {
        type: 'numeric',
        count: numericValues.length,
        sum: numericValues.reduce((a, b) => a + b, 0),
        average: numericValues.reduce((a, b) => a + b, 0) / numericValues.length,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        values: numericValues
      };
    } else {
      // Categorical analysis
      const counts: Record<string, number> = {};
      values.forEach(val => {
        const strVal = String(val);
        counts[strVal] = (counts[strVal] || 0) + 1;
      });
      
      analysis[header] = {
        type: 'categorical',
        count: values.length,
        uniqueCount: Object.keys(counts).length,
        valueCounts: counts,
        mostCommon: Object.entries(counts).sort(([,a], [,b]) => (b as number) - (a as number))[0]
      };
    }
  });
  
  return analysis;
}

function answerQuestion(question: string, analysis: any, rows: any[], headers: string[]): string {
  const lowerQ = question.toLowerCase();
  
  // Most valuable/expensive product
  if (lowerQ.includes('most valuable') || lowerQ.includes('most expensive') || lowerQ.includes('highest price') || lowerQ.includes('highest sales')) {
    const salesCol = headers.find(h => h.toLowerCase().includes('sales') || h.toLowerCase().includes('price') || h.toLowerCase().includes('amount'));
    const productCol = headers.find(h => h.toLowerCase().includes('product') || h.toLowerCase().includes('item') || h.toLowerCase().includes('name'));
    
    if (salesCol && analysis[salesCol] && analysis[salesCol].type === 'numeric') {
      const maxValue = analysis[salesCol].max;
      const maxRow = rows.find(row => parseFloat(String(row[salesCol]).replace(/[$,]/g, '')) === maxValue);
      const productName = productCol && maxRow ? maxRow[productCol] : 'Unknown';
      
      return `The most valuable product is **${productName}** with a sales value of **$${maxValue.toFixed(2)}**.`;
    }
  }
  
  // Total sales/revenue
  if (lowerQ.includes('total sales') || lowerQ.includes('total revenue') || lowerQ.includes('sum of sales')) {
    const salesCol = headers.find(h => h.toLowerCase().includes('sales') || h.toLowerCase().includes('revenue') || h.toLowerCase().includes('amount'));
    
    if (salesCol && analysis[salesCol] && analysis[salesCol].type === 'numeric') {
      const total = analysis[salesCol].sum;
      return `The total sales amount is **$${total.toFixed(2)}** across ${analysis[salesCol].count} transactions.`;
    }
  }
  
  // Average sales/price
  if (lowerQ.includes('average') || lowerQ.includes('mean')) {
    const salesCol = headers.find(h => h.toLowerCase().includes('sales') || h.toLowerCase().includes('price') || h.toLowerCase().includes('amount'));
    
    if (salesCol && analysis[salesCol] && analysis[salesCol].type === 'numeric') {
      const avg = analysis[salesCol].average;
      return `The average sales value is **$${avg.toFixed(2)}** per transaction.`;
    }
  }
  
  // Top salesperson
  if (lowerQ.includes('top salesperson') || lowerQ.includes('best salesperson') || lowerQ.includes('highest performing')) {
    const salespersonCol = headers.find(h => h.toLowerCase().includes('salesperson') || h.toLowerCase().includes('sales person') || h.toLowerCase().includes('agent'));
    const salesCol = headers.find(h => h.toLowerCase().includes('sales') || h.toLowerCase().includes('amount'));
    
    if (salespersonCol && salesCol && analysis[salesCol]) {
      const salesBySalesperson: Record<string, number> = {};
      rows.forEach(row => {
        const person = row[salespersonCol];
        const amount = parseFloat(String(row[salesCol]).replace(/[$,]/g, '')) || 0;
        salesBySalesperson[person] = (salesBySalesperson[person] || 0) + amount;
      });
      
      const topSalesperson = Object.entries(salesBySalesperson).sort(([,a], [,b]) => b - a)[0];
      return `The top performing salesperson is **${topSalesperson[0]}** with total sales of **$${topSalesperson[1].toFixed(2)}**.`;
    }
  }
  
  // Category analysis
  if (lowerQ.includes('category') || lowerQ.includes('categories')) {
    const categoryCol = headers.find(h => h.toLowerCase().includes('category') || h.toLowerCase().includes('type'));
    
    if (categoryCol && analysis[categoryCol] && analysis[categoryCol].type === 'categorical') {
      const counts = analysis[categoryCol].valueCounts;
      const sortedCategories = Object.entries(counts).sort(([,a], [,b]) => (b as number) - (a as number));
      
      let result = `**Category breakdown:**\n`;
      sortedCategories.forEach(([cat, count]) => {
        result += `• ${cat}: ${count} items\n`;
      });
      
      return result;
    }
  }
  
  // Regional analysis
  if (lowerQ.includes('region') || lowerQ.includes('regional') || lowerQ.includes('location')) {
    const regionCol = headers.find(h => h.toLowerCase().includes('region') || h.toLowerCase().includes('location') || h.toLowerCase().includes('area'));
    
    if (regionCol && analysis[regionCol] && analysis[regionCol].type === 'categorical') {
      const counts = analysis[regionCol].valueCounts;
      const sortedRegions = Object.entries(counts).sort(([,a], [,b]) => (b as number) - (a as number));
      
      let result = `**Regional distribution:**\n`;
      sortedRegions.forEach(([region, count]) => {
        result += `• ${region}: ${count} transactions\n`;
      });
      
      return result;
    }
  }
  
  // Units sold
  if (lowerQ.includes('units') || lowerQ.includes('quantity') || lowerQ.includes('items sold')) {
    const unitsCol = headers.find(h => h.toLowerCase().includes('units') || h.toLowerCase().includes('quantity') || h.toLowerCase().includes('qty'));
    
    if (unitsCol && analysis[unitsCol] && analysis[unitsCol].type === 'numeric') {
      const total = analysis[unitsCol].sum;
      const avg = analysis[unitsCol].average;
      return `**Units analysis:**\n• Total units sold: ${total}\n• Average units per transaction: ${avg.toFixed(1)}\n• Highest single transaction: ${analysis[unitsCol].max} units`;
    }
  }
  
  // Date range/trends
  if (lowerQ.includes('date') || lowerQ.includes('time') || lowerQ.includes('when') || lowerQ.includes('period')) {
    const dateCol = headers.find(h => h.toLowerCase().includes('date') || h.toLowerCase().includes('time'));
    
    if (dateCol && analysis[dateCol]) {
      const dates = rows.map(row => row[dateCol]).filter(d => d);
      const sortedDates = dates.sort();
      return `**Date range:** From ${sortedDates[0]} to ${sortedDates[sortedDates.length - 1]} (${dates.length} total records)`;
    }
  }
  
  // Summary/overview
  if (lowerQ.includes('summary') || lowerQ.includes('overview') || lowerQ.includes('tell me about')) {
    const salesCol = headers.find(h => h.toLowerCase().includes('sales') || h.toLowerCase().includes('amount'));
    let summary = `**Dataset Overview:**\n• Total records: ${rows.length}\n• Columns: ${headers.length} (${headers.join(', ')})\n`;
    
    if (salesCol && analysis[salesCol] && analysis[salesCol].type === 'numeric') {
      summary += `• Total sales: $${analysis[salesCol].sum.toFixed(2)}\n• Average transaction: $${analysis[salesCol].average.toFixed(2)}`;
    }
    
    return summary;
  }
  
  // Fallback: provide actual data context
  return `I have access to your data with ${rows.length} rows and columns: ${headers.join(', ')}. Please ask specific questions like:\n\n• "What is the most valuable product?"\n• "Who is the top salesperson?"\n• "What are the total sales?"\n• "Show me category breakdown"\n• "What's the average price?"\n\nI'll analyze your actual data to provide precise answers.`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { message, fileData, chatHistory = [] }: ChatRequest = await request.json();

    if (!message || !fileData) {
      return NextResponse.json({ error: 'Message and file data are required' }, { status: 400 });
    }

    const rows = fileData.parsedData?.rows || [];
    const headers = fileData.parsedData?.headers || [];
    
    if (rows.length === 0) {
      return NextResponse.json({
        message: {
          role: 'assistant',
          content: 'No data found to analyze. Please upload a valid data file.',
          timestamp: new Date().toISOString()
        }
      });
    }

    // Perform actual data analysis
    const analysis = calculateDataAnalysis(rows, headers);
    
    // Try to answer with computed results first
    const computedAnswer = answerQuestion(message, analysis, rows, headers);
    
    // If we have a specific computed answer, return it
    if (!computedAnswer.includes('Please ask specific questions')) {
      return NextResponse.json({
        message: {
          role: 'assistant',
          content: computedAnswer,
          timestamp: new Date().toISOString()
        },
        success: true
      });
    }
    
    // For complex questions, use AI with actual computed data
    const dataContext = `
DATASET ANALYSIS:
- File: ${fileData.fileInfo?.name}
- Rows: ${rows.length}
- Columns: ${headers.join(', ')}

COMPUTED STATISTICS:
${Object.entries(analysis).map(([col, stats]: [string, any]) => {
  if (stats.type === 'numeric') {
    return `${col}: Total=${stats.sum.toFixed(2)}, Average=${stats.average.toFixed(2)}, Min=${stats.min}, Max=${stats.max}`;
  } else {
    const topValues = Object.entries(stats.valueCounts).sort(([,a], [,b]) => (b as number) - (a as number)).slice(0, 3);
    return `${col}: ${stats.uniqueCount} unique values, Top: ${topValues.map(([k,v]) => `${k}(${v})`).join(', ')}`;
  }
}).join('\n')}

SAMPLE RECORDS:
${rows.slice(0, 3).map((row: any) => JSON.stringify(row)).join('\n')}`;

    const prompt = `You are a RAG chatbot analyzing real data. Use ONLY the computed statistics and actual data provided above to answer questions.

USER QUESTION: ${message}

Rules:
1. ALWAYS use actual numbers and values from the computed statistics
2. Be specific and reference real data points
3. Don't make assumptions - only use provided calculations
4. Format numbers properly (currencies with $ sign)
5. Keep answers concise but data-driven

${dataContext}`;

    const provider = await getActiveProvider();
    const response = await provider.chat(prompt, { fileData, chatHistory });

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({ 
      message: assistantMessage,
      success: true 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat message';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}