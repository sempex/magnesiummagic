// Magnesium Reminder App - Main Application Logic

class MagnesiumReminder {
  constructor() {
    this.storageKeys = {
      streak: 'magnesium_streak',
      lastTaken: 'magnesium_last_taken',
      totalTaken: 'magnesium_total_taken',
      bestStreak: 'magnesium_best_streak',
      reminderTime: 'magnesium_reminder_time',
      notificationsEnabled: 'magnesium_notifications_enabled'
    };

    this.elements = {};
    this.notificationPermission = 'default';

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.cacheElements();
    this.registerServiceWorker();
    this.loadData();
    this.updateUI();
    this.attachEventListeners();
    this.checkNotificationPermission();
    this.scheduleNotification();
  }

  cacheElements() {
    this.elements = {
      streakCount: document.getElementById('streakCount'),
      lastTaken: document.getElementById('lastTaken'),
      totalTaken: document.getElementById('totalTaken'),
      bestStreak: document.getElementById('bestStreak'),
      takeMagnesiumBtn: document.getElementById('takeMagnesiumBtn'),
      cooldownMessage: document.getElementById('cooldownMessage'),
      buttonContainer: document.getElementById('buttonContainer'),
      reminderTime: document.getElementById('reminderTime'),
      saveTimeBtn: document.getElementById('saveTimeBtn'),
      enableNotificationsBtn: document.getElementById('enableNotificationsBtn'),
      notificationStatus: document.getElementById('notificationStatus')
    };
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  loadData() {
    this.data = {
      streak: parseInt(localStorage.getItem(this.storageKeys.streak)) || 0,
      lastTaken: localStorage.getItem(this.storageKeys.lastTaken) || null,
      totalTaken: parseInt(localStorage.getItem(this.storageKeys.totalTaken)) || 0,
      bestStreak: parseInt(localStorage.getItem(this.storageKeys.bestStreak)) || 0,
      reminderTime: localStorage.getItem(this.storageKeys.reminderTime) || '09:00',
      notificationsEnabled: localStorage.getItem(this.storageKeys.notificationsEnabled) === 'true'
    };

    // Check if streak should be reset
    this.updateStreak();
  }

  saveData() {
    localStorage.setItem(this.storageKeys.streak, this.data.streak.toString());
    localStorage.setItem(this.storageKeys.lastTaken, this.data.lastTaken);
    localStorage.setItem(this.storageKeys.totalTaken, this.data.totalTaken.toString());
    localStorage.setItem(this.storageKeys.bestStreak, this.data.bestStreak.toString());
    localStorage.setItem(this.storageKeys.reminderTime, this.data.reminderTime);
    localStorage.setItem(this.storageKeys.notificationsEnabled, this.data.notificationsEnabled.toString());
  }

  updateStreak() {
    if (!this.data.lastTaken) return;

    const lastTakenDate = new Date(this.data.lastTaken);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset time parts for comparison
    lastTakenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);

    const lastTakenTime = lastTakenDate.getTime();
    const todayTime = today.getTime();
    const yesterdayTime = yesterday.getTime();

    if (lastTakenTime < yesterdayTime) {
      // Streak broken - last taken was before yesterday
      this.data.streak = 0;
    }
  }

  updateUI() {
    // Update streak display
    this.elements.streakCount.textContent = this.data.streak;

    // Update last taken display
    if (this.data.lastTaken) {
      const lastDate = new Date(this.data.lastTaken);
      const today = new Date();

      if (this.isSameDay(lastDate, today)) {
        this.elements.lastTaken.textContent = '✨ Taken today! ✨';
        this.showCooldown();
      } else {
        this.elements.lastTaken.textContent = `Last taken: ${this.formatDate(lastDate)}`;
        this.hideCooldown();
      }
    } else {
      this.elements.lastTaken.textContent = 'Never taken yet - start your streak! 💪';
    }

    // Update stats
    this.elements.totalTaken.textContent = this.data.totalTaken;
    this.elements.bestStreak.textContent = this.data.bestStreak;

    // Update time input
    this.elements.reminderTime.value = this.data.reminderTime;
  }

  isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  showCooldown() {
    this.elements.takeMagnesiumBtn.disabled = true;
    this.elements.takeMagnesiumBtn.classList.add('opacity-50', 'cursor-not-allowed');
    this.elements.cooldownMessage.classList.remove('hidden');
  }

  hideCooldown() {
    this.elements.takeMagnesiumBtn.disabled = false;
    this.elements.takeMagnesiumBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    this.elements.cooldownMessage.classList.add('hidden');
  }

  attachEventListeners() {
    this.elements.takeMagnesiumBtn.addEventListener('click', () => this.takeMagnesium());
    this.elements.saveTimeBtn.addEventListener('click', () => this.saveReminderTime());
    this.elements.enableNotificationsBtn.addEventListener('click', () => this.requestNotificationPermission());
  }

