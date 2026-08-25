const tbody = document.getElementById("tbody");
const nRecords = 31;
function addBlankRecord() {
  const tr = document.createElement("tr");
  let u;
  for (u = 0; u < 8; u++) {
    const td = document.createElement("td");
    td.textContent = "";
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
function completeTable() {
  let record;
  for (record = 0; record < nRecords - 1; record++) {
    addBlankRecord();
  }
}
completeTable();

