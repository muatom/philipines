# Deploying the Google Apps Script API

## Step 1: Open your Google Sheet's Script Editor
1. Open the Google Sheet (the one with flights, hotels, expenses, tasks, links, emergency tabs)
2. Click **Extensions** > **Apps Script**

## Step 2: Add the Code
1. In the Apps Script editor, delete any existing code in `Code.gs`
2. Copy the entire contents of the `Code.gs` file from this repo
3. Paste it into the editor

## Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set these options:
   - **Description**: Philippines Trip API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. Click **Authorize access** and sign in with your Google account
6. If you see "This app isn't verified", click **Advanced** > **Go to (project name) (unsafe)** > **Allow**
7. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

## Step 4: Connect the App
1. Open the travel app in your browser
2. Open Developer Tools (Cmd+Option+I on Mac)
3. In the Console tab, run:
```js
localStorage.setItem('ph-apps-script-url', 'PASTE_YOUR_URL_HERE')
```
4. Refresh the page

Now when you add expenses or toggle tasks, they'll sync to Google Sheets.

## Updating the Script
If you need to update the script later:
1. Edit the code in Apps Script
2. Click **Deploy** > **Manage deployments**
3. Click the pencil icon on your deployment
4. Set version to **New version**
5. Click **Deploy**

## Troubleshooting
- **Expenses not syncing?** Check the Console for errors. The URL must be exact.
- **Authorization error?** Re-deploy and re-authorize.
- **Data not appearing?** The published CSV can take 5 minutes to update after a Sheet edit. Pull-to-refresh or reload the app.
