# 🐛 Authentication Debugging Guide

## 📊 **How to Debug**

I've added console logging throughout the authentication system. Here's how to use it:

### **Step 1: Open Browser Console**

```
1. Open http://localhost:5173
2. Press F12 (or Cmd+Option+I on Mac)
3. Go to "Console" tab
4. Clear the console (click 🚫 icon)
```

### **Step 2: Check Initial Load**

You should see:

```
🔐 AuthProvider: Initializing authentication...
ℹ️ AuthProvider: No active session (this is normal if not logged in)
🔐 AuthProvider: Initialization complete
🔐 AuthProvider: State update - { user: "none", role: "none", isAuthenticated: false, loading: false }
```

**This is NORMAL if you're not logged in!** ✅

### **Step 3: Try to Login**

```
1. Go to http://localhost:5173/login
2. Enter credentials
3. Click "Login"
4. Watch the console
```

You should see:

```
🔐 AuthProvider: Logging in...
✅ AuthProvider: Login successful, user: { name: "...", email: "...", role: "..." }
🔐 AuthProvider: State update - { user: "user@example.com", role: "user", isAuthenticated: true, loading: false }
```

### **Step 4: Try to Access Cart**

```
1. Navigate to http://localhost:5173/cart
2. Watch the console
```

**If Logged In:** Should see:

```
🔒 RequireAuth: Checking access { path: "/cart", user: "user@example.com", role: "user", loading: false, ... }
✅ RequireAuth: Access granted!
```

**If NOT Logged In:** Should see:

```
🔒 RequireAuth: Checking access { path: "/cart", user: "none", role: "none", loading: false, ... }
❌ RequireAuth: No user, redirecting to login
```

---

## 🔍 **What to Look For**

### **Problem 1: User is NULL after login**

**Console shows:**

```
✅ AuthProvider: Login successful, user: {...}
BUT THEN:
🔐 AuthProvider: State update - { user: "none", ... }  ← USER IS LOST!
```

**Cause**: State isn't being set properly  
**Solution**: Backend might not be returning correct data

**Check backend response:**

```javascript
// In login API, should return:
{
  "status": "success",
  "accessToken": "...",
  "user": {
    "name": "...",
    "email": "...",
    "role": "user"
  }
}
```

---

### **Problem 2: User role doesn't match**

**Console shows:**

```
🔒 RequireAuth: Checking access {..., role: "user", allowedRoles: ["admin"], ... }
❌ RequireAuth: User doesn't have required role, redirecting to home
```

**Cause**: Regular user trying to access admin route  
**Solution**: You need an admin account!

**To create admin user:**

1. Register normally
2. Use MongoDB Compass or mongo shell
3. Update user: `db.users.updateOne({email: "your@email.com"}, {$set: {role: "admin"}})`

---

### **Problem 3: 401 errors keep happening**

**Console shows:**

```
GET /api/users/me 401 (Unauthorized)  ← Keeps repeating!
```

**Cause**: Refresh token not working  
**Solutions**:

1. Check backend is running
2. Check cookies are being set
3. Clear cookies and login again

---

### **Problem 4: Loading forever**

**Console shows:**

```
🔐 AuthProvider: Initializing authentication...
⏳ RequireAuth: Still loading...
⏳ RequireAuth: Still loading...
... (never stops)
```

**Cause**: API call hanging  
**Solutions**:

1. Check backend is running: `curl http://localhost:5000/api/health`
2. Check network tab for failed requests
3. Clear browser cache

---

## 🧪 **Quick Tests**

### **Test 1: Check if you're logged in**

```javascript
// Open console, type:
sessionStorage;
localStorage;
document.cookie;

// If you see refreshToken= in cookie → You might be logged in
// If accessToken is in memory → You're logged in
```

### **Test 2: Check backend connection**

```javascript
// Open console, type:
fetch("http://localhost:5173/api/users/me", {
  credentials: "include",
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);

// If returns user data → Backend working
// If 401 → Not logged in
// If network error → Backend down
```

### **Test 3: Manual login test**

```javascript
// Open console, type:
fetch("http://localhost:5173/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "your@email.com",
    password: "yourpassword",
  }),
  credentials: "include",
})
  .then((r) => r.json())
  .then(console.log)
  .catch(console.error);

// Should return: { accessToken: "...", user: {...} }
```

---

## 📋 **Checklist**

Before reporting issues, verify:

- [ ] Backend is running (`npm start` in backend folder)
- [ ] Frontend is running (`npm run dev` in frontend folder)
- [ ] You've registered an account
- [ ] You've logged in successfully
- [ ] Cookies are enabled in browser
- [ ] No browser extensions blocking requests
- [ ] Console shows login success
- [ ] Console shows user state updated

---

## 🎯 **Expected Flow**

### **For Regular User:**

```
1. Visit http://localhost:5173/cart
   ↓
2. Console: "🔒 RequireAuth: Checking access"
   ↓
3a. IF logged in → "✅ Access granted!" → Shows cart
3b. IF NOT → "❌ No user" → Redirects to /login
```

### **For Admin:**

```
1. Visit http://localhost:5173/admin
   ↓
2. Console: "🔒 RequireAuth: Checking access"
   ↓
3a. IF admin → "✅ Access granted!" → Shows admin panel
3b. IF user (not admin) → "❌ Doesn't have role" → Redirects to /
3c. IF NOT logged in → "❌ No user" → Redirects to /login
```

---

## 💡 **Common Solutions**

### **Solution 1: Clear everything and start fresh**

```
1. Open console (F12)
2. Go to Application tab
3. Click "Clear site data"
4. Refresh page
5. Login again
```

### **Solution 2: Check backend response**

```
1. Open Network tab (F12)
2. Login
3. Find POST /api/auth/login request
4. Check Response tab
5. Should have: accessToken + user object
```

### **Solution 3: Verify user role**

```
// After login, in console:
window.__user = null;  // Clear
// Then login and check console logs
// Should show role: "user" or role: "admin"
```

---

## 🚀 **Next Steps**

1. **Open browser console** (F12)
2. **Clear console** (🚫 icon)
3. **Refresh page**
4. **Watch the logs** as shown above
5. **Share the console output** if still having issues

The logs will show exactly where the problem is! 🎯
