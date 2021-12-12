const OPENING = ["(", "[", "<", "{"];
const CLOSING = [")", "]", ">", "}"];

type Opening = "(" | "[" | "{" | "<";
type Closing = ")" | "]" | "}" | ">";

const VALUES = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const match = (opening: Opening, closing: Closing) =>
  OPENING.indexOf(opening) === CLOSING.indexOf(closing);

export const getScoreForLine = (line: string) => {
  let score = 0;

  for (let i = 0; i < line.length; i++) {
    score = score * 5 + VALUES[line[i] as Closing];
  }

  return score;
};
export const isValid = (str: string): boolean => {
  const stack: Opening[] = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i] as Opening | Closing;
    if (OPENING.includes(char)) {
      const opening = char as Opening;
      stack.push(opening);
    } else {
      const closing = char as Closing;
      if (stack.length === 0 || !match(stack.pop() as Opening, closing)) {
        return false;
      }
    }
  }
  return true;
};

export const getMissingCharacters = (str: string): string => {
  const stack: Opening[] = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i] as Opening | Closing;
    if (OPENING.includes(char)) {
      const opening = char as Opening;
      stack.push(opening);
    } else {
      const closing = char as Closing;
      if (!match(stack.pop() as Opening, closing)) {
        throw new Error(`Mismatched closing character: ${closing}`);
      }
    }
  }
  return stack.reverse().map((opening) => CLOSING[OPENING.indexOf(opening)])
    .join("");
};

export default (lines: string[]) => {
  const scores = lines.filter(isValid).map(getMissingCharacters).map(
    getScoreForLine,
  );
  scores.sort((a, b) => a - b);

  return scores[Math.floor(scores.length / 2)];
};
