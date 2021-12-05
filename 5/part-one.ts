type Point = [number, number];
type Line = [Point, Point];

const GRID_SIZE = 1000;
export const getPointsForLine = (line: Line): Point[] => {
  if (line[0][0] !== line[1][0] && line[0][1] !== line[1][1]) {
    return [];
  }

  const changingIndex = line[0][0] !== line[1][0] ? 0 : 1;
  const fixedIndex = 1 - changingIndex;
  const direction = line[0][changingIndex] < line[1][changingIndex] ? 1 : -1;
  const diff = Math.abs(line[0][changingIndex] - line[1][changingIndex]);

  let changingValue = line[0][changingIndex];
  const fixedValue = line[0][fixedIndex];
  const points: Point[] = [];

  for (let i = 0; i <= diff; i++) {
    const point: Point = [0, 0];
    point[fixedIndex] = fixedValue;
    point[changingIndex] = changingValue;
    points.push(point);
    changingValue += direction;
  }

  return points;
};

export default (lines: string[]) => {
  const grid: number[][] = [];

  for (let i = 0; i < GRID_SIZE; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      grid[i][j] = 0;
    }
  }

  const parsedLines: Line[] = lines.map(
    (line) =>
      line.split(" -> ").map((point) => point.split(",").map(Number)) as Line,
  );

  const points = parsedLines.map(getPointsForLine).flat();

  points.forEach((point) => grid[point[0]][point[1]]++);

  let overThreshold = 0;

  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] >= 2) {
        overThreshold++;
      }
    }
  }

  return overThreshold;
};
