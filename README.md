# AI-Powered Enterprise Data Analytics Platform

A production-ready Next.js application with advanced AI provider switching, comprehensive caching, rate limiting, monitoring, and fallback systems. Upload data files, get AI-powered insights, and interact with your data through an intelligent chat interface.

## 🚀 Key Features

### 🔄 **Dual AI Provider System**
- **Groq** (Llama 3.3-70B) and **Gemini 2.5 Flash** integration
- **Automatic failover** - If one provider fails, seamlessly switches to the other
- **Admin panel** for real-time provider switching
- **Production reliability** with retries, timeouts, and graceful degradation

### ⚡ **Enterprise-Grade Performance**
- **MongoDB-based caching** - Prevents expensive duplicate AI calls
- **Hash-based cache keys** - Same file content = instant results
- **User-specific caching** - Per-user cache isolation
- **24-hour TTL** with automatic cleanup

### 🛡️ **Production Security & Reliability**
- **Rate limiting** - Per IP, per endpoint protection
- **Smart limits**: Chat (30/min), Upload (5/min), Data Extraction (10/min)
- **Feature flags** - Toggle features on/off without deployment
- **Real-time monitoring** dashboard with success rates and performance metrics

### 🧠 **Advanced AI Capabilities**
- **Structured data insights** generation
- **Interactive chat** with your data using RAG
- **Data extraction** and analysis
- **Isolated prompt templates** for maintainable AI interactions
- **JSON validation** and response normalization

### 📊 **Data Processing**
- **Multi-format support**: CSV, Excel, JSON
- **Interactive visualizations** with Chart.js
- **Real-time data analysis** and insights
- **Export capabilities**

## 🛠️ Tech Stack

**Core Framework:**
- **Next.js 15.3.4** - React framework with API routes
- **TypeScript** - Type-safe development
- **TailwindCSS** - Modern styling

**AI & Analytics:**
- **Groq SDK** - Llama 3.3-70B integration
- **Google Generative AI** - Gemini 2.5 Flash
- **Custom LLM dispatcher** - Unified AI interface

**Database & Caching:**
- **MongoDB Atlas** - Production database
- **Hash-based caching** - Performance optimization
- **Rate limiting storage** - Abuse prevention

**Authentication & Security:**
- **NextAuth.js** - Google OAuth integration
- **Admin authentication** - Secure provider management
- **Session management**

**Monitoring & Reliability:**
- **Real-time monitoring** - Request tracking and metrics
- **Feature flags system** - Live feature control
- **Automatic failover** - Multi-provider reliability

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google AI Studio API key
- Groq API key
- Google OAuth credentials

### 1. Clone & Install
```bash
git clone <repository-url>
cd index
npm install
```

### 2. Environment Configuration

Create `.env.local`:
```env
# AI Provider Configuration
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key

# MongoDB Configuration (Required for production features)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_ga_tracking_id
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access the Application
- **Main App**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/direct/admin/provider
- **Monitoring Dashboard**: http://localhost:3000/direct/admin/monitoring

## 🏗️ Production Architecture

### System Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Rate Limiter  │ -> │   LLM Dispatcher │ -> │  Cache Service  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                      ┌─────────┴─────────┐
                      │                   │
                ┌─────────────┐    ┌─────────────┐
                │ Groq Provider│    │Gemini Provider│
                │(Llama 3.3)  │    │(Gemini 2.5) │
                └─────────────┘    └─────────────┘
```

### Core Services

**`/services/llm.ts`** - Unified LLM dispatcher with fallback logic
**`/services/cache.ts`** - MongoDB-based caching system
**`/services/rateLimit.ts`** - IP-based rate limiting
**`/services/monitoring.ts`** - Performance and usage tracking
**`/services/featureFlags.ts`** - Live feature control
**`/prompts/`** - Isolated prompt templates

### API Endpoints

#### **Core Data Processing**
- `POST /api/upload` - File upload with AI insights generation
- `POST /api/ai/chat` - Interactive data chat
- `POST /api/ai/extractData` - Data extraction and analysis

#### **Admin Management**
- `GET/POST /api/admin/provider` - AI provider switching
- `GET/POST /api/admin/features` - Feature flag management  
- `GET /api/admin/monitoring` - System metrics and logs

