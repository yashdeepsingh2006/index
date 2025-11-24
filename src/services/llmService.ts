import { GoogleGenerativeAI } from '@google/generative-ai';
import type { DataSummary, InsightResponse, NumericSummary, CategoricalSummary, DateSummary, ColumnInfo } from '../types/insight';

export class LLMService {
  private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  static async generateInsight(summary: DataSummary): Promise<InsightResponse> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = this.buildPrompt(summary);
    
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      // Clean and parse the JSON response
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedResponse) as InsightResponse;
    } catch (error) {
      console.error('LLM Error:', error);
      throw new Error('Failed to generate insight from LLM');
    }
  }

  private static buildPrompt(summary: DataSummary): string {
    const { totalRows, columns, numericSummaries, categoricalSummaries, dateSummaries } = summary;
    
    let prompt = `Analyze this dataset summary and provide ONE actionable business insight.

DATASET SUMMARY:
- Total rows: ${totalRows}
- Columns: ${columns.map((c: ColumnInfo) => `${c.name} (${c.type})`).join(', ')}

NUMERIC DATA:`;

    Object.entries(numericSummaries).forEach(([col, stats]: [string, NumericSummary]) => {
      prompt += `\n- ${col}: sum=${stats.sum.toFixed(2)}, avg=${stats.avg.toFixed(2)}, min=${stats.min}, max=${stats.max}`;
    });

    prompt += `\n\nCATEGORICAL DATA:`;
    Object.entries(categoricalSummaries).forEach(([col, stats]: [string, CategoricalSummary]) => {
      prompt += `\n- ${col}: ${stats.uniqueCount} unique values, top: ${stats.topCategories.slice(0, 3).map((t: { value: string; count: number }) => `${t.value}(${t.count})`).join(', ')}`;
    });

    if (Object.keys(dateSummaries).length > 0) {
      prompt += `\n\nDATE DATA:`;
      Object.entries(dateSummaries).forEach(([col, stats]: [string, DateSummary]) => {
        prompt += `\n- ${col}: ${stats.earliest} to ${stats.latest} (${stats.count} records)`;
      });
    }

    prompt += `\n\nReturn ONLY a JSON object in this exact format:
{
  "What happened": "One clear statement about the main finding",
  "Why it happened": "Brief explanation of the likely cause",
  "Action to take next": "Specific actionable recommendation",
  "Key metric numbers": "The most important numbers from the data",
  "Suggested chart type": "bar|line|pie|scatter|area"
}

Rules:
- Be specific and data-driven
- No motivational language
- No disclaimers
- Focus on the most significant pattern
- Keep each field to 1-2 sentences maximum`;

    return prompt;
  }
}