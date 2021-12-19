import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve from "./part-two.ts";
Deno.test("solve", () => {
  assertEquals(solve(["C200B40A82"]), 3);
  assertEquals(solve(["04005AC33890"]), 54);
  assertEquals(solve(["880086C3E88112"]), 7);
  assertEquals(solve(["CE00C43D881120"]), 9);
  assertEquals(solve(["D8005AC2A8F0"]), 1);
  assertEquals(solve(["F600BC2D8F"]), 0);
  assertEquals(solve(["9C005AC2F8F0"]), 0);
  assertEquals(solve(["9C0141080250320F1802104A08"]), 1);
});
