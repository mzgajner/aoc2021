const OPENING = ["(", "[", "<", "{"];
const CLOSING = [")", "]", ">", "}"];

type Opening = "(" | "[" | "{" | "<";
type Closing = ")" | "]" | "}" | ">";

const VALUES = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const match = (opening: Opening, closing: Closing) =>
  OPENING.indexOf(opening) === CLOSING.indexOf(closing);

export const findWrongClosingCharacter = (str: string): Closing | null => {
  const stack: Opening[] = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i] as Opening | Closing;
    if (OPENING.includes(char)) {
      const opening = char as Opening;
      stack.push(opening);
    } else {
      const closing = char as Closing;
      if (stack.length === 0 || !match(stack.pop() as Opening, closing)) {
        return char as Closing;
      }
    }
  }
  return null;
};

export default (lines: string[]) => {
  const sum = lines.map(findWrongClosingCharacter).map((char) =>
    char ? VALUES[char] : 0
  ).reduce((sum, current) => sum + current, 0);

  return sum;
};
