/**
 * Google Apps Script - Philippines Trip API
 *
 * This script handles write operations to the Google Sheet:
 * - addExpense: Append a row to the "expenses" tab
 * - toggleTask: Update the Done column for a task
 * - addTask: Append a new task row
 * - togglePacking: Toggle the Packed column for a packing item
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code in Code.gs
 * 4. Paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Select type: "Web app"
 * 7. Set "Execute as": Me
 * 8. Set "Who has access": Anyone
 * 9. Click Deploy and authorize
 * 10. Copy the Web App URL
 * 11. In the travel app, open browser console and run:
 *     localStorage.setItem('ph-apps-script-url', 'YOUR_URL_HERE')
 *     Then refresh the page.
 */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    const data = body.data;

    switch (action) {
      case 'addExpense':
        return addExpense(data);
      case 'toggleTask':
        return toggleTask(data);
      case 'addTask':
        return addTask(data);
      case 'togglePacking':
        return togglePacking(data);
      default:
        return jsonResponse({ error: 'Unknown action: ' + action }, 400);
    }
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Philippines Trip API is running' });
}

function addExpense(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('expenses');
  if (!sheet) return jsonResponse({ error: 'Sheet "expenses" not found' }, 404);

  const row = [
    data.Date || new Date().toLocaleDateString('en-GB'),
    data.Description || '',
    data.Amount || 0,
    data.Currency || 'ILS',
    data.Category || '',
    data.Who || 'Both',
  ];

  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Expense added' });
}

function toggleTask(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('tasks');
  if (!sheet) return jsonResponse({ error: 'Sheet "tasks" not found' }, 404);

  const row = data.row; // 1-indexed row number (2 = first data row after header)
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);

  const doneCol = 2; // Column B = "Done"
  const currentValue = sheet.getRange(row, doneCol).getValue();
  const newValue = data.done !== undefined ? (data.done ? 'TRUE' : 'FALSE') : (currentValue ? 'FALSE' : 'TRUE');
  sheet.getRange(row, doneCol).setValue(newValue);

  return jsonResponse({ success: true, row: row, done: newValue });
}

function addTask(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('tasks');
  if (!sheet) return jsonResponse({ error: 'Sheet "tasks" not found' }, 404);

  const row = [
    data.Task || '',
    data.Done || 'FALSE',
    data['Due Date'] || '',
  ];

  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Task added' });
}

function togglePacking(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);

  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);

  const packedCol = 3; // Column C = "Packed"
  const currentValue = String(sheet.getRange(row, packedCol).getValue()).toUpperCase();
  const newValue = currentValue === 'TRUE' ? 'FALSE' : 'TRUE';
  sheet.getRange(row, packedCol).setValue(newValue);

  return jsonResponse({ success: true, row: row, packed: newValue });
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
