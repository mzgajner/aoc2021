import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-two.ts";

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
  assertEquals(solve(input), 195);
});
