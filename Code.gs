/**
 * Google Apps Script - Philippines Trip API v2
 *
 * EXPENSE SHEET COLUMNS (A-M):
 * A=Date, B=Description, C=Amount, D=Currency, E=Category, F=Who,
 * G=Type, H=ILS_Amount, I=USD_Amount, J=PHP_Amount, K=Exchange_Rate, L=Origin_Cur,
 * M=PaymentMethod ("card" | "cash" | "")
 *
 * LINKS SHEET COLUMNS (A-D):
 * A=Name, B=URL, C=Description, D=Icon
 *
 * PACKING SHEET COLUMNS (A-E):
 * A=Item, B=Category, C=Packed, D=Who, E=Critical
 *
 * DESTINATION_NOTES SHEET COLUMNS (A-G):
 * A=ID, B=DestinationID, C=Category, D=Title, E=Link, F=Description, G=Done
 *
 * DEPLOYMENT: Deploy > Manage deployments > Edit > New version > Deploy
 */

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    const data = body.data;
    switch (action) {
      case 'addExpense': return addExpense(data);
      case 'editExpense': return editExpense(data);
      case 'deleteExpense': return deleteExpense(data);
      case 'toggleTask': return toggleTask(data);
      case 'addTask': return addTask(data);
      case 'togglePacking': return togglePacking(data);
      case 'addPackingItem': return addPackingItem(data);
      case 'editPackingItem': return editPackingItem(data);
      case 'deletePackingItem': return deletePackingItem(data);
      case 'toggleCritical': return toggleCritical(data);
      case 'addLink': return addLink(data);
      case 'editLink': return editLink(data);
      case 'deleteLink': return deleteLink(data);
      case 'addNote': return addNote(data);
      case 'toggleNote': return toggleNote(data);
      case 'deleteNote': return deleteNote(data);
      default: return jsonResponse({ error: 'Unknown action: ' + action }, 400);
    }
  } catch (err) {
    return jsonResponse({ error: err.message }, 500);
  }
}

function doGet(e) {
  return jsonResponse({ status: 'ok', message: 'Philippines Trip API v2 is running' });
}

// ========== EXPENSES ==========

