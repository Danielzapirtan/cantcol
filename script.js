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

let isEditing = false;

function toggleEditMode() {
  isEditing = !isEditing;
  const allTds = tbody.querySelectorAll("td");
  allTds.forEach(td => {
    if (isEditing) {
      // Convert to input
      const value = td.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      td.textContent = "";
      td.appendChild(input);
    } else {
      // Save and revert to text
      const input = td.querySelector("input");
      if (input) {
        td.textContent = input.value;
      }
    }
  });
}

document.addEventListener("keydown", function(event) {
  if ((event.ctrlKey || event.metaKey) && (event.key === "i" || event.key === "I")) {
    event.preventDefault();
    toggleEditMode();
  }
});

