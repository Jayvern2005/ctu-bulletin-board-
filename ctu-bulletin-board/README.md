# CTU Digital Bulletin Board System 🎓

A modern, real-time digital bulletin board system for Cebu Technological University - San Francisco Campus.

## 📋 Features

### Public Display
- ✨ Three-column layout - Announcements, Events, and Information Sidebar
- 📢 Real-time announcements - Auto-updates when admin adds content
- 📅 Events & notices - Upcoming campus events
- ⏰ Live clock - Updates every second
- 🗓️ Interactive mini calendar - Current month with today highlighted
- 🌤️ Weather widget - Live weather for Camotes, Cebu
- 📊 Live counters - Shows number of active announcements/events

### Admin Dashboard
- 🔐 Secure login - Firebase authentication
- ✏️ CRUD operations - Create, Read, Update, Delete content
- 📅 Date/time management - Set start and end dates
- 🔄 Real-time sync - Changes appear instantly

## 🚀 Quick Start

### 1. Set up Firebase

a. Go to [Firebase Console](https://console.firebase.google.com/)

b. Create new project

c. Enable **Firestore Database** and **Authentication** (Email/Password)

d. Get your config from Project Settings

e. Update `firebase/firebaseConfig.js` with your credentials

### 2. Run Locally

```bash
# Using Python
python -m http.server 8000

# Then open:
# http://localhost:8000/display/
# http://localhost:8000/admin/
```

### 3. Create Admin User

In Firebase Console > Authentication > Add user

## 📂 Project Structure

```
ctu-bulletin-board/
├── display/          # Public Display
├── admin/            # Admin Dashboard  
├── firebase/         # Backend Config
└── docs/             # Documentation
```

## 🔧 Configuration

### Update Weather Location

Edit `display/app.js`:
```javascript
const LAT = 10.650;  // Your latitude
const LON = 124.350; // Your longitude
```

### Customize Colors

Edit `display/style.css`:
```css
:root {
  --primary: #3b82f6;
  --accent: #06b6d4;
}
```

## 🌐 Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

Enable GitHub Pages in repository settings.

## 📖 Documentation

- `docs/FRONTEND_ARCHITECTURE.md` - Complete technical documentation
- `docs/ACADEMIC_CALENDAR_DATA.md` - Academic calendar integration

## 🐛 Troubleshooting

- **Not loading?** Check Firebase config
- **Can't login?** Verify user exists in Firebase Authentication
- **No weather?** Check API key and coordinates

## 📄 License

MIT License - Free to use and modify

**Made with ❤️ for CTU-SF**
