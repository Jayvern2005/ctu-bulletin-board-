# Setup Guide - CTU Digital Bulletin Board

## Complete Step-by-Step Setup Instructions

Follow these steps to get your bulletin board running.

---

## Part 1: Firebase Setup (Backend)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name: `ctu-bulletin-board`
4. Disable Google Analytics (optional)
5. Click "Create project"
6. Wait for setup to complete
7. Click "Continue"

### Step 2: Enable Firestore Database

1. In left sidebar, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select location: `asia-southeast1` (Singapore - closest to Philippines)
5. Click "Enable"
6. Wait for database creation

### Step 3: Create Collections

1. In Firestore Database, click "Start collection"
2. Create first collection:
   - Collection ID: `announcements`
   - Click "Next"
   - Add a test document:
     - Document ID: Auto-ID
     - Field: `title` (string) = "Test Announcement"
     - Field: `content` (string) = "This is a test"
     - Field: `startDate` (timestamp) = [Select today's date]
     - Field: `endDate` (timestamp) = [Select tomorrow's date]
   - Click "Save"

3. Create second collection:
   - Click "Start collection"
   - Collection ID: `events`
   - Add test document similar to announcements
   - Click "Save"

4. Create third collection:
   - Collection ID: `academic_calendar`
   - Add test document if desired
   - Click "Save"

### Step 4: Set Security Rules

1. In Firestore Database, click "Rules" tab
2. Replace content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /announcements/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /events/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /academic_calendar/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Step 5: Enable Authentication

1. In left sidebar, click "Authentication"
2. Click "Get started"
3. Click "Email/Password"
4. Toggle "Enable"
5. Click "Save"

### Step 6: Create Admin User

1. Still in Authentication, click "Users" tab
2. Click "Add user"
3. Enter email: `admin@ctu.edu.ph` (or your preferred email)
4. Enter password: Create a strong password
5. Click "Add user"
6. **IMPORTANT: Save these credentials!**

### Step 7: Get Firebase Configuration

1. Click gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click "</>" (Web app icon)
5. Enter app nickname: `CTU Bulletin Board`
6. Don't check "Firebase Hosting"
7. Click "Register app"
8. Copy the `firebaseConfig` object

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "ctu-bulletin-board.firebaseapp.com",
  projectId: "ctu-bulletin-board",
  storageBucket: "ctu-bulletin-board.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

9. Click "Continue to console"

---

## Part 2: Update Project Files

### Step 8: Update Firebase Config

1. Open `firebase/firebaseConfig.js` in a text editor
2. Find this section:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project-id.firebaseapp.com",
  // ...
};
```

3. Replace with YOUR config from Step 7
4. Save the file

### Step 9: Update Weather API (Optional but Recommended)

1. Go to https://openweathermap.org/api
2. Click "Sign Up" (free tier)
3. Create account
4. Go to API keys section
5. Copy your API key

6. Open `display/app.js`
7. Find this line:
```javascript
const API_KEY = "f5168c305674a67a705409181a80046d";
```

8. Replace with your API key:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

9. Update coordinates if needed:
```javascript
const LAT = 10.650;  // Your latitude
const LON = 124.350; // Your longitude
```

10. Save the file

---

## Part 3: Run the Project

### Step 10: Choose a Method

**Method A: Python (Recommended)**

1. Open terminal/command prompt
2. Navigate to project folder:
```bash
cd path/to/ctu-bulletin-board
```

3. Run server:
```bash
python -m http.server 8000
```

4. Open browser to:
   - Display: http://localhost:8000/display/
   - Admin: http://localhost:8000/admin/

**Method B: PHP**

```bash
cd path/to/ctu-bulletin-board
php -S localhost:8000
```

**Method C: VS Code Live Server**

1. Install "Live Server" extension in VS Code
2. Right-click `display/index.html`
3. Select "Open with Live Server"

**Method D: Direct File Access**

1. Navigate to project folder
2. Double-click `display/index.html`
3. Note: Some features may not work

---

## Part 4: Test the System

### Step 11: Test Display

1. Open http://localhost:8000/display/
2. You should see:
   - CTU-SF header
   - Three columns (Announcements, Events, Sidebar)
   - Time widget showing current time
   - Calendar widget with today highlighted
   - Weather widget (if API key configured)
   - Your test announcement/event

3. If anything is missing, check browser console (F12)

### Step 12: Test Admin Login

1. Open http://localhost:8000/admin/
2. Enter credentials from Step 6:
   - Email: `admin@ctu.edu.ph`
   - Password: [your password]
3. Click "Sign In"
4. Should redirect to dashboard

### Step 13: Create Real Content

1. In dashboard, fill out form:
   - Type: "Announcements"
   - Title: "Welcome to CTU Bulletin Board"
   - Content: "This is our new digital bulletin board system!"
   - Start Date: [Today]
   - End Date: [One week from today]
2. Click "Save"

3. Open display page in another tab
4. New announcement should appear instantly!

---

## Part 5: Deploy to Internet (Optional)

### Step 14: GitHub Pages Deployment

1. Create GitHub account (if needed)
2. Create new repository: `ctu-bulletin-board`

3. In project folder terminal:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ctu-bulletin-board.git
git push -u origin main
```

4. In GitHub repository:
   - Go to Settings
   - Click "Pages" in sidebar
   - Source: Deploy from main branch
   - Folder: / (root)
   - Click "Save"

5. Wait 1-2 minutes

6. Your site will be live at:
   - Display: https://YOUR_USERNAME.github.io/ctu-bulletin-board/display/
   - Admin: https://YOUR_USERNAME.github.io/ctu-bulletin-board/admin/

---

## Part 6: Production Setup

### Step 15: Add Your Logo

1. Place your `ctulogo.jpg` in project root
2. Update paths in HTML if needed

### Step 16: Customize Branding

1. Edit `display/index.html`:
```html
<p class="logo-name">CTU-SF</p>
<p class="logo-subtitle">San Francisco Campus</p>
```

2. Edit footer:
```html
<p>© 2026 Cebu Technological University – San Francisco Campus</p>
```

### Step 17: Set Up Kiosk Mode (For Dedicated Display)

**Windows:**
```bash
chrome.exe --kiosk --app=http://localhost:8000/display/
```

**Mac:**
```bash
open -a "Google Chrome" --args --kiosk http://localhost:8000/display/
```

**Linux:**
```bash
chromium-browser --kiosk http://localhost:8000/display/
```

---

## Troubleshooting

### Problem: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
**Solution:** Disable ad blockers or browser extensions

### Problem: Display shows "Loading..." forever
**Solution:** 
1. Check Firebase config is correct
2. Check browser console (F12) for errors
3. Verify Firestore collections exist
4. Check security rules allow reads

### Problem: Can't login to admin
**Solution:**
1. Verify email/password in Firebase Authentication
2. Check Firebase config in firebaseConfig.js
3. Clear browser cache and cookies

### Problem: Weather not showing
**Solution:**
1. Verify API key is valid
2. Check coordinates are correct
3. Check browser console for errors
4. Try the default API key first

### Problem: Content not updating
**Solution:**
1. Check start/end dates are correct
2. Verify content is in correct collection
3. Refresh the page
4. Check Firebase security rules

---

## Next Steps

1. ✅ Add more announcements and events
2. ✅ Import academic calendar data (see `docs/ACADEMIC_CALENDAR_DATA.md`)
3. ✅ Customize colors and fonts
4. ✅ Set up on dedicated display monitor
5. ✅ Share access with other admins

---

## Support

If you encounter issues:
1. Check this guide again
2. Review `README.md`
3. Check `docs/FRONTEND_ARCHITECTURE.md`
4. Look at browser console errors (F12)
5. Verify all files are in correct folders

---

## Congratulations! 🎉

Your CTU Digital Bulletin Board is now running!

**Display URL:** http://localhost:8000/display/  
**Admin URL:** http://localhost:8000/admin/

Enjoy your modern campus communication system!
