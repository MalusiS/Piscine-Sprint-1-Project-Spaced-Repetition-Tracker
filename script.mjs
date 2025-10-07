// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, getFutureAgendas } from "./common.mjs";

//window.onload = function () {
 // const users = getUserIds();
 // document.querySelector("body").innerText = `There are ${users.length} users`;
//};

window.onload = function () {
  const dropdown = document.getElementById("userDropdown")
  const msg = document.getElementById("noAgendaMsg");

  //loading the IDs into the dropdown
  const users = getUserIds();
  users.forEach(userId => {
    const option = document.createElement("option");
    option.value = userId;
    option.text = userId;
    dropdown.appendChild(option);
  });
//event listener for when the user selects an option
  dropdown.addEventListener("change", function() {
  const selectedUserId = dropdown.value; 
  console.log("Selected user ID:", selectedUserId);

//get agenda for selected user
  const agenda = getData(selectedUserId);
  console.log("Agenda:", agenda);

  //handling the no agenda message
  if (!agenda || agenda.length === 0) {
    msg.style.display = "block";
    return;// if thesres no agenda the function should stop
  } else {
    msg.style.display = "none";
  }

  //filtering and sorting future agendas
  const futureAgendas = getFutureAgendas(agenda);
  console.log("Future Agendas:", futureAgendas);
  
  //display in the table
  display(futureAgendas)
  });
};

//function to display agendas in the table
function display(futureAgendas) {
  const table = document.getElementById("agendaTableBody")
  table.innerHTML = ""; //ALLOW TO clear old data.

  //this our for lopp that goes through every agenda creates a atbale row with 2 cells date and task and appends it to the table through appendChild method
  futureAgendas.forEach(item => {
    const row = document.createElement("tr");
     row.innerHTML = `
      <td>${item.task}</td>
      <td>${item.date}</td>
    `; 
    table.appendChild(row);
  });
  }