import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

interface RateLimitEntry {
  _id: string;
  ip: string;
  endpoint: string;
  count: number;
  window: Date;
}

export class RateLimitService {
  private static async getDb() {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
    }
    return client.db('rate_limits');
  }

  static async checkLimit(
    ip: string, 
    endpoint: string, 
    maxRequests: number = 20, 
    windowMinutes: number = 1
  ): Promise<{ allowed: boolean; remaining: number; resetTime: Date }> {
    try {
      const db = await this.getDb();
      const limits = db.collection<RateLimitEntry>('requests');
      
      const now = new Date();
      const windowStart = new Date(now.getTime() - (windowMinutes * 60 * 1000));
      const key = `${ip}:${endpoint}`;
      
      // Clean old entries
      await limits.deleteMany({ window: { $lt: windowStart } });
      
      // Get current count
      const current = await limits.findOne({ _id: key, window: { $gte: windowStart } });
      const currentCount = current?.count || 0;
      
      if (currentCount >= maxRequests) {
        const resetTime = new Date(windowStart.getTime() + (windowMinutes * 60 * 1000));
        return { allowed: false, remaining: 0, resetTime };
      }
      
      // Increment counter
      await limits.replaceOne(
        { _id: key },
        {
          ip,
          endpoint,
          count: currentCount + 1,
          window: now
        },
        { upsert: true }
      );
      
      const remaining = Math.max(0, maxRequests - currentCount - 1);
      const resetTime = new Date(now.getTime() + (windowMinutes * 60 * 1000));
      
      return { allowed: true, remaining, resetTime };
      
    } catch (error) {
      console.error('[RATE_LIMIT] Error:', error);
      // Allow request on error to avoid breaking the app
      return { allowed: true, remaining: maxRequests, resetTime: new Date() };
    }
  }
}