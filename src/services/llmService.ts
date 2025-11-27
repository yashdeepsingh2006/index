import type { DataSummary, InsightResponse, NumericSummary, CategoricalSummary, DateSummary, ColumnInfo } from '../types/insight';
import { getActiveProvider } from './settings';

export class LLMService {
  static async generateInsight(summary: DataSummary): Promise<InsightResponse> {
    try {
      const provider = await getActiveProvider();
      return await provider.generateInsight(summary);
    } catch (error) {
      console.error('LLM Error:', error);
      throw new Error('Failed to generate insight from LLM');
    }
  }
}