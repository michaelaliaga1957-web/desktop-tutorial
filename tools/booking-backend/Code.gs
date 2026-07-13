/**
 * Esplendor Detailing — Booking Backend (Google Apps Script)
 *
 * Receives booking-form submissions from esplendordetailing.com and:
 *   1. Appends the lead to the "Bookings" sheet (your real CRM database)
 *   2. Emails you instantly (and optionally texts you via carrier SMS gateway)
 *   3. Sends the customer a branded confirmation email (if they gave one)
 *
 * Runs alongside Formspree (which stays as backup/archive). Free forever;
 * Gmail quota is 100 emails/day — far above current volume.
 *
 * SETUP: see SETUP.md in this folder. Paste this file into Extensions →
 * Apps Script of a Google Sheet, then deploy as a Web app (access: Anyone).
 */

// ═══ CONFIG ═══════════════════════════════════════════════════════════
const OWNER_EMAIL = 'michaelaliaga1957@gmail.com';

// OPTIONAL — free SMS on every booking via your carrier's email-to-SMS
// gateway. Fill in with YOUR number at YOUR carrier's gateway, e.g.:
//   T-Mobile:  '7135010461@tmomail.net'
//   AT&T:      '7135010461@txt.att.net'
//   Verizon:   '7135010461@vtext.com'
// Leave '' to disable.
const SMS_GATEWAY_EMAIL = '';

const BUSINESS_NAME  = 'Esplendor Detailing';
const BUSINESS_PHONE = '713-501-0461';
const WHATSAPP_LINK  = 'https://wa.me/17135010461';
const SHEET_NAME     = 'Bookings';
const REVIEW_LINK    = 'https://g.page/r/CViSYen6e8RIEBM/review';
// ══════════════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const p = (e && e.parameter) || {};
    if (p._gotcha) return jsonOut({ ok: true }); // spam honeypot — pretend success

    const lead = {
      timestamp: new Date(),
      name:    clean(p.name),
      phone:   clean(p.phone),
      email:   clean(p.email),
      vehicle: clean(p.vehicle),
      pkg:     clean(p.package),
      addons:  clean(p.addons),
      date:    clean(p.preferred_date),
      time:    clean(p.preferred_time),
      address: clean(p.address),
      notes:   clean(p.notes)
    };
    if (!lead.name && !lead.phone) return jsonOut({ ok: false, error: 'empty' });

    appendToSheet(lead);
    notifyOwner(lead);
    if (lead.email) sendCustomerConfirmation(lead);

    return jsonOut({ ok: true });
  } catch (err) {
    // Failures must never be silent — email the error to the owner.
    try { MailApp.sendEmail(OWNER_EMAIL, '⚠️ Esplendor booking system error', String(err && err.stack || err)); } catch (ignored) {}
    return jsonOut({ ok: false });
  }
}

function clean(v) { return (v || '').toString().trim().substring(0, 500); }

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function appendToSheet(lead) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Received', 'Name', 'Phone', 'Email', 'Vehicle', 'Package',
                     'Add-ons', 'Preferred date', 'Preferred time', 'Address', 'Notes', 'Status']);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([lead.timestamp, lead.name, lead.phone, lead.email, lead.vehicle,
                   lead.pkg, lead.addons, lead.date, lead.time, lead.address, lead.notes, 'NEW']);
}

function notifyOwner(lead) {
  const subject = '🚗 NEW BOOKING — ' + lead.name + ' — ' + (lead.pkg || 'no package');
  const body =
    'New booking request from esplendordetailing.com\n' +
    '────────────────────────────\n' +
    'Name:      ' + lead.name + '\n' +
    'Phone:     ' + lead.phone + '\n' +
    'Email:     ' + (lead.email || '—') + '\n' +
    'Vehicle:   ' + lead.vehicle + '\n' +
    'Package:   ' + lead.pkg + '\n' +
    'Add-ons:   ' + (lead.addons || 'None') + '\n' +
    'Date:      ' + lead.date + '\n' +
    'Time:      ' + lead.time + '\n' +
    'Address:   ' + lead.address + '\n' +
    'Notes:     ' + (lead.notes || '—') + '\n' +
    '────────────────────────────\n' +
    'Call now: ' + lead.phone + '\n' +
    'Remember: confirm within 1 hour (website promise).';
  MailApp.sendEmail(OWNER_EMAIL, subject, body);

  if (SMS_GATEWAY_EMAIL) {
    // SMS gateways truncate ~160 chars — keep it tight.
    const sms = 'NEW BOOKING: ' + lead.name + ' ' + lead.phone + ' · ' +
                lead.pkg + ' · ' + lead.date + ' ' + lead.time;
    MailApp.sendEmail(SMS_GATEWAY_EMAIL, '', sms.substring(0, 155));
  }
}

