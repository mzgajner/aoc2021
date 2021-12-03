import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-two.ts";

Deno.test("solve", () => {
  assertEquals(solve([]), 0);
  assertEquals(solve(["down 1", "forward 1"]), 1);

  const input = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];
  assertEquals(solve(input), 900);
});
