export const occurrencesForString = (
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

export const sumOccurrences = (
  ...occurrences: Record<string, number>[]
) => {
  const allKeys = new Set(occurrences.flatMap(Object.keys));
  const sum: Record<string, number> = {};

  allKeys.forEach((key) => {
    sum[key] = occurrences.reduce(
      (sum, current) => sum + (current[key] ?? 0),
      0,
    );
  });

  return sum;
};

export const getOccurrencesAfterNCycles = (
  input: string,
  mappings: Record<string, string>,
  cycles: number,
): Record<string, number> => {
  const allCharacters: Set<string> = new Set(Object.values(mappings));
  let occurrences = occurrencesForString(input, allCharacters);

  for (let i = 1; i < input.length; i++) {
    const previous = input[i - 1];
    const current = input[i];
    const pair = previous + current;

    occurrences = sumOccurrences(
      occurrences,
      occurrenceForPair(pair, mappings, cycles),
    );
  }

  return occurrences;
};

const cache: Record<string, Record<string, number>> = {};

export const occurrenceForPair = (
  pair: string,
  mappings: Record<string, string>,
  cyclesLeft: number,
): Record<string, number> => {
  if (cache[`${pair}_${cyclesLeft}`]) return cache[`${pair}_${cyclesLeft}`];

  const mapping = mappings[pair];

  if (cyclesLeft === 1) {
    return { [mapping]: 1 };
  } else {
    const firstPart = pair[0] + mapping;
    const secondPart = mapping + pair[1];

    const result = sumOccurrences(
      { [mapping]: 1 },
      occurrenceForPair(firstPart, mappings, cyclesLeft - 1),
      occurrenceForPair(secondPart, mappings, cyclesLeft - 1),
    );
    cache[`${pair}_${cyclesLeft}`] = result;
    return result;
  }
};

export default (lines: string[]) => {
  const input = lines[0];
  const mappings = lines.slice(2, lines.length).reduce((map, current) => {
    const [key, value] = current.split(" -> ");
    return { ...map, [key]: value };
  }, {});

  const occurrences = getOccurrencesAfterNCycles(input, mappings, 40);

  const max = Math.max(...Object.values(occurrences));
  const min = Math.min(...Object.values(occurrences));

  return max - min;
};
