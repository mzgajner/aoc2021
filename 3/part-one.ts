export default (lines: string[]) => {
  const lineLength = lines[0].length
  const counts = new Array(lineLength).fill(0);

  lines.forEach((line) => {
    line.split("").forEach((bit: string, index: number) => {
      counts[index] += Number(bit);
    });
  });

  let gamma = "";
  let epsilon = "";

  counts.forEach((count) => {
    const bit = Number(count > lines.length / 2);
    gamma += bit;
    epsilon += 1 - bit;
  });

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};
