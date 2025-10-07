
 export function getUserIds() {
  return ["user1", "user2", "user3", "user4", "user5"];
}

  
  export function getData(userId) {
    //sample data
    const agendaData = { user1: [ { task: "Review JS basics", date: "2025-10-10" }, 
      { task: "DOM practice", date: "2025-10-08" } ], 
      user2: [] };


  
  

  return agendaData[userId] || [];
  }
// in this function we filter and sort out future events.
  export function getFutureAgendas(agenda){
    const today = new Date();
  

  //filter out past dates 
  const future = agenda.filter(item => new Date(item.date) >= today);

  //sort future dates chronologically
  future.sort((a, b) => new Date(a.date) - new Date(b.date));

  return future;
}