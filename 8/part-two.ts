import {
  permutations,
  withoutAll,
} from "https://deno.land/std@0.116.0/collections/mod.ts";

const DIGITS_STRING = [
  ["a", "b", "c", "e", "f", "g"],
  ["c", "f"],
  ["a", "c", "d", "e", "g"],
  ["a", "c", "d", "f", "g"],
  ["b", "c", "d", "f"],
  ["a", "b", "d", "f", "g"],
  ["a", "b", "d", "e", "f", "g"],
  ["a", "c", "f"],
  ["a", "b", "c", "d", "e", "f", "g"],
  ["a", "b", "c", "d", "f", "g"],
];

const DIGITS = [
  [0, 1, 2, 4, 5, 6],
  [2, 5],
  [0, 2, 3, 4, 6],
  [0, 2, 3, 5, 6],
  [1, 2, 3, 5],
  [0, 1, 3, 5, 6],
  [0, 1, 3, 4, 5, 6],
  [0, 2, 5],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 1, 2, 3, 5, 6],
];

export const getDigitsForPermutation = (permutation: string[]) =>
  DIGITS.map((digit) => digit.map((i) => permutation[i]).sort().join(""));

const checkPermutation = (permutation: string[], match: string[]) => {
  const expected = getDigitsForPermutation(permutation);
  const diff = withoutAll(expected, match);

  return diff.length === 0;
};

export default (lines: string[]) => {
  const allPermutations = permutations(["a", "b", "c", "d", "e", "f", "g"]);

  const numbers = lines.map((line) => {
    const [rawPatterns, rawOutput] = line.split(" | ");
    const patterns = rawPatterns.split(" ").map((pattern) =>
      pattern.split("").sort().join("")
    );
    const output = rawOutput.split(" ").map((pattern) =>
      pattern.split("").sort().join("")
    );
    const rightPermutation = allPermutations.find((permutation: string[]) =>
      checkPermutation(permutation, patterns)
    ) as string[];

    const digits = getDigitsForPermutation(rightPermutation);

    const string = output.map((digit) => digits.indexOf(digit)).join("");

    return Number(string);
  });

  const sum = numbers.reduce((sum, current) => sum + current, 0);

  return sum;
};