function sendCustomerConfirmation(lead) {
  const subject = '✅ Booking received — ' + BUSINESS_NAME;
  const html =
'<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e0d5;">' +
  '<div style="background:#0b0b0b;padding:28px;text-align:center;">' +
    '<div style="color:#c9a84c;font-size:22px;font-weight:bold;letter-spacing:2px;">ESPLENDOR DETAILING</div>' +
    '<div style="color:#999;font-size:11px;letter-spacing:3px;margin-top:6px;">HOUSTON, TX</div>' +
  '</div>' +
  '<div style="padding:28px;">' +
    '<h2 style="color:#0b0b0b;margin:0 0 12px;">You\'re all set, ' + esc(lead.name) + '! ✅</h2>' +
    '<p style="color:#444;line-height:1.6;">We received your booking request and will <b>confirm your appointment within 1 hour</b> by call or text.</p>' +
    '<p style="color:#777;font-size:13px;line-height:1.6;"><i>Recibimos tu solicitud de reserva y <b>confirmaremos tu cita en 1 hora</b> por llamada o mensaje.</i></p>' +
    '<table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:14px;color:#333;">' +
      row('Vehicle', lead.vehicle) +
      row('Package', lead.pkg) +
      row('Add-ons', lead.addons || 'None') +
      row('Preferred date', lead.date) +
      row('Preferred time', lead.time) +
      row('Service address', lead.address) +
    '</table>' +
    '<p style="color:#444;line-height:1.6;">Need to change anything or reach us sooner?<br>' +
    '📞 Call or text <a href="tel:' + BUSINESS_PHONE.replace(/-/g,'') + '" style="color:#8a6d2f;font-weight:bold;">' + BUSINESS_PHONE + '</a>' +
    ' &nbsp;·&nbsp; 💬 <a href="' + WHATSAPP_LINK + '" style="color:#8a6d2f;font-weight:bold;">WhatsApp</a></p>' +
    '<p style="color:#444;line-height:1.6;">Remember: <b>no payment until after you inspect the finished work.</b></p>' +
  '</div>' +
  '<div style="background:#f6f3ec;padding:16px;text-align:center;color:#8a6d2f;font-size:11px;letter-spacing:2px;">ESPLENDOR DETAILING · WE COME TO YOU</div>' +
'</div>';

  MailApp.sendEmail({
    to: lead.email,
    subject: subject,
    htmlBody: html,
    name: BUSINESS_NAME,
    replyTo: OWNER_EMAIL
  });
}

function row(label, value) {
  return '<tr><td style="padding:7px 10px;border:1px solid #eee;background:#fafafa;width:40%;color:#8a6d2f;font-weight:bold;">' +
         label + '</td><td style="padding:7px 10px;border:1px solid #eee;">' + esc(value) + '</td></tr>';
}

