import { SettingsService } from './settings';
import { geminiChat } from './providers/geminiProvider';
import { groqChat } from './providers/groqProvider';
import { MonitoringService } from './monitoring';

interface LLMOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  json?: boolean;
}

const FALLBACK_MESSAGE = "AI is temporarily unavailable. Please try again in 10-20 seconds.";

export async function llm(prompt: string, opts: LLMOptions = {}): Promise<string> {
  // Input validation
  if (!prompt || prompt.trim().length === 0) {
    throw new Error('Empty prompt provided');
  }

  if (prompt.length > 100000) {
    throw new Error('Prompt too long (max 100k characters)');
  }

  const settings = await SettingsService.loadSettings();
  const provider = settings.activeProvider;
  
  console.log(`[LLM] Using provider: ${provider}, prompt_length=${prompt.length}`);
  
  const startTime = Date.now();
  let lastError: Error | null = null;

  // Try primary provider with retries
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`[LLM] ${provider} attempt ${attempt}/2`);
      
      let response: string;

      if (provider === 'groq') {
        const groqOpts: any = {
          model: opts.model,
          temperature: opts.temperature,
          max_tokens: opts.max_tokens,
        };
        
        if (opts.json) {
          groqOpts.response_format = { type: 'json_object' };
        }
        
        response = await groqChat(prompt, groqOpts);
      } else {
        const geminiOpts: any = {
          model: opts.model,
          temperature: opts.temperature,
          max_tokens: opts.max_tokens,
        };
        
        if (opts.json) {
          geminiOpts.responseMimeType = 'application/json';
        }
        
        response = await geminiChat(prompt, geminiOpts);
      }

      const normalizedResponse = normalizeResponse(response);
      
      if (opts.json) {
        const validatedResponse = validateJsonResponse(normalizedResponse);
        
        // Log successful request
        await MonitoringService.logRequest({
          provider,
          endpoint: 'llm',
          success: true,
          responseTime: Date.now() - startTime
        });
        
        return validatedResponse;
      }
      
      // Log successful request
      await MonitoringService.logRequest({
        provider,
        endpoint: 'llm',
        success: true,
        responseTime: Date.now() - startTime
      });
      
      return normalizedResponse;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.error(`[LLM] ${provider} attempt ${attempt} failed:`, lastError.message);
      
      if (attempt === 2) {
        break; // Exit retry loop, will try fallback
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Try alternative provider as fallback
  const fallbackProvider = provider === 'groq' ? 'gemini' : 'groq';
  console.log(`[LLM] Trying fallback provider: ${fallbackProvider}`);
  
  try {
    let response: string;
    
    if (fallbackProvider === 'groq') {
      const groqOpts: any = {
        model: opts.model,
        temperature: opts.temperature,
        max_tokens: opts.max_tokens,
      };
      
      if (opts.json) {
        groqOpts.response_format = { type: 'json_object' };
      }
      
      response = await groqChat(prompt, groqOpts);
    } else {
      const geminiOpts: any = {
        model: opts.model,
        temperature: opts.temperature,
        max_tokens: opts.max_tokens,
      };
      
      if (opts.json) {
        geminiOpts.responseMimeType = 'application/json';
      }
      
      response = await geminiChat(prompt, geminiOpts);
    }
    
    const normalizedResponse = normalizeResponse(response);
    
    if (opts.json) {
      const validatedResponse = validateJsonResponse(normalizedResponse);
      
      // Log fallback success
      await MonitoringService.logRequest({
        provider: `${fallbackProvider} (fallback)`,
        endpoint: 'llm',
        success: true,
        responseTime: Date.now() - startTime
      });
      
      return validatedResponse;
    }
    
    // Log fallback success
    await MonitoringService.logRequest({
      provider: `${fallbackProvider} (fallback)`,
      endpoint: 'llm',
      success: true,
      responseTime: Date.now() - startTime
    });
    
    return normalizedResponse;
    
  } catch (fallbackError) {
    console.error(`[LLM] Fallback ${fallbackProvider} also failed:`, fallbackError);
    
    // Log complete failure
    await MonitoringService.logRequest({
      provider: 'both (failed)',
      endpoint: 'llm',
      success: false,
      responseTime: Date.now() - startTime,
      error: lastError?.message || 'Multiple provider failures'
    });
    
    // Return fallback message instead of throwing
    if (opts.json) {
      return JSON.stringify({ error: FALLBACK_MESSAGE, status: "temporary_failure" });
    }
    
    return FALLBACK_MESSAGE;
  }
}

function normalizeResponse(response: string): string {
  if (!response) {
    throw new Error('Empty response from AI provider');
  }

  // Clean and normalize the response
  let normalizedText = response.trim();
  
  // Remove excessive whitespace
  normalizedText = normalizedText.replace(/\s+/g, ' ');
  
  if (normalizedText.length === 0) {
    throw new Error('Response contains only whitespace');
  }

  return normalizedText;
}

function validateJsonResponse(response: string): string {
  try {
    JSON.parse(response);
    return response;
  } catch (error) {
    throw new Error(`Invalid JSON response: ${error instanceof Error ? error.message : 'Parse failed'}`);
  }
}