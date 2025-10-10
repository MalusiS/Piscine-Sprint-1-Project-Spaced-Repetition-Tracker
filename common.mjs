import { getData as storageGetData, addData } from "./storage.mjs";

export function getUserIds() {
  return ["user1", "user2", "user3", "user4", "user5"];
}

// Get all agenda items for a user
export function getData(userId) {
  return storageGetData(userId) || [];
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

// Add a new agenda item with revisions
export function addAgenda(userId, topic, startDate) {
  const revisionDates = calculateRevisionDates(startDate);
  const data = revisionDates.map(date => ({ topic, date }));
  addData(userId, data);
}

// Calculate spaced-repetition revision dates
export function calculateRevisionDates(startDate) {
  const baseDate = new Date(startDate);
  const intervals = [
    { days: 7 },   // 1 week
    { months: 1 }, // 1 month
    { months: 3 }, // 3 months
    { months: 6 }, // 6 months
    { years: 1 }   // 1 year
  ];

  const dates = intervals.map(({ days = 0, months = 0, years = 0 }) => {
    const d = new Date(baseDate);
    d.setFullYear(d.getFullYear() + years);
    d.setMonth(d.getMonth() + months);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  });

  return dates;
}