export default (lines: string[]) => {
  let count = 0;
  lines.forEach((line) => {
    const [_, output] = line.split(" | ");
    count += output.split(" ").filter((value) =>
      [2, 3, 4, 7].includes(value.length)
    ).length;
  });

  return count;
};
