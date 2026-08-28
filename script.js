const donsole = document.querySelector(".donsole");
const tbody = document.getElementById("tbody");
const dbItem = "db";

function log(message) {
  const date = new Date();
  donsole.innerHTML += `<p>${date}: ${message}</p>`;
}

function addBlankRecord() {
  log(`Button Add pressed!`);
  const tr = document.createElement("tr");
  let u;
  for (u = 0; u < 8; u++) {
    const td = document.createElement("td");
    td.textContent = "";
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
  return tr;
}

const clearEl = document.querySelector(".clear");
const saveEl = document.querySelector(".save");
const loadEl = document.querySelector(".load");
const addEl = document.querySelector(".add");

/*saveEl.addEventListener("click", (e) => {
  log(`Button Save pressed!`);
  const allTdEls = tbody.querySelectorAll("td");
  const allTds = [];
  allTdEls.forEach((td) => {
    allTds.push(td.textContent);
  });
  const jsonDB = JSON.stringify(allTds);
  localStorage.setItem(dbItem, jsonDB);
});

loadEl.addEventListener("click", (e) => {
  log(`Button Load pressed!`);
  const jsonDB = localStorage.getItem(dbItem);
  const allTds = JSON.parse(jsonDB);
  const count = allTds.length / 8;
  let idx = 0;
  for (let r = 0; r < count - 2; r++) {
    const tr = addBlankRecord();
    const allTdEls = tr.querySelectorAll("td");
    allTdEls.forEach((td) => {
      td.textContent = allTds[idx + 16];
      idx++;
    });
  }
});

addEl.addEventListener("click", addBlankRecord);

clearEl.addEventListener("click", function(event) {
  log(`Button Delete pressed!`);
  const allTrs = tbody.querySelectorAll("tr");
  if (allTrs.length < 3)
    return;
  const lastTr = tbody.lastChild;
  lastTr.remove();
});

let isEditing = false;
const editEl = document.querySelector(".edit");

function toggleEditMode() {
  log(`Button Edit pressed!`);
  isEditing = !isEditing;
  const lastTr = tbody.lastChild;
  const allTds = lastTr.querySelectorAll("td");
  allTds.forEach(td => {
    if (isEditing) {
      clearEl.style.display = "none";
      editEl.style.background = "#2eb";
      const value = td.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      td.textContent = "";
      td.appendChild(input);
    } else {
      clearEl.style.display = "block";
      editEl.style.background = "#aaf";
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
*/
