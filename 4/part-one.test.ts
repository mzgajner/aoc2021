import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, {
  calculateTicketScore,
  checkTicket,
  Ticket,
} from "./part-one.ts";

Deno.test("calculateTicketScore", () => {
  const exampleTicket = {
    rows: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [7, 8, 9, 10, 11],
    ],
    columns: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
  } as Ticket;

  const score = calculateTicketScore(exampleTicket, [7, 8, 9, 10, 11]);
  assertEquals(score, 660);
});

Deno.test("checkTicket", () => {
  const exampleTicket = {
    rows: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [7, 9, 2, 8, 23],
    ],
    columns: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5],
    ],
  } as Ticket;

  assertEquals(checkTicket(exampleTicket, [1, 2, 3, 4, 5]), true);
  assertEquals(checkTicket(exampleTicket, [23, 9, 7, 2, 8]), true);
  assertEquals(checkTicket(exampleTicket, [2, 3, 4, 5, 6, 7, 8]), false);
  assertEquals(checkTicket(exampleTicket, []), false);
});

Deno.test("solve", () => {
  const input = [
    "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
    "",
    "22 13 17 11  0",
    "8  2 23  4 24",
    "21  9 14 16  7",
    "6 10  3 18  5",
    "1 12 20 15 19",
    "",
    "3 15  0  2 22",
    "9 18 13 17  5",
    "19  8  7 25 23",
    "20 11 10 24  4",
    "14 21 16 12  6",
    "",
    "14 21 17 24  4",
    "10 16 15  9 19",
    "18  8 23 26 20",
    "22 11 13  6  5",
    "2  0 12  3  7",
  ];
  assertEquals(solve(input), 4512);
});
