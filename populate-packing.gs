/**
 * ONE-TIME SCRIPT: Populate the "packing" tab with all items.
 *
 * How to use:
 * 1. Open your Google Sheet > Extensions > Apps Script
 * 2. Create a new file (+ button) and name it "populate-packing"
 * 3. Paste this entire file
 * 4. Click the Run button (▶) with populatePackingTab selected
 * 5. Authorize when prompted
 * 6. After it runs successfully, you can delete this file from Apps Script
 *
 * This will populate 93 items across Tom, Dani, and Shared categories.
 */

function populatePackingTab() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('packing');
  if (!sheet) {
    sheet = ss.insertSheet('packing');
  }

  // Clear everything and set headers
  sheet.clear();
  sheet.getRange(1, 1, 1, 4).setValues([['Item', 'Category', 'Packed', 'Who']]);

  const items = [
    // ===== Tom =====
    // מסמכים
    ['דרכון + צילום', '📄 מסמכים', 'FALSE', 'Tom'],
    ['ביטוח נסיעות (מודפס)', '📄 מסמכים', 'FALSE', 'Tom'],
    ['אישורי הזמנות מלונות', '📄 מסמכים', 'FALSE', 'Tom'],
    ['כרטיסי טיסה (מודפסים)', '📄 מסמכים', 'FALSE', 'Tom'],
    ['רישיון נהיגה בינלאומי', '📄 מסמכים', 'FALSE', 'Tom'],
    // ביגוד
    ['חולצות קצרות ×5', '👕 ביגוד', 'FALSE', 'Tom'],
    ['מכנסיים קצרות ×3', '👕 ביגוד', 'FALSE', 'Tom'],
    ['מכנסיים ארוכות ×1', '👕 ביגוד', 'FALSE', 'Tom'],
    ['בגד ים ×2', '👕 ביגוד', 'FALSE', 'Tom'],
    ['תחתונים ×8', '👕 ביגוד', 'FALSE', 'Tom'],
    ['גרביים ×3', '👕 ביגוד', 'FALSE', 'Tom'],
    ["חולצה ארוכה / קפוצ'ון דק", '👕 ביגוד', 'FALSE', 'Tom'],
    // נעליים
    ['סנדלים / כפכפים', '👟 נעליים', 'FALSE', 'Tom'],
    ['נעלי מים', '👟 נעליים', 'FALSE', 'Tom'],
    ['נעלי ספורט', '👟 נעליים', 'FALSE', 'Tom'],
    // אלקטרוניקה
    ['טלפון + מטען', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    ['מטען נייד (Power Bank)', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    ['אוזניות', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    ['מצלמה + כרטיס זיכרון', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    ['מתאם חשמל אוניברסלי', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    ['eSIM (להתקין מראש)', '🔌 אלקטרוניקה', 'FALSE', 'Tom'],
    // טואלטיקה
    ['קרם הגנה SPF50+', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    ['דאודורנט', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    ['משחת שיניים + מברשת', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    ['סכין גילוח', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    ['שמפו (מיני)', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    ['מגבת מיקרופייבר', '🧴 טואלטיקה', 'FALSE', 'Tom'],
    // בריאות
    ['תרופות אישיות', '💊 בריאות', 'FALSE', 'Tom'],
    ['אקמול / נורופן', '💊 בריאות', 'FALSE', 'Tom'],
    ['פלסטרים', '💊 בריאות', 'FALSE', 'Tom'],
    ['ספריי נגד יתושים', '💊 בריאות', 'FALSE', 'Tom'],
    ['כדורים לבחילה', '💊 בריאות', 'FALSE', 'Tom'],
    ["אלקוג'ל", '💊 בריאות', 'FALSE', 'Tom'],
    // חוף
    ['משקפי שמש', '🏖️ חוף', 'FALSE', 'Tom'],
    ['כובע', '🏖️ חוף', 'FALSE', 'Tom'],
    ['Dry Bag', '🏖️ חוף', 'FALSE', 'Tom'],
    ['נרתיק עמיד למים לטלפון', '🏖️ חוף', 'FALSE', 'Tom'],
    ['מסכת שנורקל', '🏖️ חוף', 'FALSE', 'Tom'],

    // ===== Dani =====
    // מסמכים
    ['דרכון + צילום', '📄 מסמכים', 'FALSE', 'Dani'],
    ['ביטוח נסיעות (מודפס)', '📄 מסמכים', 'FALSE', 'Dani'],
    ['אישורי הזמנות', '📄 מסמכים', 'FALSE', 'Dani'],
    ['כרטיסי טיסה', '📄 מסמכים', 'FALSE', 'Dani'],
    // ביגוד
    ['שמלות קלות ×3', '👗 ביגוד', 'FALSE', 'Dani'],
    ['חולצות ×4', '👗 ביגוד', 'FALSE', 'Dani'],
    ['מכנסיים קצרות ×2', '👗 ביגוד', 'FALSE', 'Dani'],
    ['חצאית / מכנסיים ארוכות ×1', '👗 ביגוד', 'FALSE', 'Dani'],
    ['בגד ים ×2', '👗 ביגוד', 'FALSE', 'Dani'],
    ['Cover-up', '👗 ביגוד', 'FALSE', 'Dani'],
    ['תחתונים ×8', '👗 ביגוד', 'FALSE', 'Dani'],
    ['חזייה ×3', '👗 ביגוד', 'FALSE', 'Dani'],
    ['חולצה ארוכה / סוודר דק', '👗 ביגוד', 'FALSE', 'Dani'],
    // נעליים
    ['סנדלים / כפכפים', '👟 נעליים', 'FALSE', 'Dani'],
    ['נעלי מים', '👟 נעליים', 'FALSE', 'Dani'],
    ['נעלי ספורט', '👟 נעליים', 'FALSE', 'Dani'],
    // אלקטרוניקה
    ['טלפון + מטען', '🔌 אלקטרוניקה', 'FALSE', 'Dani'],
    ['מטען נייד', '🔌 אלקטרוניקה', 'FALSE', 'Dani'],
    ['אוזניות', '🔌 אלקטרוניקה', 'FALSE', 'Dani'],
    // טואלטיקה
    ['קרם הגנה SPF50+', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['קרם לחות', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['דאודורנט', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['משחת שיניים + מברשת', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['שמפו + מרכך (מיני)', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['מברשת / גומיות לשיער', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    ['מייקאפ בסיסי', '🧴 טואלטיקה', 'FALSE', 'Dani'],
    // בריאות
    ['תרופות אישיות', '💊 בריאות', 'FALSE', 'Dani'],
    ['אקמול / נורופן', '💊 בריאות', 'FALSE', 'Dani'],
    ['פלסטרים', '💊 בריאות', 'FALSE', 'Dani'],
    ['ספריי נגד יתושים', '💊 בריאות', 'FALSE', 'Dani'],
    ['כדורים לבחילה', '💊 בריאות', 'FALSE', 'Dani'],
    ['מוצרי היגיינה אישית', '💊 בריאות', 'FALSE', 'Dani'],
    // חוף
    ['משקפי שמש', '🏖️ חוף', 'FALSE', 'Dani'],
    ['כובע', '🏖️ חוף', 'FALSE', 'Dani'],
    ['מסכת שנורקל', '🏖️ חוף', 'FALSE', 'Dani'],

    // ===== Shared =====
    // עזרה ראשונה
    ['ערכת עזרה ראשונה', '🏥 עזרה ראשונה', 'FALSE', 'Shared'],
    ['תרופות נגד שלשול', '🏥 עזרה ראשונה', 'FALSE', 'Shared'],
    ['מלח להשרייה (ORS)', '🏥 עזרה ראשונה', 'FALSE', 'Shared'],
    ['פלסטרים עמידים למים', '🏥 עזרה ראשונה', 'FALSE', 'Shared'],
    ['תחבושות', '🏥 עזרה ראשונה', 'FALSE', 'Shared'],
    // ציוד משותף
    ['מפצל / שקע חשמל', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    ['מתאם חשמל (Type A/B)', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    ['שקיות זיפלוק', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    ['כביסה - סבון + חבל', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    ['שקית כביסה', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    ['מנעול מזוודה', '🔧 ציוד משותף', 'FALSE', 'Shared'],
    // לטיסה
    ['כרית צוואר', '✈️ לטיסה', 'FALSE', 'Shared'],
    ['מסכת שינה', '✈️ לטיסה', 'FALSE', 'Shared'],
    ['אטמי אוזניים', '✈️ לטיסה', 'FALSE', 'Shared'],
    ['חטיפים לטיסה', '✈️ לטיסה', 'FALSE', 'Shared'],
    ['בקבוק מים (ריק)', '✈️ לטיסה', 'FALSE', 'Shared'],
    // נוחות
    ['תיק יום קטן', '🎒 נוחות', 'FALSE', 'Shared'],
    ['עט (לטפסים)', '🎒 נוחות', 'FALSE', 'Shared'],
    ['כסף מזומן (פסו)', '🎒 נוחות', 'FALSE', 'Shared'],
    ['כרטיסי אשראי', '🎒 נוחות', 'FALSE', 'Shared'],
  ];

  // Write all items starting at row 2
  if (items.length > 0) {
    sheet.getRange(2, 1, items.length, 4).setValues(items);
  }

  // Format header
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  sheet.autoResizeColumns(1, 4);

  Logger.log('Successfully populated ' + items.length + ' packing items.');
  SpreadsheetApp.getUi().alert('Done! Populated ' + items.length + ' packing items in the "packing" tab.');
}
