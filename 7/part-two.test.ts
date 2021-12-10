import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getRequiredFuel } from "./part-two.ts";

Deno.test("getRequiredFuel", () => {
  assertEquals(getRequiredFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 5), 168);
  assertEquals(getRequiredFuel([16, 1, 2, 0, 4, 2, 7, 1, 2, 14], 2), 206);
});

Deno.test("solve", () => {
  const input = ["16,1,2,0,4,2,7,1,2,14"];
  assertEquals(solve(input), 168);
});
