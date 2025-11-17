# 🚀 Deployment Guide

Deploy your Magnesium Reminder PWA to make it accessible anywhere!

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Generated the icon PNG files (see QUICKSTART.md)
- ✅ Tested the app locally
- ✅ Committed all changes to git (recommended)

## 🌐 Deployment Options

### Option 1: Heroku (Easiest)

1. **Install Heroku CLI**:
   ```bash
   brew install heroku/brew/heroku
   ```

2. **Login and create app**:
   ```bash
   heroku login
   heroku create magnesium-reminder-yourname
   ```

3. **Add Procfile**:
   Create a file named `Procfile` in project root:
   ```
   web: npm start
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push heroku main
   ```

5. **Open your app**:
   ```bash
   heroku open
   ```

### Option 2: Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "dist/server.js",
         "use": "@vercel/node"
       },
       {
         "src": "public/**",
         "use": "@vercel/static"
       }
     ],
     "routes": [
       {
         "src": "/styles/(.*)",
         "dest": "/public/styles/$1"
       },
       {
         "src": "/(.*\\.(js|css|png|svg|json))",
         "dest": "/public/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/dist/server.js"
       }
     ]
   }
   ```

3. **Build first**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   vercel
   ```

### Option 3: Railway

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login and deploy**:
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set start command in Railway dashboard**:
   - Go to your project settings
   - Set start command: `npm start`

### Option 4: Render

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO
   git push -u origin main
   ```

2. **Connect to Render**:
   - Go to https://render.com
   - Create new Web Service
   - Connect your GitHub repo

3. **Configure**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

### Option 5: DigitalOcean App Platform

1. **Push to GitHub** (see Option 4, step 1)

2. **Create App**:
   - Go to https://cloud.digitalocean.com/apps
   - Create new app from GitHub repo

3. **Configure**:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start`

## 🔒 HTTPS Requirement

**Important**: PWAs and Web Notifications require HTTPS!

- ✅ All the deployment options above provide HTTPS automatically
- ❌ Regular HTTP won't work for notifications on mobile
- ✅ Localhost is exempt (for development)

## 🌍 Custom Domain

### For Heroku:
```bash
heroku domains:add yourdomain.com
```

### For Vercel:
```bash
vercel domains add yourdomain.com
```

Then update your DNS settings:
- Add CNAME record pointing to your deployment URL

## ⚙️ Environment Variables

If needed, set environment variables:

**Heroku**:
```bash
heroku config:set PORT=3000
```

**Vercel**:
```bash
vercel env add PORT
```

**Railway**:
- Add in Railway dashboard under Variables

## 📱 Testing Your Deployment

After deployment:

1. ✅ Open the URL in mobile Safari/Chrome
2. ✅ Check that styles load correctly
3. ✅ Test notification permissions
4. ✅ Try installing as PWA
5. ✅ Verify offline functionality
6. ✅ Test taking magnesium and streak system

## 🐛 Common Issues

### Icons not loading:
- Make sure PNG files are committed to git
- Check `public/` folder is included
- Verify file paths in manifest.json

### Notifications not working:
- Must be HTTPS (not HTTP)
- Check browser supports notifications
- Verify manifest.json is accessible

### Styles not loading:
- Run `npm run build:css` before deploying
- Check `public/styles/output.css` exists
- Ensure build command runs before start

### Service Worker errors:
- Clear browser cache
- Unregister old service workers
- Check HTTPS is enabled

## 📊 Monitoring

### Check if app is running:
```bash
# Heroku
heroku logs --tail

# Vercel
vercel logs

# Railway
railway logs
```

## 🔄 Updating Your App

1. Make changes locally
2. Test with `npm run dev`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Update feature"
   ```
4. Deploy:
   ```bash
   git push heroku main  # or push to GitHub for auto-deploy
   ```

## 💰 Cost

- **Heroku**: Free tier available (sleeps after 30min inactivity)
- **Vercel**: Free tier perfect for this app
- **Railway**: $5/month after free tier
- **Render**: Free tier available
- **DigitalOcean**: $5/month minimum

## 🎉 Share with Your Girlfriend!

Once deployed, share the URL and she can:
1. Open it on her phone
2. Add to home screen
3. Enable notifications
4. Start building her magnesium streak! 💪

---

**Pro Tip**: Send her the link with a cute message! 💕

"Hey babe! 💖 I built you something special to help you remember your magnesium every day! Check it out: [YOUR_URL] ✨"
