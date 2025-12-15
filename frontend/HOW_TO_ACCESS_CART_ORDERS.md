# 🔐 How to Access Cart & Orders

## ⚠️ **Important: You MUST Login First!**

Cart and Orders pages are **protected routes** - you need to be logged in to see them!

---

## 📝 **Step-by-Step Guide**

### **1. Register (First Time Only)**

```
1. Visit http://localhost:5174/register
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: yourpassword
   - Confirm Password: yourpassword
3. Click "Register"
4. You'll be automatically logged in
```

### **2. Login (Returning Users)**

```
1. Visit http://localhost:5174/login
2. Enter:
   - Email: your@email.com
   - Password: yourpassword
3. Click "Login"
4. You'll be redirected to home page (logged in)
```

### **3. Access Cart & Orders**

```
NOW you can access:
✅ http://localhost:5174/cart
✅ http://localhost:5174/orders

Or click the links in the navbar!
```

---

## 🎯 **Quick Test**

### **Test if You're Logged In:**

**Open browser console (F12) and type:**

```javascript
document.cookie;
```

**Should show:**

```
refreshToken=...
```

**If you see the cookie** = You're logged in! ✅  
**If NO cookie** = You need to login! ❌

---

## 🐛 **Troubleshooting**

### **Problem: Still redirects to login**

**Solution:** You're not logged in!

1. Go to `/login`
2. Login with your credentials
3. Then visit `/cart` or `/orders`

---

### **Problem: Redirects to home instead of login**

**This shouldn't happen anymore!** After the fix:

- Not logged in + visit `/cart` → Redirects to `/login` ✅
- Not logged in + visit `/orders` → Redirects to `/login` ✅

---

### **Problem: 401 error in console**

```
GET /api/users/me 401 (Unauthorized)
```

**This is NORMAL!** When the app loads, it checks if you're logged in.

- If NOT logged in → 401 error (expected)
- If logged in → No error

---

## 🔄 **Authentication Flow**

```
┌─────────────────────────────────────┐
│ Visit /cart or /orders              │
└────────────┬────────────────────────┘
             │
             ▼
      ┌─────────────┐
      │ Logged in?  │
      └──────┬──────┘
             │
        ┌────┴────┐
        │         │
     YES│         │NO
        │         │
        ▼         ▼
   ┌────────┐ ┌─────────┐
   │ Show   │ │Redirect │
   │ Page   │ │to Login │
   └────────┘ └─────────┘
                    │
                    ▼
              ┌──────────┐
              │  Login   │
              └────┬─────┘
                   │
                   ▼
              ┌──────────┐
              │ Return to│
              │ /cart or │
              │ /orders  │
              └──────────┘
```

---

## ✅ **Correct Behavior**

### **When Logged OUT:**

```
Click "Cart" → Redirects to /login
After login → Returns to /cart ✅

Click "Orders" → Redirects to /login
After login → Returns to /orders ✅
```

### **When Logged IN:**

```
Click "Cart" → Shows cart page ✅
Click "Orders" → Shows orders page ✅
Direct URL → Works immediately ✅
```

---

## 🎯 **To Test Everything:**

### **Full Test Flow:**

```bash
# 1. Register/Login
http://localhost:5174/register
# or
http://localhost:5174/login

# 2. Add products to cart
http://localhost:5174/
# Click "Add to Cart" on some products

# 3. View cart
http://localhost:5174/cart
# ✅ Should see your items

# 4. Checkout
# Click "Proceed to Checkout"
# ✅ Order created

# 5. View orders
http://localhost:5174/orders
# ✅ Should see your order
```

---

## 🔐 **Security Note**

**Why cart/orders require login:**

1. **Privacy** - Your cart is personal
2. **Security** - Orders contain sensitive data
3. **Data integrity** - Each user has their own cart/orders
4. **Standard practice** - All e-commerce sites work this way

**This is correct and secure!** ✅

---

## 💡 **Backend Requirements**

Make sure your backend is running:

```bash
# In your backend directory
npm start
# or
npm run dev

# Should run on http://localhost:5000
```

**Test backend:**

```bash
curl http://localhost:5000/api/auth/health
# Should return OK or health status
```

---

## 📊 **Expected vs Current Behavior**

| Action            | Not Logged In | Logged In       |
| ----------------- | ------------- | --------------- |
| Visit `/`         | ✅ Works      | ✅ Works        |
| Visit `/cart`     | → `/login`    | ✅ Shows cart   |
| Visit `/orders`   | → `/login`    | ✅ Shows orders |
| Click Cart link   | → `/login`    | ✅ Shows cart   |
| Click Orders link | → `/login`    | ✅ Shows orders |

---

## 🚀 **Quick Start**

**Just want to test?** Here's the fastest way:

```bash
# 1. Open http://localhost:5174

# 2. Click "Register" in navbar

# 3. Fill form and submit

# 4. You're logged in! Now test:
   - Click "Cart" ✅
   - Click "Orders" ✅
   - Add products ✅
   - Checkout ✅
```

---

## ✅ **Summary**

**Cart and Orders REQUIRE login** - This is by design! 🔐

**To access them:**

1. Register or Login
2. Then click Cart/Orders links
3. Everything will work!

**This is the correct, secure behavior for an e-commerce app!** ✅

---

**Having issues? Check:**

1. ✅ Backend is running (http://localhost:5000)
2. ✅ You've logged in (check cookie)
3. ✅ No JavaScript errors in console
4. ✅ Network tab shows API calls working

**Everything should work perfectly if you're logged in!** 🎉
