# Quick Reference Card - CTU Bulletin Board

## 🚀 Running the Project

### Windows
Double-click: `START_SERVER.bat`

### Mac/Linux
```bash
./start_server.sh
```

### Manual
```bash
python -m http.server 8000
```

Then open: http://localhost:8000

---

## 🔑 Default Access

**Admin Login:**
- URL: http://localhost:8000/admin/
- Email: admin@ctu.edu.ph
- Password: [Set in Firebase Authentication]

**Public Display:**
- URL: http://localhost:8000/display/

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `firebase/firebaseConfig.js` | **MUST UPDATE** with your Firebase credentials |
| `display/app.js` | Update weather API key (optional) |
| `display/index.html` | Public display page |
| `admin/dashboard.html` | Admin control panel |

---

## ✅ Setup Checklist

- [ ] Create Firebase project
- [ ] Enable Firestore Database
- [ ] Enable Authentication (Email/Password)
- [ ] Create admin user in Firebase
- [ ] Update `firebase/firebaseConfig.js`
- [ ] Create collections: `announcements`, `events`, `academic_calendar`
- [ ] Set Firestore security rules
- [ ] Run local server
- [ ] Test display page
- [ ] Test admin login
- [ ] Add logo image (ctulogo.jpg)

---

## 🎨 Customization Points

### Colors
`display/style.css` and `admin/admin.css`:
```css
--primary: #3b82f6;    /* Blue */
--accent: #06b6d4;     /* Cyan */
--success: #10b981;    /* Green */
```

### Location/Weather
`display/app.js`:
```javascript
const LAT = 10.650;
const LON = 124.350;
```

### Branding
- Replace logo: `ctulogo.jpg` in display/ and admin/
- Edit campus name in `display/index.html`
- Edit footer text

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Display not loading | Check Firebase config |
| Can't login | Verify user exists in Firebase Auth |
| No weather | Check API key in app.js |
| Import errors | Use web server, not file:// |

---

## 📞 Emergency Commands

### Clear Browser Cache
- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

### Check Firebase Connection
Open browser console (F12) and look for errors

### Reset Firebase Rules
Copy from SETUP_GUIDE.md Step 4

---

## 🌐 Deployment

### GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Deploy bulletin board"
git push origin main
```
Enable Pages in repo settings

### Access URLs
- Display: `https://username.github.io/ctu-bulletin-board/display/`
- Admin: `https://username.github.io/ctu-bulletin-board/admin/`

---

## 📚 Documentation

- **Full Setup:** SETUP_GUIDE.md
- **Architecture:** docs/FRONTEND_ARCHITECTURE.md
- **Calendar Data:** docs/ACADEMIC_CALENDAR_DATA.md
- **README:** README.md

---

## ⚡ Quick Tips

1. **Fullscreen Display:** Press F11
2. **Auto-refresh:** Display refreshes every 30 min
3. **Live Updates:** No refresh needed for new content
4. **Kiosk Mode:** Use `chrome --kiosk URL`
5. **Mobile Access:** Works on phones/tablets

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** Production Ready ✅

**Need Help?** Check SETUP_GUIDE.md for complete instructions
