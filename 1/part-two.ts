function countIncreases(measurements: number[]) {
  let increases = 0;

  for (let i = 3; i < measurements.length; i++) {
    const current = measurements[i] + measurements[i - 1] + measurements[i - 2];
    const previous = measurements[i - 1] + measurements[i - 2] +
      measurements[i - 3];
    if (current > previous) {
      increases++;
    }
  }

  return increases;
}

export default (lines: string[]) => {
  const numbers = lines.map((line) => Number(line));
  return countIncreases(numbers);
};
