import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { processFlashes } from "./part-one.ts";

Deno.test("processFlashes", () => {
  const before = [
    [1, 9, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const after = [
    [3, 0, 3],
    [3, 3, 3],
    [2, 2, 2],
  ];

  const flashCount = processFlashes(before);
  assertEquals(flashCount, 1);
  assertEquals(before, after);
});

Deno.test("processFlashesCascading", () => {
  const step0 = [
    [1, 1, 1, 1, 1],
    [1, 9, 9, 9, 1],
    [1, 9, 1, 9, 1],
    [1, 9, 9, 9, 1],
    [1, 1, 1, 1, 1],
  ];

  const step1 = [
    [3, 4, 5, 4, 3],
    [4, 0, 0, 0, 4],
    [5, 0, 0, 0, 5],
    [4, 0, 0, 0, 4],
    [3, 4, 5, 4, 3],
  ];

  const step2 = [
    [4, 5, 6, 5, 4],
    [5, 1, 1, 1, 5],
    [6, 1, 1, 1, 6],
    [5, 1, 1, 1, 5],
    [4, 5, 6, 5, 4],
  ];
  const flashCount = processFlashes(step0);
  assertEquals(flashCount, 9);
  assertEquals(step0, step1);
  processFlashes(step0);
  assertEquals(step0, step2);
});

Deno.test("solve", () => {
  const input = [
    "5483143223",
    "2745854711",
    "5264556173",
    "6141336146",
    "6357385478",
    "4167524645",
    "2176841721",
    "6882881134",
    "4846848554",
    "5283751526",
  ];
  assertEquals(solve(input), 1656);
});