function addExpense(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('expenses');
  if (!sheet) return jsonResponse({ error: 'Sheet "expenses" not found' }, 404);
  const row = [
    data.Date || new Date().toLocaleDateString('en-GB'),
    data.Description || '', data.Amount || 0, data.Currency || 'ILS',
    data.Category || '', data.Who || 'Both', data.Type || 'on',
    data.ILS_Amount || 0, data.USD_Amount || 0, data.PHP_Amount || 0,
    data.Exchange_Rate || '', data.Origin_Cur || data.Currency || 'ILS',
    data.PaymentMethod || '',
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Expense added' });
}

function editExpense(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('expenses');
  if (!sheet) return jsonResponse({ error: 'Sheet "expenses" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  let originCur = data.Origin_Cur;
  if (!originCur) originCur = sheet.getRange(row, 12).getValue() || data.Currency || 'ILS';
  // Preserve existing PaymentMethod if not provided (legacy edits from older clients)
  let paymentMethod = data.PaymentMethod;
  if (paymentMethod === undefined) paymentMethod = sheet.getRange(row, 13).getValue() || '';
  const values = [
    data.Date || '', data.Description || '', data.Amount || 0, data.Currency || 'ILS',
    data.Category || '', data.Who || 'Both', data.Type || 'on',
    data.ILS_Amount || 0, data.USD_Amount || 0, data.PHP_Amount || 0,
    data.Exchange_Rate || '', originCur,
    paymentMethod,
  ];
  sheet.getRange(row, 1, 1, values.length).setValues([values]);
  return jsonResponse({ success: true, message: 'Expense updated', row: row });
}

function deleteExpense(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('expenses');
  if (!sheet) return jsonResponse({ error: 'Sheet "expenses" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.deleteRow(row);
  return jsonResponse({ success: true, message: 'Expense deleted', row: row });
}

// ========== TASKS ==========

function toggleTask(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('tasks');
  if (!sheet) return jsonResponse({ error: 'Sheet "tasks" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  const currentValue = sheet.getRange(row, 2).getValue();
  const newValue = data.done !== undefined ? (data.done ? 'TRUE' : 'FALSE') : (currentValue ? 'FALSE' : 'TRUE');
  sheet.getRange(row, 2).setValue(newValue);
  return jsonResponse({ success: true, row: row, done: newValue });
}

function addTask(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('tasks');
  if (!sheet) return jsonResponse({ error: 'Sheet "tasks" not found' }, 404);
  sheet.appendRow([data.Task || '', data.Done || 'FALSE', data['Due Date'] || '']);
  return jsonResponse({ success: true, message: 'Task added' });
}

// ========== PACKING ==========

function togglePacking(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  const currentValue = String(sheet.getRange(row, 3).getValue()).toUpperCase();
  sheet.getRange(row, 3).setValue(currentValue === 'TRUE' ? 'FALSE' : 'TRUE');
  return jsonResponse({ success: true, row: row });
}

function addPackingItem(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);
  const row = [
    data.Item || '',
    data.Category || 'שונות',
    'FALSE',
    data.Who || 'Shared',
    data.Critical || 'FALSE',
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Packing item added' });
}

function editPackingItem(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.getRange(row, 1).setValue(data.Item || '');
  sheet.getRange(row, 2).setValue(data.Category || 'שונות');
  sheet.getRange(row, 4).setValue(data.Who || 'Shared');
  if (data.Critical !== undefined) {
    sheet.getRange(row, 5).setValue(data.Critical ? 'TRUE' : 'FALSE');
  }
  return jsonResponse({ success: true, message: 'Packing item updated', row: row });
}

function deletePackingItem(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.deleteRow(row);
  return jsonResponse({ success: true, message: 'Packing item deleted', row: row });
}

function toggleCritical(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('packing');
  if (!sheet) return jsonResponse({ error: 'Sheet "packing" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  const currentValue = String(sheet.getRange(row, 5).getValue()).toUpperCase();
  sheet.getRange(row, 5).setValue(currentValue === 'TRUE' ? 'FALSE' : 'TRUE');
  return jsonResponse({ success: true, row: row });
}

// ========== LINKS ==========

function addLink(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('links');
  if (!sheet) return jsonResponse({ error: 'Sheet "links" not found' }, 404);
  const row = [
    data.Name || '',
    data.URL || '',
    data.Description || '',
    data.Icon || '📦',
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Link added' });
}

function editLink(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('links');
  if (!sheet) return jsonResponse({ error: 'Sheet "links" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.getRange(row, 1).setValue(data.Name || '');
  sheet.getRange(row, 2).setValue(data.URL || '');
  sheet.getRange(row, 3).setValue(data.Description || '');
  sheet.getRange(row, 4).setValue(data.Icon || '📦');
  return jsonResponse({ success: true, message: 'Link updated', row: row });
}

function deleteLink(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('links');
  if (!sheet) return jsonResponse({ error: 'Sheet "links" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.deleteRow(row);
  return jsonResponse({ success: true, message: 'Link deleted', row: row });
}

// ========== DESTINATION NOTES ==========

function addNote(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('destination_notes');
  if (!sheet) return jsonResponse({ error: 'Sheet "destination_notes" not found' }, 404);
  const id = new Date().getTime().toString(36);
  const row = [
    id,
    data.DestinationID || '',
    data.Category || 'Note',
    data.Title || '',
    data.Link || '',
    data.Description || '',
    'FALSE',
  ];
  sheet.appendRow(row);
  return jsonResponse({ success: true, message: 'Note added', id: id });
}

function toggleNote(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('destination_notes');
  if (!sheet) return jsonResponse({ error: 'Sheet "destination_notes" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  const currentValue = String(sheet.getRange(row, 7).getValue()).toUpperCase();
  sheet.getRange(row, 7).setValue(currentValue === 'TRUE' ? 'FALSE' : 'TRUE');
  return jsonResponse({ success: true, row: row });
}

function deleteNote(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('destination_notes');
  if (!sheet) return jsonResponse({ error: 'Sheet "destination_notes" not found' }, 404);
  const row = data.row;
  if (!row || row < 2) return jsonResponse({ error: 'Invalid row' }, 400);
  sheet.deleteRow(row);
  return jsonResponse({ success: true, message: 'Note deleted', row: row });
}

// ========== UTILS ==========

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
