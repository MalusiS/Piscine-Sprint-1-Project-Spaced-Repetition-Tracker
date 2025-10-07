 /*export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}*/
 // commented out and focused on the logic of project, will look at the instructions in the rubric in the morning and talk about it during a huddle. 
//theres something i do not get here. 

const dropdown = document.getElementById("userDropdown");

dropdown.addEventListener("change", function() {
  const selectedUserId = dropdown.value; 
  console.log("Selected user ID:", selectedUserId);//adding a event listener to the drop down wich means this function will run everytime a user selects a new option.

//load agenda for this user
const agenda = getData(selectedUserId);
console.log("Agenda", agenda);

//handling the no agenda message instruction
const msg = document.getElementById("noAgendaMsg");
if (agenda.length === 0) {
  msg.style.display = "block";
  return "no agenda";
}
 else {
  msg.style.display = "none"; // added this because it hides the no agenda messages when theres actual data. 
 }

 //arranging the dates in chronological order and filtering out the past dates
const today = new Date();


const future = agenda.filter(item => new Date(item.date) >= today); //filter() creates a new array with the selected data.It ensures that the table doesnt display old versions or old dates. 
//sort the future agenda chronologically
future.sort((a, b) => new Date(a.date) - new Date(b.date));

  
});
