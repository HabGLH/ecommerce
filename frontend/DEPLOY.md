# Deployment Instructions (Vercel)

This project is ready to be deployed to Vercel.

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **Vercel CLI** (Optional): Install via `npm i -g vercel`.
3.  **Backend Deployed**: Ensure your backend API is deployed (e.g., on Render, Railway, or Vercel) and you have its URL (e.g., `https://my-api.onrender.com`).

## Deployment Steps

### Option 1: Via Vercel Dashboard (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Log in to Vercel and click **"Add New..."** -> **"Project"**.
3.  Import your repository.
4.  Configure the **Project Settings**:
    - **Framework Preset**: Vite
    - **Root Directory**: `frontend` (if your repo root is the parent folder) or leave empty if this repo _is_ the frontend.
    - **Environment Variables**:
      - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://my-api.onrender.com/api` or `https://my-api.onrender.com` depending on your backend routes).
        - _Note_: Our code appends `/auth/refresh`, so if your backend expects `/api/auth/refresh`, set this to `https://.../api`.
5.  Click **Deploy**.

### Option 2: Via Vercel CLI

1.  Open your terminal in the `frontend` directory.
2.  Run:
    ```bash
    vercel
    ```
3.  Follow the prompts to link the project.
4.  When asked about settings, accept the defaults (Vite detected).
5.  To set the environment variable:
    ```bash
    vercel env add VITE_API_URL
    ```
    (Enter your backend URL when prompted).
6.  Redeploy with the new env var:
    ```bash
    vercel --prod
    ```

## Important Note on CORS

Ensure your backend is configured to accept requests from your Vercel domain. In your backend `app.js` or `cors` configuration:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
```
