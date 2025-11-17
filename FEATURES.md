# ✨ Features Guide ✨

## 🎀 Cute Design Features

### Color Scheme
- **Primary**: Pink gradient (#ff69ab to #ff3d8b)
- **Secondary**: Purple gradient (#a855f7 to #7e22ce)
- **Background**: Soft pink-purple gradient
- **Glass morphism** cards with backdrop blur

### Animations
- **Bounce**: Streak counter bounces continuously
- **Wiggle**: Fire emoji wiggles on streak display
- **Sparkle**: Pill emojis sparkle on the main button
- **Pulse**: Title and heart animations
- **Hearts**: Float up when magnesium is taken
- **Confetti**: Colorful confetti celebration

### Emojis Used
- 💊 Pill (main icon)
- ✨ Sparkles (magic theme)
- 🔥 Fire (streak indicator)
- 💖💕💗💓💝 Hearts (celebrations)
- ⏰ Alarm clock (reminder time)
- 🔔 Bell (notifications)
- 📊 Chart (statistics)
- 🏆 Trophy (best streak)
- 🎉 Party (celebrations)

## 📱 PWA Features

### Offline Support
- Service worker caches all assets
- Works without internet connection
- Auto-updates when online

### Install to Home Screen
- Custom app icon
- Standalone app experience
- No browser UI

### App Manifest
- Pink theme color
- Custom name and description
- Portrait orientation optimized

## 🔔 Notification Features

### Smart Notifications
- Daily reminders at custom time
- Only reminds if not taken yet
- Cute random messages
- Persistent notifications (require interaction)
- Vibration pattern: [200ms, 100ms, 200ms]

### Notification Messages (Random)
1. "Time for your magnesium! 💊✨"
2. "Don't forget your magnesium, sweetie! 💖"
3. "Magnesium time! Let's keep that streak going! 🔥"
4. "Your daily dose of wellness awaits! ✨💕"
5. "Remember to take your magnesium! 💊💝"

## 🔥 Streak System

### How It Works
- **New streak**: Starts at 1 when you take magnesium
- **Continues**: +1 for each consecutive day
- **Breaks**: Resets to 0 if you skip a day
- **Best streak**: Automatically tracks your longest streak

### Streak Rules
- Can only mark as taken once per day
- Must take every day to maintain streak
- Missing one day breaks the streak
- Cooldown system prevents double-counting

## 🎉 Celebration System

### When You Take Magnesium
1. **Hearts Animation**: 10 hearts float upward
2. **Confetti**: 50 pieces of colorful confetti fall
3. **Button Disabled**: Prevents taking twice in one day
4. **Green Success Message**: "Already taken today! See you tomorrow!"
5. **Streak Update**: Counter updates with animation

### Celebration Messages (Random)
1. "Amazing! You're taking care of yourself! 💖"
2. "Yay! Another day of wellness! ✨"
3. "You're doing great, sweetie! 💕"
4. "Keep up the fantastic work! 🌟"
5. "Your body will thank you! 💪"
6. "X days in a row! You're unstoppable! 🔥"

## 📊 Statistics Tracking

### Tracked Metrics
- **Current Streak**: Days in a row
- **Total Days**: All-time count
- **Best Streak**: Highest streak achieved
- **Last Taken**: Date of last dose

### Data Persistence
- All data stored in browser LocalStorage
- Survives app restarts
- Tied to browser/device
- Private and local (not sent anywhere)

## ⏰ Reminder Customization

### Time Settings
- 24-hour time picker
- Default: 9:00 AM
- Saved automatically
- Reschedules notifications immediately

### Smart Scheduling
- Checks if already taken today
- Skips notification if taken
- Auto-reschedules for next day
- Handles timezone automatically

## 🎨 UI Components

### Main Button
- Large, tappable target
- Gradient background
- Hover effect (scales up)
- Active effect (scales down)
- Disabled state when taken

### Glass Cards
- Translucent white background
- Backdrop blur effect
- Subtle borders
- Rounded corners (3xl = 24px)

### Stats Cards
- Two-column grid
- Icon + number + label
- Glass morphism style
- Responsive design

## 💾 Data Storage

### LocalStorage Keys
- `magnesium_streak`: Current streak count
- `magnesium_last_taken`: ISO date string
- `magnesium_total_taken`: Total days count
- `magnesium_best_streak`: Best streak ever
- `magnesium_reminder_time`: Notification time (HH:MM)
- `magnesium_notifications_enabled`: Boolean flag

## 🔒 Privacy & Security

- ✅ No server-side data storage
- ✅ No analytics or tracking
- ✅ No personal data collected
- ✅ All data stays on device
- ✅ No external API calls
- ✅ Works completely offline

## 📱 Responsive Design

- **Mobile**: Optimized for portrait mode
- **Tablet**: Centered with max-width
- **Desktop**: Beautiful centered layout
- **Max-width**: 28rem (448px)
- **Padding**: Responsive 4/8 spacing

## 🎯 User Experience

### Feedback Mechanisms
- Visual animations on actions
- Button state changes
- Success messages
- Disabled states
- Loading indicators (via animations)

### Accessibility
- High contrast colors
- Large touch targets
- Clear labels
- Emoji for visual appeal
- Readable font sizes

---

**Made with 💖 for daily wellness!**
