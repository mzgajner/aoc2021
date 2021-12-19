import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { hexToBitString, Packet } from "./part-one.ts";
Deno.test("hexToBitString", () => {
  assertEquals(hexToBitString("0000"), "0000000000000000");
  assertEquals(hexToBitString("80000"), "10000000000000000000");
  assertEquals(hexToBitString("AF7201E"), "1010111101110010000000011110");
});

Deno.test("Packet.parseLiteralContent", () => {
  assertEquals(Packet.parseLiteralContent("101111111000101000"), [2021, ""]);
});

Deno.test("solve", () => {
  assertEquals(solve(["8A004A801A8002F478"]), 16);
  assertEquals(solve(["620080001611562C8802118E34"]), 12);
  assertEquals(solve(["C0015000016115A2E0802F182340"]), 23);
  assertEquals(solve(["A0016C880162017C3686B18A3D4780"]), 31);
});
