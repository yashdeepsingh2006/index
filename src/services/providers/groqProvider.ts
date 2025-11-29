import Groq from 'groq-sdk';

interface ChatOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' };
}

export async function groqChat(prompt: string, opts: ChatOptions = {}): Promise<string> {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // Timeout controller
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    console.log(`[GROQ] Starting request, prompt_length=${prompt.length}, model=${opts.model || 'llama-3.3-70b-versatile'}`);
    const startTime = Date.now();

    const requestParams: any = {
      messages: [{ role: 'user', content: prompt }],
      model: opts.model || 'llama-3.3-70b-versatile', // Updated to current supported model
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.max_tokens ?? 2000,
    };

    if (opts.response_format?.type === 'json_object') {
      requestParams.response_format = { type: 'json_object' as const };
    }

    const completion = await groq.chat.completions.create(requestParams);
    const response = completion.choices[0]?.message?.content || '';
    
    const duration = Date.now() - startTime;
    console.log(`[GROQ] Success in ${duration}ms, response_length=${response.length}`);
    
    clearTimeout(timeout);
    return response;

  } catch (error) {
    clearTimeout(timeout);
    
    if (error instanceof Error) {
      console.error(`[GROQ] Error: ${error.message}`);
      throw new Error(`Groq API error: ${error.message}`);
    } else {
      console.error('[GROQ] Unknown error:', error);
      throw new Error('Groq API unknown error');
    }
  }
}