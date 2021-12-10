import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { progressMultipleDays, progressOneDay } from "./part-one.ts";

Deno.test("progressOneDay", () => {
  assertEquals(progressOneDay([1, 2, 3]), [0, 1, 2]);
  assertEquals(progressOneDay([0, 1, 2]), [6, 0, 1, 8]);
});

Deno.test("progressMultipleDays", () => {
  assertEquals(progressMultipleDays([1, 2, 3], 2), [6, 0, 1, 8]);
  assertEquals(progressMultipleDays([3, 4, 3, 1, 2], 18), [
    6,
    0,
    6,
    4,
    5,
    6,
    0,
    1,
    1,
    2,
    6,
    0,
    1,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    6,
    7,
    8,
    8,
    8,
    8,
  ]);
});

Deno.test("solve", () => {
  const input = ["3,4,3,1,2"];
  assertEquals(solve(input), 5934);
});
