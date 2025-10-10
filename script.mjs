// Handles user interactions, form validation, and agenda display logic for the Spaced Repetition Tracker.

import { getUserIds, getData, getFutureAgendas, addAgenda } from "./common.mjs";

// Tells the browser to run the code when the page is fully loaded
window.onload = function () {
  const dropdown = document.getElementById("userDropdown");
  const msg = document.getElementById("noAgendaMsg");
  const form = document.getElementById("agendaForm");
  const topicInput = document.getElementById("topicInput");
  const dateInput = document.getElementById("dateInput");
  const formErrorMsg = document.getElementById("formErrorMsg");

  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;

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
    const topic = topicInput.value.trim();
    const date = dateInput.value;

    // Validation
    if (!selectedUserId) {
      showError("Please select a user before adding an agenda.");
      return;
    }
    if (!topic || !date) {
      showError("Please fill in both the topic and date.");
      return;
    }

    // Add the new agenda
    addAgenda(selectedUserId, topic, date);

    // Clear form and error
    form.reset();
    dateInput.value = today; // Reset to today after submit
    formErrorMsg.hidden = true;

    // Refresh the table
    displayAgendas(selectedUserId);
  });

  // Helper: show validation errors
  function showError(message) {
    formErrorMsg.innerText = message;
    formErrorMsg.hidden = false;
  }

  // Helper: display agendas for a user
  function displayAgendas(userId) {
    const tableBody = document.getElementById("agendaTableBody");
    const agenda = getData(userId);
    const futureAgendas = getFutureAgendas(agenda);

    tableBody.innerHTML = "";

    if (!futureAgendas.length) {
      msg.hidden = false;
      return;
    } else {
      msg.hidden = true;
    }

    futureAgendas.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.topic}</td><td>${item.date}</td>`;
      tableBody.appendChild(row);
    });
  }
};