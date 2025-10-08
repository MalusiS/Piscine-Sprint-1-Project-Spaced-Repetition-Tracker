export function getUserIds() {
  return ["user1", "user2", "user3", "user4", "user5"];
}

// Sample in-memory agenda data
export const agendaData = {
  user1: [
    { task: "Review JS basics", date: "2025-10-10" },
    { task: "DOM practice", date: "2025-10-08" }
  ],
  user2: [],
  user3: [],
  user4: [],
  user5: []
};

// Get all agenda items for a user
export function getData(userId) {
  return agendaData[userId] || [];
}

// Return only future (including today) agendas, sorted chronologically
export function getFutureAgendas(agenda) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const future = agenda.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0); // normalize each agenda date
    return itemDate >= today;
  });

  future.sort((a, b) => new Date(a.date) - new Date(b.date));
  return future;
}

// Add a new agenda item (in-memory only)
export function addAgenda(userId, task, date) {
  if (!agendaData[userId]) {
    agendaData[userId] = [];
  }
  agendaData[userId].push({ task, date });
}