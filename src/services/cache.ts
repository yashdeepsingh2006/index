import { MongoClient } from 'mongodb';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI!;
let client: MongoClient | null = null;

interface CacheEntry {
  _id: string;
  hash: string;
  userId?: string;
  result: any;
  createdAt: Date;
  expiresAt: Date;
}

export class CacheService {
  private static async getDb() {
    if (!client) {
      client = new MongoClient(MONGODB_URI);
      await client.connect();
    }
    return client.db('insights_cache');
  }

  static generateHash(content: string, userId?: string): string {
    const data = userId ? `${userId}:${content}` : content;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  static async get(hash: string): Promise<any | null> {
    try {
      const db = await this.getDb();
      const cache = db.collection<CacheEntry>('insights');
      
      const entry = await cache.findOne({ 
        hash, 
        expiresAt: { $gt: new Date() } 
      });
      
      if (entry) {
        console.log(`[CACHE] Hit for hash: ${hash.substring(0, 8)}...`);
        return entry.result;
      }
      
      console.log(`[CACHE] Miss for hash: ${hash.substring(0, 8)}...`);
      return null;
    } catch (error) {
      console.error('[CACHE] Get error:', error);
      return null;
    }
  }

  static async set(hash: string, result: any, userId?: string, ttlHours: number = 24): Promise<void> {
    try {
      const db = await this.getDb();
      const cache = db.collection<CacheEntry>('insights');
      
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + ttlHours);
      
      await cache.replaceOne(
        { hash },
        {
          hash,
          userId,
          result,
          createdAt: new Date(),
          expiresAt
        },
        { upsert: true }
      );
      
      console.log(`[CACHE] Stored hash: ${hash.substring(0, 8)}... for ${ttlHours}h`);
    } catch (error) {
      console.error('[CACHE] Set error:', error);
    }
  }

  static async cleanup(): Promise<void> {
    try {
      const db = await this.getDb();
      const cache = db.collection<CacheEntry>('insights');
      
      const result = await cache.deleteMany({ 
        expiresAt: { $lt: new Date() } 
      });
      
      console.log(`[CACHE] Cleaned up ${result.deletedCount} expired entries`);
    } catch (error) {
      console.error('[CACHE] Cleanup error:', error);
    }
  }
}