/* globals document, localStorage, Blob */
const donsole = document.querySelector('.donsole');
const tbody = document.getElementById('tbody');
const dbItem = 'db';
const usersItem = 'users';
const currentUserKey = 'currentUser';
let isEditing = false;
const numericCols = [4,5,6,7,8];

function log(message) {
  const date = new Date().toLocaleString();
  donsole.innerHTML = `<p>${date}: ${message}</p>`;
}

// Auth UI
const authBox = document.getElementById('auth');
const controls = document.getElementById('controls');
const docContainer = document.getElementById('doc');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
const logoutBtn = document.getElementById('logout');

function ensureDefaultUser() {
  const raw = localStorage.getItem(usersItem);
  let users = raw ? JSON.parse(raw) : {};
  if (!users.admin) {
    users.admin = 'admin';
    localStorage.setItem(usersItem, JSON.stringify(users));
  }
}

function showAppForUser(user) {
  authBox.style.display = 'none';
  controls.style.display = 'block';
  docContainer.style.display = 'block';
  log(`Utilizator: ${user} autentificat`);
}

function hideApp() {
  authBox.style.display = 'block';
  controls.style.display = 'none';
  docContainer.style.display = 'none';
  log('Aplicația este inaccesibilă fără autentificare');
}

loginBtn.addEventListener('click', () => {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  const raw = localStorage.getItem(usersItem);
  const users = raw ? JSON.parse(raw) : {};
  if (users[u] && users[u] === p) {
    localStorage.setItem(currentUserKey, u);
    showAppForUser(u);
    loadData();
  } else {
    log('Autentificare eșuată');
  }
});

registerBtn.addEventListener('click', () => {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  if (!u || !p) {
    log('Nume utilizator și parolă necesare');
    return;
  }
  const raw = localStorage.getItem(usersItem);
  const users = raw ? JSON.parse(raw) : {};
  users[u] = p;
  localStorage.setItem(usersItem, JSON.stringify(users));
  log('Utilizator înregistrat');
});

logoutBtn && logoutBtn.addEventListener('click', () => {
  localStorage.removeItem(currentUserKey);
  hideApp();
});

// Table management
function createRow(cells = []) {
  const tr = document.createElement('tr');
  const cols = 9; // number of columns
  for (let i = 0; i < cols; i++) {
    const td = document.createElement('td');
    td.textContent = cells[i] || '';
    tr.appendChild(td);
  }
  return tr;
}

function addBlankRecord() {
  log('Adaugă rând gol');
  const tr = createRow();
  tbody.appendChild(tr);
  computeTotals();
  return tr;
}

// Controls
const clearEl = document.querySelector('.clear');
const saveEl = document.querySelector('.save');
const loadEl = document.querySelector('.load');
const addEl = document.querySelector('.add');
const editEl = document.querySelector('.edit');
const exportCsvEl = document.querySelector('.export-csv');
const exportXlsEl = document.querySelector('.export-xls');
const exportJsonEl = document.querySelector('.export-json');

addEl && addEl.addEventListener('click', addBlankRecord);

clearEl && clearEl.addEventListener('click', () => {
  log('Șterge rând');
  const rows = Array.from(tbody.querySelectorAll('tr'));
  if (rows.length === 0) return;
  rows[rows.length - 1].remove();
  computeTotals();
});

saveEl && saveEl.addEventListener('click', () => {
  log('Salvează...');
  if (!validateInputs()) {
    log('Salvare oprită din cauza unor valori invalide.');
    return;
  }
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const data = rows.map(r => Array.from(r.children).map(td => {
    const input = td.querySelector('input');
    return input ? input.value : td.textContent || '';
  }));
  localStorage.setItem(dbItem, JSON.stringify(data));
  log('Date salvate local');
});

function validateInputs() {
  let ok = true;
  const rows = Array.from(tbody.querySelectorAll('tr'));
  rows.forEach(r => {
    numericCols.forEach(idx => {
      const td = r.children[idx];
      if (!td) return;
      const input = td.querySelector('input');
      const raw = input ? input.value.trim() : (td.textContent || '').trim();
      if (raw === '') {
        // empty is allowed
        if (input) input.classList.remove('invalid');
        td.classList.remove('invalid-cell');
        return;
      }
      const num = Number(String(raw).replace(',', '.'));
      if (isNaN(num) || num < 0) {
        ok = false;
        if (input) input.classList.add('invalid');
        else td.classList.add('invalid-cell');
      } else {
        if (input) input.classList.remove('invalid');
        td.classList.remove('invalid-cell');
      }
    });
  });
  if (!ok) log('Există valori numerice invalide (non-numerice sau negative).');
  return ok;
}

function clearTable() {
  while (tbody.firstChild) tbody.removeChild(tbody.firstChild);
}

