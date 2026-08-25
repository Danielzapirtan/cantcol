const errorEl = document.getElementById("errorEl");
const tbody = document.getElementById("tbody");
const nRecords = 30;
const nCols = 8;
let db;
let cold;
const dbItem = "db";

function initDB() {
  db = [];
  let recordIX;
  const record = [];
  for (recordIX = 0; recordIX < nRecords; recordIX++) {
    let u;
    for (u = 0; u < nCols; u++) {
      const value = "";
      record.push(value);
    }
    db.push(record);
  }
  cold = true;
}

function saveDB() {
  const jsonDB = JSON.stringify({"db": db, "cold": cold});
  localStorage.setItem(dbItem, jsonDB);
}

function loadDB() {
  const jsonDB = localStorage.getItem(dbItem);
  const dbCold = JSON.parse(jsonDB);
  db = dbCold.db;
  cold = dbCold.cold;
}

function addRecord(record) {
  const tr = document.createElement("tr");
  let u;
  for (u = 0; u < 8; u++) {
    const td = document.createElement("td");
    td.textContent = db[record][u];
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}

function completeTable() {
  let record;
  for (record = 0; record < nRecords; record++) {
    addRecord(record);
  }
}

function resetDB() {
  initDB();
  completeTable();
  cold = true;
  saveDB();
}

function condLoadDB() {
  if (localStorage.getItem(dbItem)) {
    loadDB();
  } else {
    resetDB();
  }
}

function updateDB(idx, value) {
  const row = idx / nCols;
  const col = idx % nCols;
  db[row][col] = value;
  saveDB();
}

function onLoad() {
  resetDB();
  condLoadDB();
}

onLoad();
