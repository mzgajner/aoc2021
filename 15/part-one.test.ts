import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-one.ts";
Deno.test("solve", () => {
  assertEquals(
    solve([
      "1163751742",
      "1381373672",
      "2136511328",
      "3694931569",
      "7463417111",
      "1319128137",
      "1359912421",
      "3125421639",
      "1293138521",
      "2311944581",
    ]),
    40,
  );
});
