# 🚀 Deployment Guide - GitHub & Vercel

## 📋 Prerequisites

1. **GitHub Account**: https://github.com/mejuryrachy784
2. **Vercel Account**: https://vercel.com (sign up with GitHub)
3. **MongoDB Atlas**: Your database is already set up

## 🔧 Step 1: Push to GitHub

### Create Repository on GitHub
1. Go to https://github.com/mejuryrachy784
2. Click "New repository"
3. Repository name: `driving-license-quiz`
4. Description: `Driving License Quiz App with Voice Support`
5. Make it **Public**
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Push Code
```powershell
# In your project directory
git remote set-url origin https://github.com/mejuryrachy784/driving-license-quiz.git
git push -u origin main
```

## 🌐 Step 2: Deploy Frontend to Vercel

### Option A: Deploy via Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import from GitHub: `mejuryrachy784/driving-license-quiz`
4. **Framework Preset**: Vite
5. **Root Directory**: Leave as `.` (root)
6. **Build Command**: `npm run build`
7. **Output Directory**: `dist`
8. Click "Deploy"

### Option B: Deploy via Vercel CLI
```powershell
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🔧 Step 3: Deploy Backend to Vercel (Serverless)

### Create Separate Backend Deployment
1. In Vercel Dashboard, click "New Project"
2. Import the same repository: `mejuryrachy784/driving-license-quiz`
3. **Framework Preset**: Other
4. **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Output Directory**: Leave empty
7. Add Environment Variables:
   - `MONGO_URI`: `mongodb+srv://mejuryzvarevashe7:mejury12345@choice.y6eq3bc.mongodb.net/choice?retryWrites=true&w=majority`
   - `JWT_SECRET`: `privilast1`
   - `ADMIN_SECRET`: `Assa1andonly`
   - `NODE_ENV`: `production`
8. Click "Deploy"

## 🔗 Step 4: Update Frontend URLs

After backend deployment, update the frontend to use the production backend URL:

1. Get your backend Vercel URL (e.g., `https://your-backend.vercel.app`)
2. Update the BASE_URL in your frontend components
3. Redeploy frontend

## 📝 Environment Variables for Vercel

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend.vercel.app
```

### Backend Environment Variables
```
MONGO_URI=mongodb+srv://mejuryzvarevashe7:mejury12345@choice.y6eq3bc.mongodb.net/choice?retryWrites=true&w=majority
JWT_SECRET=privilast1
ADMIN_SECRET=Assa1andonly
NODE_ENV=production
```

## 🎯 Expected URLs

After deployment, you'll have:
- **Frontend**: https://driving-license-quiz.vercel.app
- **Backend**: https://driving-license-quiz-backend.vercel.app

## 🔧 Troubleshooting Deployment

### Common Issues

1. **Build Fails**
   - Check package.json dependencies
   - Ensure all imports are correct
   - Check for TypeScript errors

2. **Backend API Not Working**
   - Verify environment variables in Vercel
   - Check MongoDB connection string
   - Ensure CORS includes production URLs

3. **Frontend Can't Connect to Backend**
   - Update API URLs in frontend
   - Check CORS configuration
   - Verify backend is deployed and running

### Debug Commands
```powershell
# Test local build
npm run build
npm run preview

# Check backend locally
cd backend
node server.js
```

## 🔄 Continuous Deployment

Once connected to GitHub:
1. Every push to `main` branch auto-deploys
2. Pull requests create preview deployments
3. Environment variables persist across deployments

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function performance
- Check error rates

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View connection logs

## 🎉 Success Checklist

✅ Repository created on GitHub
✅ Code pushed to GitHub
✅ Frontend deployed to Vercel
✅ Backend deployed to Vercel
✅ Environment variables configured
✅ Database connection working
✅ Frontend can connect to backend API
✅ Login/signup functionality working
✅ Voice features working in production

## 🔗 Useful Links

- **GitHub Repo**: https://github.com/mejuryrachy784/driving-license-quiz
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Domain Management**: Vercel Dashboard → Domains

---

**Happy Deploying! 🚀🌐**