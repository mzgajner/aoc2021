import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getPopulationContribution } from "./part-two.ts";

Deno.test("getPopulationContribution", () => {
  assertEquals(getPopulationContribution(3, 2), 1);
  assertEquals(getPopulationContribution(3, 3), 1);
  assertEquals(getPopulationContribution(3, 4), 2);
  assertEquals(getPopulationContribution(3, 10), 2);
  assertEquals(getPopulationContribution(3, 11), 3);
  assertEquals(getPopulationContribution(3, 12), 3);
  assertEquals(getPopulationContribution(3, 13), 4);
  assertEquals(getPopulationContribution(3, 14), 4);
  assertEquals(getPopulationContribution(3, 18), 5);
});

Deno.test("solve", () => {
  const input = ["3,4,3,1,2"];
  assertEquals(solve(input), 26984457539);
});