  async takeMagnesium() {
    const today = new Date();

    // Check if already taken today
    if (this.data.lastTaken && this.isSameDay(new Date(this.data.lastTaken), today)) {
      return; // Already taken today
    }

    // Update streak
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (this.data.lastTaken && this.isSameDay(new Date(this.data.lastTaken), yesterday)) {
      // Consecutive day - increment streak
      this.data.streak++;
    } else {
      // First time or streak broken - start new streak
      this.data.streak = 1;
    }

    // Update other stats
    this.data.lastTaken = today.toISOString();
    this.data.totalTaken++;

    if (this.data.streak > this.data.bestStreak) {
      this.data.bestStreak = this.data.streak;
    }

    // Save and update UI
    this.saveData();
    this.updateUI();

    // Celebrate!
    this.celebrate();
  }

  celebrate() {
    // Create hearts animation
    this.createHeartsAnimation();

    // Create confetti
    this.createConfetti();

    // Play a fun message
    this.showCelebrationMessage();
  }

  createHeartsAnimation() {
    const hearts = ['💖', '💕', '💗', '💓', '💝'];
    const container = this.elements.buttonContainer;

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'hearts-animation text-4xl';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = '50%';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
      }, i * 100);
    }
  }

  createConfetti() {
    const colors = ['#ff69ab', '#a855f7', '#fbbf24', '#34d399', '#60a5fa'];

    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '0';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
      }, i * 30);
    }
  }

  showCelebrationMessage() {
    const messages = [
      "Amazing! You're taking care of yourself! 💖",
      "Yay! Another day of wellness! ✨",
      "You're doing great, sweetie! 💕",
      "Keep up the fantastic work! 🌟",
      "Your body will thank you! 💪",
      `${this.data.streak} days in a row! You're unstoppable! 🔥`
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];

    // You could add a toast notification here
    console.log(message);
  }

  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications 😢');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      this.notificationPermission = permission;

      if (permission === 'granted') {
        this.data.notificationsEnabled = true;
        this.saveData();
        this.updateNotificationStatus();
        this.scheduleNotification();

        // Show a test notification
        new Notification('✨ Notifications Enabled! ✨', {
          body: 'You\'ll get reminded to take your magnesium every day! 💊💖',
          icon: '/icon-192.png',
          badge: '/icon-192.png'
        });
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }

  checkNotificationPermission() {
    if ('Notification' in window) {
      this.notificationPermission = Notification.permission;
      this.updateNotificationStatus();
    }
  }

  updateNotificationStatus() {
    if (this.notificationPermission === 'granted') {
      this.elements.notificationStatus.innerHTML = `
        <p class="text-green-600 font-semibold flex items-center justify-center gap-2">
          <span>✓</span>
          <span>Notifications enabled!</span>
          <span>🔔</span>
        </p>
      `;
    } else if (this.notificationPermission === 'denied') {
      this.elements.notificationStatus.innerHTML = `
        <p class="text-red-600 text-xs">
          Notifications blocked. Please enable them in your browser settings.
        </p>
      `;
    }
  }

  saveReminderTime() {
    this.data.reminderTime = this.elements.reminderTime.value;
    this.saveData();
    this.scheduleNotification();

    // Show confirmation
    const originalText = this.elements.saveTimeBtn.textContent;
    this.elements.saveTimeBtn.textContent = 'Saved! ✨';
    this.elements.saveTimeBtn.classList.add('animate-pulse');

    setTimeout(() => {
      this.elements.saveTimeBtn.textContent = originalText;
      this.elements.saveTimeBtn.classList.remove('animate-pulse');
    }, 2000);
  }

  scheduleNotification() {
    // Clear any existing scheduled notifications
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    if (this.notificationPermission !== 'granted') {
      return;
    }

    const now = new Date();
    const [hours, minutes] = this.data.reminderTime.split(':').map(Number);

    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    this.notificationTimeout = setTimeout(() => {
      this.showNotification();
      // Reschedule for next day
      this.scheduleNotification();
    }, timeUntilNotification);

    console.log(`Next reminder scheduled for: ${scheduledTime.toLocaleString()}`);
  }

  showNotification() {
    // Check if already taken today
    const today = new Date();
    if (this.data.lastTaken && this.isSameDay(new Date(this.data.lastTaken), today)) {
      return; // Already taken today, no need to remind
    }

    if (this.notificationPermission === 'granted') {
      const messages = [
        'Time for your magnesium! 💊✨',
        'Don\'t forget your magnesium, sweetie! 💖',
        'Magnesium time! Let\'s keep that streak going! 🔥',
        'Your daily dose of wellness awaits! ✨💕',
        'Remember to take your magnesium! 💊💝'
      ];

      const message = messages[Math.floor(Math.random() * messages.length)];

      new Notification('✨ Magnesium Reminder ✨', {
        body: message,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'magnesium-reminder',
        requireInteraction: true
      });
    }
  }
}

// Initialize the app
const app = new MagnesiumReminder();
