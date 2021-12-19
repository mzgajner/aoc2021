export const processPairs = (
  input: string,
  mappings: Record<string, string>,
) => {
  let newString = input[0];

  for (let i = 1; i < input.length; i++) {
    const previous = input[i - 1];
    const current = input[i];
    const mapping = mappings[previous + current];

    if (mapping) newString += mapping;
    newString += current;
  }

  return newString;
};

export const countOccurrences = (
  input: string,
  characters: Set<string>,
): Record<string, number> => {
  const occurrences: Record<string, number> = {};

  characters.forEach((character) => {
    occurrences[character] = input.match(new RegExp(character, "g"))?.length ??
      0;
  });

  return occurrences;
};

export default (lines: string[]) => {
  let input = lines[0];
  const mappings = lines.slice(2, lines.length).reduce((map, current) => {
    const [key, value] = current.split(" -> ");
    return { ...map, [key]: value };
  }, {});

  for (let i = 0; i < 10; i++) {
    input = processPairs(input, mappings);
  }

  const allCharacters = new Set(input.split(""));
  const occurrences = countOccurrences(input, allCharacters);

  const max = Math.max(...Object.values(occurrences));
  const min = Math.min(...Object.values(occurrences));

  return max - min;
};
