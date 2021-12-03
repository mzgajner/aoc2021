import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-two.ts";

Deno.test("solve", () => {
  const input = [
    "199",
    "200",
    "208",
    "210",
    "200",
    "207",
    "240",
    "269",
    "260",
    "263",
  ];
  assertEquals(solve(input), 5);
});
