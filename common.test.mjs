import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { calculateRevisionDates, getFutureAgendas } from "./common.mjs";

describe("calculateRevisionDates()", () => {
  test("returns correct spaced revision dates based on the start date", () => {
    const startDate = "2025-01-01";
    const result = calculateRevisionDates(startDate);
    const expected = [
      "2025-01-08", "2025-02-01", "2025-04-01", "2025-07-01", "2026-01-01"
    ];
    assert.deepEqual(result, expected);
  });

  test("returns ISO date strings", () => {
    const result = calculateRevisionDates("2025-03-10");
    result.forEach(date => assert.match(date, /^\d{4}-\d{2}-\d{2}$/));
  });

  test("handles leap years correctly", () => {
    const result = calculateRevisionDates("2024-02-29");
    result.forEach(date => assert.match(date, /^\d{4}-\d{2}-\d{2}$/));
  });
});

describe("getFutureAgendas()", () => {
  test("filters out past dates and sorts future ones", () => {
    const today = new Date().toISOString().split("T")[0];
    const agendas = [
      { topic: "Past", date: "2000-01-01" },
      { topic: "Today", date: today },
      { topic: "Future", date: "2099-12-31" },
    ];
    const result = getFutureAgendas(agendas);
    assert.equal(result.length, 2);
    assert.deepEqual(result.map(a => a.topic), ["Today", "Future"]);
  });
});