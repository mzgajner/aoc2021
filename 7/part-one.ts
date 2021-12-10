export const getRequiredFuel = (
  startingPositions: number[],
  finalPosition: number,
) =>
  startingPositions.reduce(
    (sum, currentPosition) => sum + Math.abs(finalPosition - currentPosition),
    0,
  );

export default (lines: string[]) => {
  const crabPositions = lines[0].split(",").map(Number);

  const start = Math.min(...crabPositions);
  const end = Math.max(...crabPositions);

  let minimumFuel = 99999999999;

  for (let i = start; i <= end; i++) {
    minimumFuel = Math.min(minimumFuel, getRequiredFuel(crabPositions, i));
  }

  return minimumFuel;
};
