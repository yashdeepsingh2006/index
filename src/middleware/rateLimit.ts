import { NextRequest, NextResponse } from 'next/server';
import { RateLimitService } from '../services/rateLimit';
import { FeatureFlagsService } from '../services/featureFlags';

interface RateLimitConfig {
  maxRequests: number;
  windowMinutes: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/ai/chat': { maxRequests: 30, windowMinutes: 1 },
  '/api/ai/extractData': { maxRequests: 10, windowMinutes: 1 },
  '/api/upload': { maxRequests: 5, windowMinutes: 1 },
  'default': { maxRequests: 20, windowMinutes: 1 }
};

export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const isRateLimitEnabled = await FeatureFlagsService.isEnabled('useRateLimit');
  
  if (!isRateLimitEnabled) {
    return handler();
  }
  
  const ip = getClientIP(request);
  const endpoint = getEndpointPath(request.url);
  
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS.default;
  
  const result = await RateLimitService.checkLimit(
    ip,
    endpoint,
    config.maxRequests,
    config.windowMinutes
  );
  
  if (!result.allowed) {
    console.log(`[RATE_LIMIT] Blocked request from ${ip} to ${endpoint}`);
    
    return NextResponse.json(
      { 
        error: 'Rate limit exceeded', 
        message: `Too many requests. Try again after ${result.resetTime.toISOString()}`,
        resetTime: result.resetTime.toISOString()
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': config.maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.resetTime.getTime().toString()
        }
      }
    );
  }
  
  const response = await handler();
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set('X-RateLimit-Reset', result.resetTime.getTime().toString());
  
  return response;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback for development/localhost
  return '127.0.0.1';
}

function getEndpointPath(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch {
    return 'unknown';
  }
}