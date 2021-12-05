import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getPointsForLine } from "./part-two.ts";

Deno.test("getPointsForLine", () => {
  let points = getPointsForLine([[0, 0], [2, 0]]);
  assertEquals(points, [[0, 0], [1, 0], [2, 0]]);

  points = getPointsForLine([[3, 0], [1, 0]]);
  assertEquals(points, [[3, 0], [2, 0], [1, 0]]);

  points = getPointsForLine([[0, 11], [0, 14]]);
  assertEquals(points, [[0, 11], [0, 12], [0, 13], [0, 14]]);

  points = getPointsForLine([[0, 8], [0, 2]]);
  assertEquals(points, [[0, 8], [0, 7], [0, 6], [0, 5], [0, 4], [0, 3], [
    0,
    2,
  ]]);

  points = getPointsForLine([[1, 1], [1, 1]]);
  assertEquals(points, [[1, 1]]);

  points = getPointsForLine([[1, 1], [3, 3]]);
  assertEquals(points, [[1, 1], [2, 2], [3, 3]]);
});

Deno.test("solve", () => {
  const input = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ];
  assertEquals(solve(input), 12);
});
