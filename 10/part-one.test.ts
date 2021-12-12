import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { findWrongClosingCharacter } from "./part-one.ts";
Deno.test("findWrongClosingCharacter", () => {
  assertEquals(findWrongClosingCharacter("{([(<{}[<>[]}>{[]{[(<()>"), "}");
  assertEquals(findWrongClosingCharacter("()"), null);
  assertEquals(findWrongClosingCharacter("({}{[]}{})"), null);
  assertEquals(findWrongClosingCharacter(""), null);
});

Deno.test("solve", () => {
  const input = [
    "[({(<(())[]>[[{[]{<()<>>",
    "[(()[<>])]({[<{<<[]>>(",
    "{([(<{}[<>[]}>{[]{[(<()>",
    "(((({<>}<{<{<>}{[]{[]{}",
    "[[<[([]))<([[{}[[()]]]",
    "[{[{({}]{}}([{[{{{}}([]",
    "{<[[]]>}<{[{[{[]{()[[[]",
    "[<(<(<(<{}))><([]([]()",
    "<{([([[(<>()){}]>(<<{{",
    "<{([{{}}[<[[[<>{}]]]>[]]",
  ];
  assertEquals(solve(input), 26397);
});
