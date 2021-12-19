import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { processPairs } from "./part-one.ts";

Deno.test("processPairs", () => {
  assertEquals(
    processPairs("NNCB", {
      CB: "H",
      NN: "C",
      NC: "B",
    }),
    "NCNBCHB",
  );
});

Deno.test("solve", () => {
  assertEquals(
    solve([
      "NNCB",
      "",
      "BB -> N",
      "BC -> B",
      "BH -> H",
      "BN -> B",
      "CB -> H",
      "CC -> N",
      "CN -> C",
      "CH -> B",
      "HB -> C",
      "HC -> B",
      "HH -> N",
      "HN -> C",
      "NB -> B",
      "NC -> B",
      "NH -> C",
      "NN -> C",
    ]),
    1588,
  );
});
