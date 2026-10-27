SKU LIVE SCANNER — INSTALLABLE ANDROID PWA
==========================================

Ito ay installable WEB APP (PWA), HINDI .APK file.
Gumagana bilang standalone app na may sariling icon sa Android phone.
Kailangan ng HTTPS hosting at internet para sa pag-save sa Google Sheets.

FILES:
- index.html          Scanner UI, camera & Google Sheets connection
- manifest.webmanifest Android install metadata
- sw.js               App shell service worker
- icons/icon-192.png  App icon
- icons/icon-512.png  App icon

PAG-INSTALL SA PHONE:
1. Sa GitHub, gumawa ng PUBLIC repo (hal. sku-live-scanner).
2. I-upload ang LAHAT ng laman ng folder na ito sa ROOT ng repo.
   Siguraduhing parehong nandoon ang index.html, manifest.webmanifest,
   sw.js, at icons/ folder.
3. GitHub repo > Settings > Pages > Deploy from a branch > main > /(root) > Save.
4. Hintaying lumabas ang "Visit site"/HTTPS URL sa Pages settings.
5. Sa ANDROID CHROME, buksan ang HTTPS URL ng site.
6. Tap "INSTALL SA ANDROID", o Chrome three-dot menu >
   Add to Home screen > Install app.
7. Buksan ang SKU Scanner sa home screen (parang app).
8. Buksan ang "Google Sheets connection" sa loob ng app.
   I-paste ang existing Apps Script Web App URL (/exec) at Scanner Access Key.
   Pindutin ang SAVE CONNECTION.
9. Pindutin ang START CAMERA (kung hindi automatic nag-start).
   Allow Camera permission.
10. Itutok ang barcode. Kapag Auto-save ay naka-check,
    diretsong ise-save ang SKU sa scan sheet.

GOOGLE SHEETS BACKEND:
- Gumagana ito kasama ng Apps Script backend patch na ibinigay sa
  naunang usapan, na may doGet(e) at handleExternalSave_(p).
- Dapat may Script property: SCAN_ACCESS_KEY = same value na ilalagay sa app.
- Kailangang deployed web app na Execute as: Me, Who has access: Anyone
  upang matawag ng hosted page. Piliing baguhin lamang kung awtorisado.
- Ang original saveSKU(sku,location,qty) sa Apps Script ay dapat nandoon pa rin.
- Sa bawat edit ng Code.gs, Deploy > Manage deployments > Edit > New version.

IMPORTANTENG PAALALA SA SECURITY:
- Sa kasalukuyang Apps Script JSONP setup, ginagamit ang GET request
  kasama ang access key sa URL. HINDI ito production-secure.
- Ang public web app endpoint ay maaaring tawagin ng iba kung makuha nila
  ang URL at key. Huwag gamitin ito para sa confidential o company inventory
  nang walang company IT approval at mas maayos na authentication.
- Huwag ilagay ang key sa GitHub repo o i-share ang URL ng key.
- Ang camera ay nangangailangan ng camera permission at HTTPS.
- Hindi puwedeng simpleng buksan ang lokal na index.html gamit ang Files:
  kailangan naka-host sa HTTPS para sa camera/install.
- Kung na-save nang hindi na-confirm dahil sa timeout, tingnan muna
  ang Google Sheets bago i-rescan ang parehong SKU (iwas duplicate).
- Ang app shell ay maaaring bumukas offline; Google Sheets saving ay online.

HINDI ITO APK:
Kung ang kailangan ay .apk file na idadaan sa "Install unknown apps",
kailangan ng Android Studio / Android build environment o APK packaging
service; wala pang APK sa package na ito.
