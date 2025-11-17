# ✨ Magnesium Magic - Daily Reminder PWA ✨

A super cute and girly Progressive Web App to remind your girlfriend to take her magnesium daily! Features a fun streak system, customizable reminders, and adorable animations.

## 🌟 Features

- 💊 **Daily Reminders** - Set a custom time for daily notifications
- 🔥 **Streak System** - Track consecutive days and maintain motivation
- 🎉 **Fun Animations** - Celebration effects when marking magnesium as taken
- 📊 **Statistics** - View total days and best streak
- 📱 **PWA Support** - Install on phone/desktop, works offline
- 💖 **Cute Design** - Pink and purple gradient theme with fun emojis
- ⏰ **Smart Cooldown** - Can only mark as taken once per day

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate icon files:**
   ```bash
   node generate-icons.js
   ```

   Then convert the SVG files to PNG (required for PWA):
   ```bash
   # Option 1: Using ImageMagick (recommended)
   brew install imagemagick
   convert public/icon-192.svg public/icon-192.png
   convert public/icon-512.svg public/icon-512.png

   # Option 2: Use an online converter
   # Upload public/icon-192.svg and public/icon-512.svg to
   # https://cloudconvert.com/svg-to-png
   # Download and place in public/ folder
   ```

   **Or create custom icons:**
   - Create `public/icon-192.png` (192x192 pixels)
   - Create `public/icon-512.png` (512x512 pixels)
   - Use pink/purple theme with a cute pill or magnesium design

3. **Build and start the app:**
   ```bash
   npm start
   ```

4. **For development with auto-reload:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📱 Installing as PWA

### On iPhone/iPad:
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

### On Android:
1. Open the app in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home Screen" or "Install App"
4. Tap "Install"

### On Desktop (Chrome/Edge):
1. Click the install icon in the address bar
2. Click "Install"

## 🔔 Enabling Notifications

1. Click the "Enable notifications 🔔" button in the app
2. Allow notification permissions when prompted
3. Set your preferred reminder time
4. Click "Save 💝"

Notifications will appear even when the app is closed!

## 🎮 How to Use

1. **Set Reminder Time**: Choose when you want to be reminded daily
2. **Enable Notifications**: Click the notification button and allow permissions
3. **Take Magnesium**: Press the big cute button when you take your magnesium
4. **Watch the Magic**: Enjoy hearts and confetti celebrations!
5. **Build Your Streak**: Take it daily to build an amazing streak! 🔥

## 📊 Streak System

- ✨ Take magnesium daily to build your streak
- 🏆 Track your best streak ever
- 📈 View total days taken
- 💔 Streak resets if you skip a day
- 🎉 Celebrate milestones with special animations!

## 🎨 Customization

### Changing Colors:
Edit `tailwind.config.js` to modify the pink and purple color schemes.

### Changing Reminder Messages:
Edit the `messages` array in `public/app.js` in the `showNotification()` method.

### Modifying Animations:
Customize animations in `src/styles/input.css`.

## 🛠 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express, TypeScript
- **PWA**: Service Workers, Web App Manifest
- **Notifications**: Web Notifications API
- **Storage**: LocalStorage for data persistence

## 📂 Project Structure

```
magnesium-reminder-pwa/
├── public/               # Static files served to browser
│   ├── index.html       # Main HTML file
│   ├── app.js           # Client-side JavaScript
│   ├── service-worker.js # PWA service worker
│   ├── manifest.json    # PWA manifest
│   ├── icon-192.png     # App icon (192x192)
│   ├── icon-512.png     # App icon (512x512)
│   └── styles/
│       └── output.css   # Compiled Tailwind CSS
├── src/
│   ├── server.ts        # Express server
│   └── styles/
│       └── input.css    # Tailwind source
├── dist/                # Compiled TypeScript
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

## 🐛 Troubleshooting

### Notifications not working:
- Make sure you clicked "Allow" when prompted
- Check browser notification settings
- On iOS, notifications only work when app is added to home screen
- Some browsers block notifications in incognito mode

### PWA not installing:
- Make sure you're using HTTPS (or localhost)
- Verify icon files exist in `public/` folder
- Check browser console for errors

### Styles not loading:
- Run `npm run build:css` to compile Tailwind
- Check that `public/styles/output.css` exists

## 💝 Made with Love

This app was created with love to help maintain healthy habits in the cutest way possible!

---

**Note**: Remember to take your magnesium daily! Your body (and your streak) will thank you! 💊✨
