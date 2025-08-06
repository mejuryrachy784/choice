# 🔧 Troubleshooting Guide - Login & Signup Issues

## 🚀 Quick Start

### Option 1: Use the PowerShell Script
```powershell
# Run this in PowerShell from the project root
.\start-both-servers.ps1
```

### Option 2: Manual Start
```powershell
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend  
npm run dev
```

## 🔍 Debug Tools

### 1. Login Debug Page
Visit: **http://localhost:5174/login-debug**

This page provides:
- ✅ Backend connection testing
- 🔐 Login functionality testing
- 📝 Signup functionality testing
- 💾 localStorage inspection
- 📊 Detailed request/response logs

### 2. Test Credentials
- **Demo User**: `demo@example.com` / `demo123`
- **Admin User**: `admin@example.com` / `admin123`
- **Admin Key**: `Assa1andonly`

## ❌ Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Symptoms**: Network error, fetch failed
**Solutions**:
1. Check if backend is running: `curl http://localhost:5001/`
2. Restart backend: `cd backend && node server.js`
3. Check firewall/antivirus blocking port 5001

### Issue 2: "CORS Error"
**Symptoms**: CORS policy error in browser console
**Solutions**:
1. Backend now includes port 5174 in CORS config
2. Restart backend server
3. Clear browser cache

### Issue 3: "User already exists"
**Symptoms**: Cannot create account with existing email
**Solutions**:
1. Use different email address
2. Try logging in instead of signing up
3. Use the "Demo User" button for quick testing

### Issue 4: "Incorrect password"
**Symptoms**: Login fails with wrong password
**Solutions**:
1. Use test credentials: `demo@example.com` / `demo123`
2. Check caps lock
3. Try the "Demo User" button

### Issue 5: "Invalid response from server"
**Symptoms**: Server responds but data is malformed
**Solutions**:
1. Check backend logs for errors
2. Restart backend server
3. Check MongoDB connection

## 🔧 Backend Debugging

### Check Backend Status
```powershell
curl http://localhost:5001/
```

### Test Login Endpoint
```powershell
Invoke-RestMethod -Uri "http://localhost:5001/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"demo@example.com","password":"demo123"}'
```

### Check Database Connection
```powershell
cd backend
node -e "require('./config/database')().then(() => console.log('DB Connected')).catch(err => console.error('DB Error:', err))"
```

## 🎯 Frontend Debugging

### Browser Console
1. Open Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests

### localStorage Check
```javascript
// In browser console
console.log('Token:', localStorage.getItem('authToken'));
console.log('Email:', localStorage.getItem('userEmail'));
console.log('Role:', localStorage.getItem('userRole'));
```

## 📊 Server Ports

- **Frontend**: http://localhost:5174
- **Backend**: http://localhost:5001
- **MongoDB**: Connection string in `.env`

## 🔄 Reset Everything

If nothing works, try this complete reset:

```powershell
# 1. Stop all servers
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# 2. Clear browser data
# - Clear localStorage
# - Clear cookies for localhost
# - Hard refresh (Ctrl+F5)

# 3. Restart backend
cd backend
node server.js

# 4. Restart frontend
npm run dev

# 5. Test with debug page
# Visit: http://localhost:5174/login-debug
```

## 📞 Still Having Issues?

1. **Use the Debug Page**: http://localhost:5174/login-debug
2. **Check Browser Console**: Look for error messages
3. **Check Backend Logs**: Look at the terminal running the backend
4. **Try Different Browser**: Sometimes browser cache causes issues
5. **Check Network**: Ensure no proxy/VPN blocking requests

## 🎯 Success Indicators

✅ Backend responds to: http://localhost:5001/
✅ Frontend loads at: http://localhost:5174
✅ Login debug page works: http://localhost:5174/login-debug
✅ Demo credentials work: demo@example.com / demo123
✅ No CORS errors in browser console
✅ Token stored in localStorage after login

## 📝 Environment Check

Make sure your `.env` file in the backend folder contains:
```env
PORT=5001
MONGO_URI=mongodb+srv://mejuryzvarevashe7:mejury12345@choice.y6eq3bc.mongodb.net/choice?retryWrites=true&w=majority
JWT_SECRET=privilast1
ADMIN_SECRET=Assa1andonly
```

---

**Happy Debugging! 🚗💨**