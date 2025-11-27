import type { DataSummary, InsightResponse } from '../../types/insight';

/**
 * Union type for supported AI providers
 */
export type ProviderType = 'gemini' | 'groq';

/**
 * Standard interface that all AI providers must implement
 * This abstraction allows seamless switching between different AI services
 */
export interface AIProvider {
  /**
   * Generate business insights from data summary
   * @param data - Processed data summary containing statistics and metadata
   * @returns Promise resolving to structured insight response
   */
  generateInsight(data: DataSummary): Promise<InsightResponse>;

  /**
   * Handle chat interactions with the AI provider
   * @param message - User message or prompt
   * @param context - Additional context for the conversation
   * @returns Promise resolving to AI response string
   */
  chat(message: string, context: any): Promise<string>;
}