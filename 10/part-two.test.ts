import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import solve, { getMissingCharacters, getScoreForLine } from "./part-two.ts";
Deno.test("getMissingCharacters", () => {
  assertEquals(getMissingCharacters("("), ")");
  assertEquals(getMissingCharacters("[({(<(())[]>[[{[]{<()<>>"), "}}]])})]");
  assertEquals(getMissingCharacters("[(()[<>])]({[<{<<[]>>("), ")}>]})");
  assertEquals(getMissingCharacters("(((({<>}<{<{<>}{[]{[]{}"), "}}>}>))))");
  assertEquals(getMissingCharacters("{<[[]]>}<{[{[{[]{()[[[]"), "]]}}]}]}>");
  assertEquals(getMissingCharacters("<{([{{}}[<[[[<>{}]]]>[]]"), "])}>");
});

Deno.test("getScoreForLine", () => {
  assertEquals(getScoreForLine("}}]])})]"), 288957);
  assertEquals(getScoreForLine(")}>]})"), 5566);
  assertEquals(getScoreForLine("}}>}>))))"), 1480781);
  assertEquals(getScoreForLine("]]}}]}]}>"), 995444);
  assertEquals(getScoreForLine("])}>"), 294);
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
  assertEquals(solve(input), 288957);
});
