// Placeholder notification utilities (email / SMS / in-app queue)
// These are UI-side stubs to be replaced with real provider integrations.

export function enqueueNotification(recipient, type, payload) {
  // Simple in-memory / localStorage queue for demo purposes
  try {
    const key = 'agis_notifications';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const item = { id: Date.now(), recipient, type, payload };
    existing.unshift(item);
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 100)));
    console.log('Enqueued notification:', item);
    return item;
  } catch (err) {
    console.log('enqueueNotification (fallback):', { recipient, type, payload });
    return null;
  }
}

export function sendEmail(to, subject, body) {
  // Placeholder — swap with real email provider integration
  console.log(`sendEmail -> to=${to}, subject=${subject}`, body);
  return Promise.resolve({ success: true });
}

export function sendSMS(to, message) {
  // Placeholder — swap with real SMS provider integration
  console.log(`sendSMS -> to=${to}`, message);
  return Promise.resolve({ success: true });
}

export default { enqueueNotification, sendEmail, sendSMS };
