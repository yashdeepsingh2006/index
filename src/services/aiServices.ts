import { llm } from './llm';
import { buildInsightsPrompt, buildExtractionPrompt } from '../prompts/insightsPrompt';
import { buildChatPrompt } from '../prompts/chatPrompt';
import { CacheService } from './cache';
import { FeatureFlagsService } from './featureFlags';

interface InsightData {
  filename: string;
  content: string;
  userContext?: string;
  userId?: string;
}

export async function generateStructuredInsight(statsJson: string, userId?: string): Promise<any> {
  const isInsightsEnabled = await FeatureFlagsService.isEnabled('useInsights');
  if (!isInsightsEnabled) {
    throw new Error('Insights feature is currently disabled');
  }
  
  const isCacheEnabled = await FeatureFlagsService.isEnabled('useCache');
  
  // Check cache first if enabled
  if (isCacheEnabled) {
    const cacheKey = CacheService.generateHash(`insights:${statsJson}`, userId);
    const cached = await CacheService.get(cacheKey);
    if (cached) {
      console.log('[AI_SERVICES] Cache hit for insights');
      return cached;
    }
  }

  const prompt = `
You are an analytics engine. Analyze this stats JSON and output structured insights in JSON format.

The output should be an object with these exact keys:
- insights: array of insight objects
- summary: string summary
- metrics: key metrics object

Each insight object should have:
- title: string
- finding: string  
- impact: string
- recommendation: string
- confidence: number (0-100)

Stats data: ${statsJson}

Return valid JSON only, no markdown or explanations.
`;

  const response = await llm(prompt, { json: true });
  
  try {
    const result = JSON.parse(response);
    
    // Cache the result if caching is enabled
    if (isCacheEnabled) {
      const cacheKey = CacheService.generateHash(`insights:${statsJson}`, userId);
      await CacheService.set(cacheKey, result, userId, 24);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to parse insight JSON:', error);
    return {
      insights: [],
      summary: 'Error generating insights',
      metrics: {}
    };
  }
}

export async function generateChatResponse(message: string, userId?: string): Promise<string> {
  const isChatEnabled = await FeatureFlagsService.isEnabled('useChat');
  if (!isChatEnabled) {
    throw new Error('Chat feature is currently disabled');
  }
  
  const prompt = buildChatPrompt({ message });
  return await llm(prompt);
}

export async function extractDataInsights(csvData: string, fileName: string, userId?: string): Promise<any> {
  const isExtractionEnabled = await FeatureFlagsService.isEnabled('useExtraction');
  if (!isExtractionEnabled) {
    throw new Error('Data extraction feature is currently disabled');
  }
  
  const isCacheEnabled = await FeatureFlagsService.isEnabled('useCache');
  
  // Check cache first if enabled
  if (isCacheEnabled) {
    const cacheKey = CacheService.generateHash(`extraction:${fileName}:${csvData}`, userId);
    const cached = await CacheService.get(cacheKey);
    if (cached) {
      console.log('[AI_SERVICES] Cache hit for extraction');
      return cached;
    }
  }

  const prompt = `
Analyze this CSV data and extract key insights:

File: ${fileName}
Data preview: ${csvData.slice(0, 1000)}...

Provide analysis in JSON format with:
- data_quality: assessment of data completeness
- key_patterns: major trends discovered
- recommendations: actionable next steps
- data_summary: basic statistics

Return valid JSON only.
`;

  const response = await llm(prompt, { json: true });
  
  try {
    const result = JSON.parse(response);
    
    // Cache the result if caching is enabled
    if (isCacheEnabled) {
      const cacheKey = CacheService.generateHash(`extraction:${fileName}:${csvData}`, userId);
      await CacheService.set(cacheKey, result, userId, 24);
    }
    
    return result;
  } catch (error) {
    console.error('Failed to parse extraction JSON:', error);
    return {
      data_quality: 'Unknown',
      key_patterns: [],
      recommendations: [],
      data_summary: {}
    };
  }
}