import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { bumpByN, multiplyLines } from "./part-two.ts";
Deno.test("bumpByN", () => {
  assertEquals(bumpByN("12", 1), "23");
  assertEquals(bumpByN("12", 6), "78");
  assertEquals(bumpByN("99", 1), "11");
  assertEquals(bumpByN("99", 2), "22");
  assertEquals(bumpByN("58", 4), "93");
});

Deno.test("multiplyLines", () => {
  assertEquals(
    multiplyLines(["8"]),
    [
      "89123",
      "91234",
      "12345",
      "23456",
      "34567",
    ],
  );
});

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
    315,
  );
});
