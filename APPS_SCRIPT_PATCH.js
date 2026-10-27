/*
  KUHA NG TAMANG BACKEND:
  1) Sa existing Code.gs, HANAPIN ang current function doGet() at PALITAN ito
     ng doGet(e) dito. Huwag mag-iwan ng dalawang doGet functions.
  2) IDAGDAG ang function handleExternalSave_ sa Code.gs.
  3) HUWAG burahin ang existing saveSKU(sku, location, qty)
     at scannerHTML_() functions.
  4) Apps Script > Project Settings > Script properties: add
     SCAN_ACCESS_KEY = your long private random key (e.g. 25-40 characters).
  5) Deploy updated Web App as Execute as: Me, Who has access: Anyone.
     It is a public endpoint protected by this basic access key. Use only
     for a low-sensitivity workflow, not confidential corporate inventory.
*/
function doGet(e) {
  const p = e && e.parameter ? e.parameter : {};
  if (p.action === 'save') return handleExternalSave_(p);
  return scannerHTML_(); // keeps existing sidebar-compatible web page
}

function handleExternalSave_(p) {
  const callback = String(p.callback || '');
  if (!/^scanCB_[A-Za-z0-9_]{1,80}$/.test(callback)) {
    return ContentService.createTextOutput('Invalid callback');
  }

  let result;
  try {
    const expected = PropertiesService.getScriptProperties()
      .getProperty('SCAN_ACCESS_KEY');

    if (!expected || String(p.key || '') !== expected) {
      throw new Error('Invalid scanner access key');
    }

    const sku = String(p.sku || '').trim();
    const location = String(p.location || '').trim();
    const qty = String(p.qty || '').trim();

    if (!sku || sku.length > 150) throw new Error('Invalid SKU');
    if (location.length > 100) throw new Error('Location is too long');

    // Reuse the existing locked saver in Code.gs.
    const saved = saveSKU(sku, location, qty);
    result = {ok:true, row:saved.row, sku:saved.sku};
  } catch(err) {
    result = {ok:false, error:String(err.message || err)};
  }

  const payload = JSON.stringify(result)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return ContentService.createTextOutput(callback + '(' + payload + ');')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
