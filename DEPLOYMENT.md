# Deployment Guide

## Quick Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **Before deploying:** Add environment variables:
     - Go to Settings → Environment Variables
     - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

## What Makes This Vercel-Ready?

✅ **MongoDB Atlas**: Cloud database with persistent storage  
✅ **Serverless Functions**: All API routes work with Vercel's serverless architecture  
✅ **Environment Variables**: Secure configuration management  
✅ **Optimized Build**: Next.js 16 with proper configuration  

## Post-Deployment

- Your app will be available at `https://your-project-name.vercel.app`
- Data resets on each deployment (by design for demo purposes)
- Automatic HTTPS and global CDN included
- Zero configuration required

## Troubleshooting

If you encounter issues:

1. **Build Errors**: Run `npm run build` locally first
2. **API Issues**: Check Vercel function logs in dashboard
3. **Styling Issues**: Ensure Tailwind CSS is properly configured

## Environment Variables

**Required for MongoDB connection:**

1. **Get MongoDB Atlas URI:**
   - Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create a free cluster
   - Get connection string (replace `<password>` with your actual password)

2. **Add to Vercel:**
   - Project Settings → Environment Variables
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority`