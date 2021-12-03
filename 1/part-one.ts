function countIncreases(measurements: number[]) {
  let increases = 0;

  for (let i = 1; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      increases++;
    }
  }

  return increases;
}

export default (lines: string[]) => {
  const numbers = lines.map((line) => Number(line));
  return countIncreases(numbers);
};
