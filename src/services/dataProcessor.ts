import * as XLSX from 'xlsx';
import type { DataSummary, ColumnInfo, NumericSummary, CategoricalSummary, DateSummary } from '../types/insight';

export class DataProcessor {
  static async processFile(buffer: Buffer, filename: string): Promise<DataSummary> {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    if (!data || data.length === 0) {
      throw new Error('No data found in file');
    }

    const totalRows = data.length;
    const columns = DataProcessor.analyzeColumns(data);
    
    return {
      totalRows,
      columns,
      numericSummaries: DataProcessor.calculateNumericSummaries(data, columns),
      categoricalSummaries: DataProcessor.calculateCategoricalSummaries(data, columns),
      dateSummaries: DataProcessor.calculateDateSummaries(data, columns)
    };
  }

  private static analyzeColumns(data: any[]): ColumnInfo[] {
    const sampleRow = data[0];
    const columns: ColumnInfo[] = [];

    for (const [key, value] of Object.entries(sampleRow)) {
      const sampleValues = data.slice(0, 5).map(row => String(row[key] || '')).filter(v => v);
      
      columns.push({
        name: key,
        type: DataProcessor.detectColumnType(data, key),
        sampleValues
      });
    }

    return columns;
  }

  private static detectColumnType(data: any[], columnName: string): 'numeric' | 'categorical' | 'date' | 'unknown' {
    const values = data.map(row => row[columnName]).filter(v => v !== null && v !== undefined && v !== '');
    
    if (values.length === 0) return 'unknown';

    // Check for dates
    const dateCount = values.filter(v => DataProcessor.isDate(v)).length;
    if (dateCount / values.length > 0.7) return 'date';

    // Check for numbers
    const numericCount = values.filter(v => DataProcessor.isNumeric(v)).length;
    if (numericCount / values.length > 0.7) return 'numeric';

    // Default to categorical
    return 'categorical';
  }

  private static isNumeric(value: any): boolean {
    if (typeof value === 'number') return true;
    if (typeof value === 'string') {
      const cleaned = value.replace(/[$,\s%]/g, '');
      return !isNaN(parseFloat(cleaned)) && isFinite(parseFloat(cleaned));
    }
    return false;
  }

  private static isDate(value: any): boolean {
    if (value instanceof Date) return true;
    if (typeof value === 'string') {
      const date = new Date(value);
      return !isNaN(date.getTime()) && Boolean(value.match(/\d{4}|\/|\-/));
    }
    return false;
  }

  private static parseNumber(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const cleaned = value.replace(/[$,\s%]/g, '');
      return parseFloat(cleaned);
    }
    return 0;
  }

  private static calculateNumericSummaries(data: any[], columns: ColumnInfo[]): Record<string, NumericSummary> {
    const summaries: Record<string, NumericSummary> = {};

    columns
      .filter(col => col.type === 'numeric')
      .forEach(col => {
        const values = data
          .map(row => DataProcessor.parseNumber(row[col.name]))
          .filter(v => !isNaN(v));

        if (values.length > 0) {
          summaries[col.name] = {
            sum: values.reduce((a, b) => a + b, 0),
            avg: values.reduce((a, b) => a + b, 0) / values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            count: values.length
          };
        }
      });

    return summaries;
  }

  private static calculateCategoricalSummaries(data: any[], columns: ColumnInfo[]): Record<string, CategoricalSummary> {
    const summaries: Record<string, CategoricalSummary> = {};

    columns
      .filter(col => col.type === 'categorical')
      .forEach(col => {
        const values = data
          .map(row => String(row[col.name] || ''))
          .filter(v => v);

        const counts = values.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

        summaries[col.name] = {
          topCategories: sorted.slice(0, 5).map(([value, count]) => ({ value, count })),
          bottomCategories: sorted.slice(-3).map(([value, count]) => ({ value, count })),
          uniqueCount: Object.keys(counts).length,
          totalCount: values.length
        };
      });

    return summaries;
  }

  private static calculateDateSummaries(data: any[], columns: ColumnInfo[]): Record<string, DateSummary> {
    const summaries: Record<string, DateSummary> = {};

    columns
      .filter(col => col.type === 'date')
      .forEach(col => {
        const dates = data
          .map(row => new Date(row[col.name]))
          .filter(d => !isNaN(d.getTime()));

        if (dates.length > 0) {
          summaries[col.name] = {
            earliest: new Date(Math.min(...dates.map(d => d.getTime()))).toISOString().split('T')[0],
            latest: new Date(Math.max(...dates.map(d => d.getTime()))).toISOString().split('T')[0],
            count: dates.length
          };
        }
      });

    return summaries;
  }
}