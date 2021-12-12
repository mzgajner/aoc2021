import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getBasinPoints } from "./part-two.ts";
Deno.test("getBasinPoints", () => {
  const grid = [
    [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
    [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
    [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
    [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
    [9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
  ];
  assertEquals(getBasinPoints([9, 0], grid).length, 9);
});

Deno.test("solve", () => {
  const input = [
    "2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678",
  ];
  assertEquals(solve(input), 1134);
});