## 🚀 Production Features

### 1. **Hash-Based Caching**
```javascript
// Automatic cache for identical requests
const cacheKey = CacheService.generateHash(fileContent, userId);
const cached = await CacheService.get(cacheKey);
if (cached) return cached; // Instant response
```

### 2. **Rate Limiting**
```javascript
// Per-endpoint limits
const limits = {
  '/api/ai/chat': { maxRequests: 30, windowMinutes: 1 },
  '/api/upload': { maxRequests: 5, windowMinutes: 1 }
};
```

### 3. **Fallback Strategy**
```javascript
// Automatic provider switching
if (groq_fails) {
  try_gemini();
  if (both_fail) {
    return "AI temporarily unavailable. Try again in 10-20 seconds.";
  }
}
```

### 4. **Feature Flags**
```javascript
// Live feature control
const isEnabled = await FeatureFlagsService.isEnabled('useInsights');
if (!isEnabled) throw new Error('Feature temporarily disabled');
```

## 📊 Admin Dashboard Features

### Monitoring Dashboard (`/direct/admin/monitoring`)
- **Real-time metrics**: Success rate, response time, request count
- **Provider usage**: Groq vs Gemini performance comparison
- **Recent requests**: Last 20 requests with full details
- **Feature flags**: Live toggle switches for all features

### Provider Management (`/direct/admin/provider`)
- **Live provider switching**: Groq ↔ Gemini
- **Provider status monitoring**
- **Configuration management**

## 🔧 Configuration

### Rate Limits (Customizable)
```typescript
const RATE_LIMITS = {
  '/api/ai/chat': { maxRequests: 30, windowMinutes: 1 },
  '/api/ai/extractData': { maxRequests: 10, windowMinutes: 1 },
  '/api/upload': { maxRequests: 5, windowMinutes: 1 }
};
```

### Cache Settings
```typescript
// Default cache TTL: 24 hours
await CacheService.set(key, result, userId, 24);
```

### Feature Flags
```typescript
{
  useInsights: true,    // Data insights generation
  useChat: true,        // Interactive chat
  useExtraction: true,  // Data extraction
  useCache: true,       // Performance caching
  useRateLimit: true    // Rate limiting protection
}
```

## 🚨 Production Reliability

### Error Handling
- **Graceful degradation**: System continues working if one provider fails
- **Fallback messages**: User-friendly responses instead of crashes
- **Comprehensive logging**: Full request/response tracking
- **Monitoring alerts**: Real-time failure detection

### Performance Optimization
- **Caching prevents redundant AI calls** (saves $$$ on API costs)
- **Rate limiting prevents server overload**
- **Connection pooling** for MongoDB
- **Timeout management** (12-second limits)

## 🐛 Troubleshooting

### Common Issues

**AI Provider Failures:**
- Check `/direct/admin/monitoring` for provider status
- Switch providers via admin panel if needed
- Both providers failing = quota/API key issues

**Caching Issues:**
- Verify MongoDB connection in logs
- Check cache hit/miss rates in monitoring
- Clear expired cache: `MonitoringService.cleanup()`

**Rate Limit Blocks:**
- Adjust limits in `/services/rateLimit.ts`
- Check IP whitelisting needs
- Monitor usage patterns in admin dashboard

## 🔗 Production Deployment

### Build & Deploy
```bash
npm run build
npm start
```

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...  # Required for all production features
GROQ_API_KEY=...               # Groq provider
GEMINI_API_KEY=...             # Gemini provider
NEXTAUTH_URL=https://yourdomain.com
```

### Monitoring Setup
- **MongoDB Atlas**: Database monitoring
- **Vercel Analytics**: Frontend performance
- **Custom monitoring**: `/direct/admin/monitoring`

## 🙏 Acknowledgments

- **Groq** - Fast LLM inference
- **Google AI** - Gemini model access
- **MongoDB Atlas** - Reliable database hosting
- **Vercel** - Seamless deployment platform

---

**🎉 Production-Ready AI Analytics Platform**

Built for enterprise use with reliability, monitoring, and performance optimization as core principles.