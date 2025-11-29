interface InsightData {
  filename: string;
  content: string;
  userContext?: string;
}

export function buildInsightsPrompt(data: InsightData): string {
  return `You are a data analyst. Analyze the following data and provide actionable insights in JSON format.

File: ${data.filename}
User Context: ${data.userContext || 'General analysis'}

Data:
${data.content}

Provide your response as valid JSON with this structure:
{
  "summary": "Brief overview",
  "key_insights": ["insight1", "insight2", "insight3"],
  "trends": ["trend1", "trend2"],
  "recommendations": ["action1", "action2"],
  "data_quality": "assessment of data quality",
  "confidence_score": 85
}`;
}

export function buildExtractionPrompt(data: InsightData): string {
  return `Extract key data points from the following file and return structured information in JSON format.

File: ${data.filename}
Content:
${data.content}

Return a JSON object with:
{
  "extracted_data": {},
  "data_type": "csv|json|text",
  "row_count": 0,
  "column_count": 0,
  "key_fields": [],
  "summary": "Brief description"
}`;
}