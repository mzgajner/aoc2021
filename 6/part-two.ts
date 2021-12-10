const LIFECYCLE = 6;

const cache: Record<string, number> = {};

export const getPopulationContribution = (
  daysToDoubling: number,
  daysLeft: number,
): number => {
  if (cache[`${daysToDoubling}-${daysLeft}`]) {
    return cache[`${daysToDoubling}-${daysLeft}`];
  }

  if (daysLeft <= daysToDoubling) {
    return 1;
  } else {
    const result =
      getPopulationContribution(LIFECYCLE, daysLeft - daysToDoubling - 1) +
      getPopulationContribution(LIFECYCLE + 2, daysLeft - daysToDoubling - 1);
    cache[`${daysToDoubling}-${daysLeft}`] = result;
    return result;
  }
};

export default (lines: string[]) => {
  const startingFish = lines[0].split(",").map(Number);

  const contributions = startingFish.map((fish) =>
    getPopulationContribution(fish, 256)
  );

  const sum = contributions.reduce((sum, current) => sum + current, 0);

  return sum;
};
