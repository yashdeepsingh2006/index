import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  responseMimeType?: string;
}

export async function geminiChat(prompt: string, opts: ChatOptions = {}): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  
  // Timeout controller
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    console.log(`[GEMINI] Starting request, prompt_length=${prompt.length}, model=${opts.model || 'gemini-2.5-flash'}`);
    const startTime = Date.now();

    const generationConfig: any = {};
    
    if (opts.responseMimeType) {
      generationConfig.responseMimeType = opts.responseMimeType;
    }
    
    if (opts.temperature !== undefined) {
      generationConfig.temperature = opts.temperature;
    }
    
    if (opts.max_tokens) {
      generationConfig.maxOutputTokens = opts.max_tokens;
    }

    const model = genAI.getGenerativeModel({ 
      model: opts.model || 'gemini-2.5-flash', // Updated to 2.5 flash model
      generationConfig
    });

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    const duration = Date.now() - startTime;
    console.log(`[GEMINI] Success in ${duration}ms, response_length=${response.length}`);
    
    clearTimeout(timeout);
    return response;

  } catch (error) {
    clearTimeout(timeout);
    
    if (error instanceof Error) {
      console.error(`[GEMINI] Error: ${error.message}`);
      throw new Error(`Gemini API error: ${error.message}`);
    } else {
      console.error('[GEMINI] Unknown error:', error);
      throw new Error('Gemini API unknown error');
    }
  }
}