interface ChatContext {
  message: string;
  context?: string;
  previousMessages?: Array<{role: string, content: string}>;
}

export function buildChatPrompt(data: ChatContext): string {
  let prompt = 'You are a direct business analyst. Give short, actionable answers. No fluff.\n\n';
  
  if (data.context) {
    prompt += `Context: ${data.context}\n\n`;
  }
  
  if (data.previousMessages && data.previousMessages.length > 0) {
    prompt += 'Previous conversation:\n';
    data.previousMessages.forEach(msg => {
      prompt += `${msg.role}: ${msg.content}\n`;
    });
    prompt += '\n';
  }
  
  prompt += `User: ${data.message}\nAssistant: `;
  
  return prompt;
}