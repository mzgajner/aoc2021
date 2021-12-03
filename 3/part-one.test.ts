import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-one.ts";

Deno.test("solve", () => {
  const input = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];
  assertEquals(solve(input), 198);
});
