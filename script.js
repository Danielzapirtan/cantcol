const tbody = document.getElementById("tbody");
const nRecords = 31;
const dbItem = "db";

function saveDB() {
  const jsonDB = JSON.stringify(tbody);
  localStorage.setItem(dbItem, jsonDB);
}

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

const clearEl = document.querySelector(".clear");

clearEl.addEventListener("click", function(event) {
  localStorage.removeItem(dbItem);
  completeTable();
});

let isEditing = false;
const editEl = document.querySelector(".edit");

function toggleEditMode() {
  isEditing = !isEditing;
  const allTds = tbody.querySelectorAll("td");
  allTds.forEach(td => {
    if (isEditing) {
      clearEl.style.display = "none";
      editEl.style.background = "olive";
      const value = td.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      td.textContent = "";
      td.appendChild(input);
    } else {
      clearEl.style.display = "block";
      editEl.style.background = "blue";
      const input = td.querySelector("input");
      if (input) {
        td.textContent = input.value;
        input.remove();
      }
    }
  });
}

editEl.addEventListener("click", function(event) {
  event.preventDefault();
  toggleEditMode();
});

