export interface DataSummary {
  totalRows: number;
  columns: ColumnInfo[];
  numericSummaries: Record<string, NumericSummary>;
  categoricalSummaries: Record<string, CategoricalSummary>;
  dateSummaries: Record<string, DateSummary>;
}

export interface ColumnInfo {
  name: string;
  type: 'numeric' | 'categorical' | 'date' | 'unknown';
  sampleValues: string[];
}

export interface NumericSummary {
  sum: number;
  avg: number;
  min: number;
  max: number;
  count: number;
}

export interface CategoricalSummary {
  topCategories: Array<{ value: string; count: number }>;
  bottomCategories: Array<{ value: string; count: number }>;
  uniqueCount: number;
  totalCount: number;
}

export interface DateSummary {
  earliest: string;
  latest: string;
  count: number;
}

export interface InsightResponse {
  "What happened": string;
  "Why it happened": string;
  "Action to take next": string;
  "Key metric numbers": string;
  "Suggested chart type": string;
}