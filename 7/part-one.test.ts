import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getRequiredFuel } from "./part-one.ts";

Deno.test("getRequiredFuel", () => {
  assertEquals(getRequiredFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2), 37);
  assertEquals(getRequiredFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 1), 41);
  assertEquals(getRequiredFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 3), 39);
});

Deno.test("solve", () => {
  const input = ["16,1,2,0,4,2,7,1,2,14"];
  assertEquals(solve(input), 37);
});
