import Groq from 'groq-sdk';
import type { AIProvider } from './interface';
import type { DataSummary, InsightResponse, NumericSummary, CategoricalSummary, DateSummary, ColumnInfo } from '../../types/insight';

/**
 * Groq AI provider implementation
 * Implements AIProvider interface with Groq API integration and consistent response formatting
 */
export class GroqProvider implements AIProvider {
  private client: Groq;

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY environment variable is required');
    }
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  /**
   * Generate business insights from data summary using Groq AI
   * Ensures consistent response format matching Gemini output
   */
  async generateInsight(data: DataSummary): Promise<InsightResponse> {
    const prompt = this.buildPrompt(data);
    
    try {
      const completion = await this.client.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'llama-3.3-70b-versatile', // Using Groq's fastest model
        temperature: 0.1, // Low temperature for consistent, factual responses
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response received from Groq API');
      }

      // Clean and parse the JSON response
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanedResponse) as InsightResponse;
    } catch (error) {
      console.error('Groq Provider Error:', error);
      throw new Error('Failed to generate insight from Groq AI');
    }
  }

  /**
   * Handle chat interactions with Groq AI
   * Provides conversational AI capabilities
   */
  async chat(message: string, context: any): Promise<string> {
    try {
      const messages: Array<{ role: 'user' | 'system'; content: string }> = [];
      
      // Add context as system message if provided
      if (context) {
        messages.push({
          role: 'system',
          content: `Context: ${JSON.stringify(context)}`,
        });
      }
      
      messages.push({
        role: 'user',
        content: message,
      });

      const completion = await this.client.chat.completions.create({
        messages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7, // Higher temperature for more creative chat responses
        max_tokens: 1500,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response received from Groq API');
      }

      return response;
    } catch (error) {
      console.error('Groq Chat Error:', error);
      throw new Error('Failed to process chat message with Groq AI');
    }
  }

  /**
   * Build the prompt for insight generation
   * Uses the same prompt structure as Gemini provider for consistent results
   */
  private buildPrompt(summary: DataSummary): string {
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