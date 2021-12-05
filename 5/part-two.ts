type Point = [number, number];
type Line = [Point, Point];

const GRID_SIZE = 1000;

const getDirection = (start: number, end: number) =>
  start === end ? 0 : start < end ? 1 : -1;
export const getPointsForLine = (line: Line): Point[] => {
  const [[x1, y1], [x2, y2]] = line;

  const directionX = getDirection(x1, x2);
  const directionY = getDirection(y1, y2);

  const diffX = Math.abs(x1 - x2);
  const diffY = Math.abs(y1 - y2);

  const diffLoop = Math.max(diffX, diffY);

  let currentX = x1;
  let currentY = y1;
  const points: Point[] = [];

  for (let i = 0; i <= diffLoop; i++) {
    const point: Point = [currentX, currentY];
    points.push(point);
    currentX += directionX;
    currentY += directionY;
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