function loadData() {
  log('Încarcă date...');
  clearTable();
  const raw = localStorage.getItem(dbItem);
  if (!raw) {
    // seed with an empty row
    addBlankRecord();
    computeTotals();
    return;
  }
  try {
    const data = JSON.parse(raw);
    data.forEach(row => {
      const tr = createRow(row);
      tbody.appendChild(tr);
    });
    computeTotals();
    log('Date încărcate');
  } catch (e) {
    log('Eroare la încărcare: date corupte');
  }
}

loadEl && loadEl.addEventListener('click', loadData);

// Edit mode toggles inputs for all cells
function toggleEditMode() {
  isEditing = !isEditing;
  const rows = Array.from(tbody.querySelectorAll('tr'));
  rows.forEach(row => {
    Array.from(row.children).forEach((td, idx) => {
      if (isEditing) {
        const value = td.textContent;
        td.textContent = '';
        const input = document.createElement('input');
        if (numericCols.includes(idx)) {
          input.type = 'number';
          input.step = '0.01';
          input.min = '0';
          // keep empty string if cell empty
          input.value = value || '';
        } else {
          input.type = 'text';
          input.value = value || '';
        }
        input.style.width = '100%';
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          computeTotals();
        });
        td.appendChild(input);
      } else {
        const input = td.querySelector('input');
        if (input) {
          if (numericCols.includes(idx)) {
            const n = toNumber(input.value);
            td.textContent = n !== 0 ? n.toFixed(2) : '';
            input.classList.remove('invalid');
          } else {
            td.textContent = input.value;
          }
        }
      }
    });
  });
  editEl.style.background = isEditing ? '#2eb' : '#aaf';
  computeTotals();
}

editEl && editEl.addEventListener('click', (e) => {
  e.preventDefault();
  toggleEditMode();
});

// Exports
function tableToArray() {
  const rows = Array.from(tbody.querySelectorAll('tr'));
  return rows.map(r => Array.from(r.children).map(td => {
    const input = td.querySelector('input');
    return input ? input.value : td.textContent || '';
  }));
}

function exportToCsv(filename = 'export.csv') {
  const header = ['Nr. crt.', 'Data', 'Document', 'Descriere', 'Încasări Numerar', 'Încasări Bancă', 'Plăți Numerar', 'Plăți Bancă', 'Deducibil (RON)'];
  const data = tableToArray();
  const lines = [header, ...data];
  // use semicolon for Romanian locale
  const csv = lines.map(r => r.map(cell => '"' + String(cell).replace(/"/g, '""') + '"').join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  log('Export CSV generat');
}

function exportToJson(filename = 'export.json') {
  const data = tableToArray();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  log('Export JSON generat');
}

exportCsvEl && exportCsvEl.addEventListener('click', () => {
  if (!validateInputs()) { log('Export oprit din cauza unor valori invalide.'); return; }
  exportToCsv('registru.csv');
});
exportXlsEl && exportXlsEl.addEventListener('click', () => {
  if (!validateInputs()) { log('Export oprit din cauza unor valori invalide.'); return; }
  exportToCsv('registru.xls');
});
exportJsonEl && exportJsonEl.addEventListener('click', () => {
  if (!validateInputs()) { log('Export oprit din cauza unor valori invalide.'); return; }
  exportToJson('registru.json');
});

// Totals and basic numeric parsing
function toNumber(v) {
  if (!v) return 0;
  // accept comma or dot
  return Number(String(v).trim().replace(',', '.')) || 0;
}

function computeTotals() {
  const rows = Array.from(tbody.querySelectorAll('tr'));
  let incCash = 0, incBank = 0, expCash = 0, expBank = 0, ded = 0;
  rows.forEach(r => {
    const cells = Array.from(r.children).map(td => {
      const input = td.querySelector('input');
      return input ? input.value : td.textContent;
    });
    incCash += toNumber(cells[4]);
    incBank += toNumber(cells[5]);
    expCash += toNumber(cells[6]);
    expBank += toNumber(cells[7]);
    ded += toNumber(cells[8]);
  });
  document.getElementById('tot-inc-cash').textContent = incCash.toFixed(2);
  document.getElementById('tot-inc-bank').textContent = incBank.toFixed(2);
  document.getElementById('tot-exp-cash').textContent = expCash.toFixed(2);
  document.getElementById('tot-exp-bank').textContent = expBank.toFixed(2);
  document.getElementById('tot-deduct').textContent = ded.toFixed(2);
}

// Save inputs back to cells when leaving edit mode
document.addEventListener('input', (e) => {
  if (!isEditing) return;
  // allow live compute if editing numeric fields
});

// Initialization
(function init() {
  ensureDefaultUser();
  const current = localStorage.getItem(currentUserKey);
  if (current) {
    showAppForUser(current);
    loadData();
  } else {
    hideApp();
  }
})();

// Recompute totals periodically (for when user types in inputs)
setInterval(() => {
  computeTotals();
}, 800);
