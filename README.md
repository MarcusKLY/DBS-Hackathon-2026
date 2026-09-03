# DBS Code — Developer Setup Guide (ZIP Archive)

Welcome! This guide walks you through getting the **DBS Code** project up and
running on your local machine after downloading it as a **ZIP archive**.

---

## Project Overview

| Item              | Detail                              |
| ----------------- | ----------------------------------- |
| **Project name**  | `dbs-code`                          |
| **Tech stack**     | Vite + React 18 + TypeScript        |
| **Package manager** | npm                               |
| **Node.js required** | v18 or higher                     |
| **Dev server**    | `http://localhost:5173`             |

---

## Prerequisites

Before you begin, make sure you have **Node.js** installed on your machine.

1. Open a **Terminal** (macOS / Linux) or **Command Prompt / PowerShell** (Windows).
2. Run the following command to check if Node.js is installed:

   ```bash
   node -v
   ```

3. You should see a version number like `v18.x.x` or higher.

   > **If Node.js is not installed** (or the version is below 18), download and
   > install the latest **LTS** version from the official website:
   > [https://nodejs.org/](https://nodejs.org/)

4. Verify `npm` is available (it ships with Node.js):

   ```bash
   npm -v
   ```

---

## Step 1 — Extract the ZIP Archive

1. Locate the downloaded ZIP file (e.g., `dbs-code.zip`) on your computer.
2. **Extract / unzip** it to a target directory of your choice.

   **macOS / Linux:**

   ```bash
   # Example: extract to your Desktop
   cd ~/Desktop
   unzip dbs-code.zip
   ```

   **Windows (PowerShell):**

   ```powershell
   Expand-Archive -Path dbs-code.zip -DestinationPath .
   ```

   You can also extract by **right-clicking** the ZIP file and selecting
   **"Extract All..."** (Windows) or **"Open"** (macOS), then dragging the folder
   to your desired location.

---

## Step 2 — Open Terminal in the Project Folder

After extraction, you should have a directory named **`DBS Code`** (or similar).

1. Open a **Terminal** window.
2. Navigate into the extracted project root folder:

   ```bash
   cd ~/Desktop/DBS\ Code
   ```

   > 💡 **Tip:** You can also type `cd ` in the terminal, then **drag the project
   > folder** from your file explorer into the terminal window and press
   > **Enter** — the path is filled in automatically.

3. Verify you're in the right place:

   ```bash
   ls   # macOS / Linux
   dir  # Windows
   ```

   You should see key files such as `package.json`, `index.html`, `vite.config.ts`,
   and the `src/` folder.

---

## Step 3 — Install Dependencies (Critical)

> ⚠️ **This step is required. Do not skip it.**

To keep the ZIP archive small, the `node_modules/` folder **has been excluded**
from the package. This folder contains all the third-party libraries the project
depends on (React, Vite, ESLint, TypeScript, etc.) and is **required** for the
app to run.

Install every dependency by running:

```bash
npm install
```

This command reads the `package.json` file, resolves all dependencies, and
downloads them into a newly created `node_modules/` folder. It also generates a
`package-lock.json` if one needs updating.

**What to expect:**

- The install may take **1–3 minutes** depending on your network speed.
- You'll see a list of packages being fetched and a summary at the end.
- A new `node_modules/` folder will appear in the project root.

> **If you see errors during installation**, try the following:
>
> - Ensure you have a stable internet connection.
> - Run `npm cache clean --force`, then re-run `npm install`.
> - Make sure your Node.js version is **v18 or higher**.

---

## Step 4 — Environment Setup

This project does **not** ship with a `.env.example` file, which means **no
custom environment variables are required** to run the app locally. You can skip
this step and proceed directly to **Step 5**.

> **If a `.env.example` file is added in the future**, duplicate it and configure
> your local environment like so:
>
> ```bash
> # Copy the example file
> cp .env.example .env
> ```
>
> Then open `.env` in your text editor and fill in any required values.

---

## Step 5 — Run the App

Start the local development server:

```bash
npm run dev
```

**What to expect:**

```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

1. Vite will compile the project and start a dev server.
2. Open your browser and navigate to:

   **[http://localhost:5173](http://localhost:5173)**

3. You should see the app running. The dev server supports **Hot Module
   Replacement (HMR)** — changes you save in the source code appear
   instantly in the browser.

---

## Available Scripts

| Command            | Description                                       |
| ------------------ | ------------------------------------------------- |
| `npm run dev`      | Start the local development server with HMR.      |
| `npm run build`    | Type-check (`tsc -b`) and build for production into `dist/`. |
| `npm run preview`  | Preview the production build locally.             |
| `npm run lint`     | Run ESLint across the project to check code style.|

---

## Troubleshooting

### `sh: vite: command not found`

**Cause:** The `vite` executable lives inside `node_modules/.bin/`. If
`node_modules/` is missing or incomplete, the `npm run dev` command can't find
it.

**Fix:** You skipped or the `npm install` step failed. Run it now:

```bash
npm install
```

Wait for the installation to finish, then try again:

```bash
npm run dev
```

> If the error persists after a successful install, delete `node_modules` and
> `package-lock.json`, then reinstall from scratch:
>
> ```bash
> rm -rf node_modules package-lock.json
> npm install
> ```

---

### Port 5173 is already in use

**Symptom:** When you run `npm run dev`, you see an error like:

```
Port 5173 is in use, trying another one...
```

or the server fails to start entirely.

**Fix — Option A: Free the port**

Find and stop the process occupying port 5173:

**macOS / Linux:**

```bash
# Find the process using port 5173
lsof -i :5173

# Kill it (replace <PID> with the number from the previous command)
kill -9 <PID>
```

**Windows (PowerShell):**

```powershell
# Find the process using port 5173
netstat -ano | findstr :5173

# Kill it (replace <PID> with the number from the previous command)
taskkill /PID <PID> /F
```

Then restart the dev server:

```bash
npm run dev
```

**Fix — Option B: Use a different port**

Start Vite on an alternative port:

```bash
npx vite --port 5174
```

Then open **[http://localhost:5174](http://localhost:5174)** in your browser.

---

### Other common issues

| Problem                              | Solution                                                              |
| ------------------------------------ | --------------------------------------------------------------------- |
| `node: command not found`            | Node.js isn't installed or isn't on your `PATH`. Install from [nodejs.org](https://nodejs.org/). |
| TypeScript errors during `npm run build` | Make sure all dependencies are installed (`npm install`). Check that your editor is using the project's TypeScript version. |
| Blank page in browser                | Check the browser console (F12) for errors. Ensure `src/main.tsx` and `src/App.tsx` exist and are unmodified. |
| Changes not reflected in browser     | Hard-refresh the browser (`Cmd+Shift+R` / `Ctrl+Shift+R`) or restart the dev server. |

---

## Project Structure

```
DBS Code/
├── index.html          # HTML entry point
├── package.json        # Project metadata & scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript root config
├── tsconfig.app.json   # TypeScript app-level config
├── tsconfig.node.json  # TypeScript Node-level config
├── eslint.config.js    # ESLint configuration
├── public/             # Static assets served as-is
└── src/                # Application source code
    ├── main.tsx        # React entry point
    ├── App.tsx         # Root component
    ├── App.css         # Root component styles
    ├── index.css       # Global styles
    ├── vite-env.d.ts   # Vite type declarations
    └── assets/         # Images, fonts, etc.
```

---

## Need Help?

If you run into issues not covered here, please reach out to the project
maintainer or open an issue in the project repository. When reporting a problem,
include:

1. Your **Node.js version** (`node -v`)
2. Your **npm version** (`npm -v`)
3. The **exact command** you ran
4. The **full error output** from the terminal

Happy coding! 🚀