function esc(t) {
  return (t || '').toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ═══ REVIEW ENGINE ════════════════════════════════════════════════════
// Marks-job-done → auto-sends the customer a branded review request.
// Trigger it 3 ways: (a) the "Esplendor" menu in the Sheet, (b) an hourly
// time trigger (see SETUP.md), or (c) manually run processReviewRequests().
//
// How it decides who to ask: any row whose Status contains "paid",
// "complete", or "done", that has an email, and hasn't been asked yet
// (blank "Review Sent" column). It then stamps "Review Sent" so nobody
// is ever double-asked.

/** Adds a custom menu to the Sheet on open. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⭐ Esplendor')
    .addItem('Send pending review requests', 'processReviewRequests')
    .addItem('Preview review email (to me)', 'previewReviewEmail')
    .addToUi();
}

function processReviewRequests() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return _toast('No "' + SHEET_NAME + '" sheet yet.');

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return _toast('No bookings yet.');

  const header = data[0].map(h => String(h).toLowerCase().trim());
  let cEmail  = header.indexOf('email');
  let cName   = header.indexOf('name');
  let cStatus = header.indexOf('status');
  let cSent   = header.indexOf('review sent');

  // Add the "Review Sent" column if this sheet predates the review engine.
  if (cSent === -1) {
    cSent = header.length;
    sheet.getRange(1, cSent + 1).setValue('Review Sent');
  }
  if (cEmail === -1 || cStatus === -1) return _toast('Missing Email/Status columns.');

  let sent = 0;
  for (let r = 1; r < data.length; r++) {
    const status = String(data[r][cStatus] || '').toLowerCase();
    const email  = String(data[r][cEmail]  || '').trim();
    const already = String(data[r][cSent]  || '').trim();
    const isDone = /paid|complete|done/.test(status);
    if (isDone && email && email.indexOf('@') > 0 && !already) {
      try {
        sendReviewRequest({ name: String(data[r][cName] || '').trim(), email: email });
        sheet.getRange(r + 1, cSent + 1).setValue(new Date());
        sent++;
      } catch (err) {
        MailApp.sendEmail(OWNER_EMAIL, '⚠️ Review-request error', String(err));
      }
    }
  }
  _toast(sent ? ('Sent ' + sent + ' review request' + (sent > 1 ? 's' : '') + '. 🙌') : 'No pending review requests. Mark a job "Paid" first.');
}

function sendReviewRequest(lead) {
  const first = (lead.name || '').split(' ')[0] || 'there';
  const subject = 'How did we do, ' + first + '? ⭐ — ' + BUSINESS_NAME;
  const html =
'<div style="font-family:Arial,Helvetica,sans-serif;max-width:540px;margin:0 auto;border:1px solid #e5e0d5;">' +
  '<div style="background:#0b0b0b;padding:26px;text-align:center;">' +
    '<div style="color:#c9a84c;font-size:20px;font-weight:bold;letter-spacing:2px;">ESPLENDOR DETAILING</div>' +
  '</div>' +
  '<div style="padding:28px;">' +
    '<h2 style="color:#0b0b0b;margin:0 0 12px;">Thank you, ' + esc(first) + '! 🙌</h2>' +
    '<p style="color:#444;line-height:1.6;">It was a pleasure detailing your vehicle. We\'re a new Houston business, and a quick Google review helps more than you know — it takes 30 seconds and helps your neighbors find us.</p>' +
    '<p style="color:#777;font-size:13px;line-height:1.6;"><i>Fue un placer detallar tu vehículo. Una reseña rápida en Google nos ayuda muchísimo — toma 30 segundos.</i></p>' +
    '<div style="text-align:center;margin:26px 0;">' +
      '<a href="' + REVIEW_LINK + '" style="display:inline-block;background:#c9a84c;color:#0b0b0b;font-weight:bold;font-size:15px;letter-spacing:1px;text-decoration:none;padding:15px 34px;">★ Leave a Google Review</a>' +
    '</div>' +
    '<p style="color:#444;line-height:1.6;">Not perfectly happy? <b>Reply to this email or text ' + BUSINESS_PHONE + '</b> and we\'ll make it right — that matters more to us than any review.</p>' +
    '<p style="color:#444;line-height:1.6;">Thanks again,<br>The Esplendor Detailing Team</p>' +
  '</div>' +
  '<div style="background:#f6f3ec;padding:14px;text-align:center;color:#8a6d2f;font-size:11px;letter-spacing:2px;">ESPLENDOR DETAILING · HOUSTON, TX</div>' +
'</div>';
  MailApp.sendEmail({ to: lead.email, subject: subject, htmlBody: html, name: BUSINESS_NAME, replyTo: OWNER_EMAIL });
}

/** Sends the review email to yourself so you can see exactly what customers get. */
function previewReviewEmail() {
  sendReviewRequest({ name: 'Michael', email: OWNER_EMAIL });
  _toast('Preview review email sent to ' + OWNER_EMAIL);
}

function _toast(msg) {
  try { SpreadsheetApp.getActiveSpreadsheet().toast(msg, 'Esplendor Review Engine', 6); } catch (e) {}
  return msg;
}
// ══════════════════════════════════════════════════════════════════════

/** Run this once from the editor (▶ Run) to authorize email + sheet access
 *  and send yourself a test notification. */
function testSystem() {
  const fake = {
    timestamp: new Date(), name: 'TEST — System Check', phone: '000-000-0000',
    email: OWNER_EMAIL, vehicle: '2020 Test Car', pkg: 'SuperWash (Inside & Out) — $129.99',
    addons: 'None', date: '2026-07-10', time: '9:00 AM – 11:00 AM',
    address: '123 Test St, Houston TX', notes: 'If you got this, the system works.'
  };
  appendToSheet(fake);
  notifyOwner(fake);
  sendCustomerConfirmation(fake);
}
