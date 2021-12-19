import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, {
  getOccurrencesAfterNCycles,
  occurrenceForPair,
  occurrencesForString,
  sumOccurrences,
} from "./part-two.ts";

Deno.test("sumOccurrences", () => {
  assertEquals(
    sumOccurrences(
      { N: 0, C: 10, B: 1, H: 0 },
      { N: 2, C: 1, B: 1, H: 0 },
    ),
    { N: 2, C: 11, B: 2, H: 0 },
  );
  assertEquals(
    sumOccurrences(
      { N: 2, C: 1, B: 1, H: 0 },
    ),
    { N: 2, C: 1, B: 1, H: 0 },
  );
  assertEquals(
    sumOccurrences(
      { N: 0, C: 10, B: 1 },
      { N: 0, C: 10, B: 1 },
      { N: 2, C: 1, B: 1, H: 1 },
    ),
    { N: 2, C: 21, B: 3, H: 1 },
  );
});

Deno.test("occurrencesForString", () => {
  assertEquals(
    occurrencesForString(
      "NNCB",
      new Set(["N", "C", "B", "H"]),
    ),
    {
      N: 2,
      C: 1,
      B: 1,
      H: 0,
    },
  );
});

Deno.test("getOccurrencesAfterNCycles", () => {
  assertEquals(
    getOccurrencesAfterNCycles(
      "NNCB",
      {
        CH: "B",
        HH: "N",
        CB: "H",
        NH: "C",
        HB: "C",
        HC: "B",
        HN: "C",
        NN: "C",
        BH: "H",
        NC: "B",
        NB: "B",
        BN: "B",
        BB: "N",
        BC: "B",
        CC: "N",
        CN: "C",
      },
      10,
    ),
    {
      B: 1749,
      C: 298,
      H: 161,
      N: 865,
    },
  );
});

Deno.test("occurrenceForPair", () => {
  assertEquals(
    occurrenceForPair(
      "NN",
      {
        CH: "B",
        HH: "N",
        CB: "H",
        NH: "C",
        HB: "C",
        HC: "B",
        HN: "C",
        NN: "C",
        BH: "H",
        NC: "B",
        NB: "B",
        BN: "B",
        BB: "N",
        BC: "B",
        CC: "N",
        CN: "C",
      },
      1,
    ),
    {
      C: 1,
    },
  );

  assertEquals(
    occurrenceForPair(
      "NN",
      {
        CH: "B",
        HH: "N",
        CB: "H",
        NH: "C",
        HB: "C",
        HC: "B",
        HN: "C",
        NN: "C",
        BH: "H",
        NC: "B",
        NB: "B",
        BN: "B",
        BB: "N",
        BC: "B",
        CC: "N",
        CN: "C",
      },
      2,
    ),
    { B: 1, C: 2 },
  );

  assertEquals(
    occurrenceForPair(
      "NN",
      {
        CH: "B",
        HH: "N",
        CB: "H",
        NH: "C",
        HB: "C",
        HC: "B",
        HN: "C",
        NN: "C",
        BH: "H",
        NC: "B",
        NB: "B",
        BN: "B",
        BB: "N",
        BC: "B",
        CC: "N",
        CN: "C",
      },
      3,
    ),
    {
      B: 3,
      C: 3,
      N: 1,
    },
  );
});

Deno.test("solve", () => {
  assertEquals(
    solve([
      "NNCB",
      "",
      "CH -> B",
      "HH -> N",
      "CB -> H",
      "NH -> C",
      "HB -> C",
      "HC -> B",
      "HN -> C",
      "NN -> C",
      "BH -> H",
      "NC -> B",
      "NB -> B",
      "BN -> B",
      "BB -> N",
      "BC -> B",
      "CC -> N",
      "CN -> C",
    ]),
    2188189693529,
  );
});
