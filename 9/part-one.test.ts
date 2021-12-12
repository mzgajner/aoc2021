import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getPointValue, isLowPoint } from "./part-one.ts";
Deno.test("getPointValue", () => {
  const grid = [
    [5, 7, 11, 11],
    [8, 9, 33, 81],
    [1, 4, 25, 95],
  ];
  assertEquals(getPointValue([2, 1], grid), 33);
  assertEquals(getPointValue([0, 0], grid), 5);
  assertEquals(getPointValue([3, 2], grid), 95);
});

Deno.test("isLowPoint", () => {
  const grid = [
    [5, 7, 11, 11],
    [8, 9, 1, 81],
    [1, 4, 25, 95],
  ];
  assertEquals(isLowPoint([2, 1], grid), true);
  assertEquals(isLowPoint([3, 0], grid), false);
  assertEquals(isLowPoint([0, 0], grid), true);
  assertEquals(isLowPoint([3, 2], grid), false);
});

Deno.test("solve", () => {
  const input = [
    "2199943210",
    "3987894921",
    "9856789892",
    "8767896789",
    "9899965678",
  ];
  assertEquals(solve(input), 15);
});
