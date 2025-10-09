import { getUserIds, getData, getFutureAgendas, addAgenda } from "./common.mjs";
//tels the browser to run the code when the page is fully loaded
window.onload = function () {
  const dropdown = document.getElementById("userDropdown");
  const msg = document.getElementById("noAgendaMsg");
  const form = document.getElementById("agendaForm");
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const formErrorMsg = document.getElementById("formErrorMsg");

  // Load users into dropdown
  const users = getUserIds();
  users.forEach(userId => {
    const option = document.createElement("option");
    option.value = userId;
    option.text = userId;
    dropdown.appendChild(option);
  });

  // Event listener for dropdown change
  dropdown.addEventListener("change", function () {
    const selectedUserId = dropdown.value;
    displayAgendas(selectedUserId);
  });

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedUserId = dropdown.value.trim();
    const task = taskInput.value.trim();
    const date = dateInput.value;

    // Validation
    if (!selectedUserId) {
      showError("Please select a user before adding an agenda.");
      return;
    }
    if (!task || !date) {
      showError("Please fill in both the task and date.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);

    if (selectedDate < today) {
      showError("The date must not be in the past.");
      return;
    }

    // Add the new agenda
    addAgenda(selectedUserId, task, date);

    // Clear form and error
    form.reset();
    formErrorMsg.style.display = "none";

    // Refresh the table
    displayAgendas(selectedUserId);
  });

  // Helper: show validation errors
  function showError(message) {
    formErrorMsg.innerText = message;
    formErrorMsg.style.display = "block";
  }

  // Helper: display agendas for a user
  function displayAgendas(userId) {
    const tableBody = document.getElementById("agendaTableBody");
    const agenda = getData(userId);
    const futureAgendas = getFutureAgendas(agenda);

    tableBody.innerHTML = "";

    if (!futureAgendas.length) {
      msg.style.display = "block";
      return;
    } else {
      msg.style.display = "none";
    }

    futureAgendas.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.task}</td><td>${item.date}</td>`;
      tableBody.appendChild(row);
    });
  }
};