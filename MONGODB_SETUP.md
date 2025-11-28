# MongoDB Atlas Setup Guide

## Quick Setup for Provider Settings Storage

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox - Free tier)

### 2. Set Up Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create username and password
5. Set privileges to "Atlas Admin" or "Read and write to any database"

### 3. Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Add Current IP Address" or "Allow Access from Anywhere" (for production, use specific IPs)

### 4. Get Connection String
1. Go to "Clusters" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string

### 5. Update Environment Variables
Replace the placeholder in your `.env.local`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ai-provider-settings?retryWrites=true&w=majority
```

Example:
```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/ai-provider-settings?retryWrites=true&w=majority
```

### 6. Production Deployment
For production (Vercel, Netlify, etc.):
1. Add the same `MONGODB_URI` environment variable in your deployment platform
2. The app will automatically use MongoDB in production
3. Fallback to file system in development if MongoDB is not available

### Database Structure
The app will automatically create:
- Database: `ai-provider-settings` (or whatever you specify in the URI)
- Collection: `provider_settings`
- Document ID: `active_provider_config`

### Benefits
- ✅ Works in serverless environments
- ✅ Persistent across deployments
- ✅ Automatic fallback to file system in development
- ✅ No file system permissions issues
- ✅ Scalable and reliable
- ✅ Free tier available