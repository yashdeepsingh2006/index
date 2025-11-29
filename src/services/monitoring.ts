import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

interface RequestLog {
  _id?: string;
  timestamp: Date;
  provider: string;
  endpoint: string;
  success: boolean;
  responseTime: number;
  error?: string;
  tokensUsed?: number;
  userId?: string;
}

interface MonitoringStats {
  totalRequests: number;
  successRate: number;
  avgResponseTime: number;
  failureCount: number;
  providerUsage: Record<string, number>;
  recentRequests: RequestLog[];
}

export class MonitoringService {
  private static async getDb() {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
    }
    return client.db('monitoring');
  }

  static async logRequest(log: Omit<RequestLog, 'timestamp'>): Promise<void> {
    try {
      const db = await this.getDb();
      const logs = db.collection<RequestLog>('requests');
      
      await logs.insertOne({
        ...log,
        timestamp: new Date()
      });
      
      console.log(`[MONITOR] Logged ${log.provider} ${log.endpoint} - ${log.success ? 'SUCCESS' : 'FAIL'} (${log.responseTime}ms)`);
    } catch (error) {
      console.error('[MONITOR] Log error:', error);
    }
  }

  static async getStats(hours: number = 24): Promise<MonitoringStats> {
    try {
      const db = await this.getDb();
      const logs = db.collection<RequestLog>('requests');
      
      const since = new Date();
      since.setHours(since.getHours() - hours);
      
      const recentLogs = await logs.find({ 
        timestamp: { $gte: since } 
      }).sort({ timestamp: -1 }).limit(20).toArray();
      
      const totalRequests = await logs.countDocuments({ timestamp: { $gte: since } });
      const successCount = await logs.countDocuments({ 
        timestamp: { $gte: since }, 
        success: true 
      });
      const failureCount = totalRequests - successCount;
      
      // Calculate average response time
      const responseTimes = await logs.find({ 
        timestamp: { $gte: since }, 
        success: true 
      }).toArray();
      
      const avgResponseTime = responseTimes.length > 0 
        ? responseTimes.reduce((sum, log) => sum + log.responseTime, 0) / responseTimes.length
        : 0;
      
      // Provider usage
      const providerAgg = await logs.aggregate([
        { $match: { timestamp: { $gte: since } } },
        { $group: { _id: '$provider', count: { $sum: 1 } } }
      ]).toArray();
      
      const providerUsage: Record<string, number> = {};
      providerAgg.forEach(p => {
        providerUsage[p._id] = p.count;
      });
      
      return {
        totalRequests,
        successRate: totalRequests > 0 ? (successCount / totalRequests) * 100 : 100,
        avgResponseTime: Math.round(avgResponseTime),
        failureCount,
        providerUsage,
        recentRequests: recentLogs
      };
      
    } catch (error) {
      console.error('[MONITOR] Stats error:', error);
      return {
        totalRequests: 0,
        successRate: 0,
        avgResponseTime: 0,
        failureCount: 0,
        providerUsage: {},
        recentRequests: []
      };
    }
  }

  static async cleanup(daysToKeep: number = 30): Promise<void> {
    try {
      const db = await this.getDb();
      const logs = db.collection<RequestLog>('requests');
      
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - daysToKeep);
      
      const result = await logs.deleteMany({ 
        timestamp: { $lt: cutoff } 
      });
      
      console.log(`[MONITOR] Cleaned up ${result.deletedCount} old logs`);
    } catch (error) {
      console.error('[MONITOR] Cleanup error:', error);
    }
  }
}