type Point = [number, number];

export const getPointValue = (point: Point, grid: number[][]) =>
  grid[point[1]][point[0]];

export const increasePointValue = (point: Point, grid: number[][]) =>
  grid[point[1]][point[0]]++;

export const resetPointValue = (point: Point, grid: number[][]) =>
  grid[point[1]][point[0]] = 0;

export const getNeighbours = (point: Point, grid: number[][]): Point[] => {
  const [x, y] = point;
  const neighbours: Point[] = [];

  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;

  if (x > 0) neighbours.push([x - 1, y]);
  if (y > 0) neighbours.push([x, y - 1]);
  if (x < maxX) neighbours.push([x + 1, y]);
  if (y < maxY) neighbours.push([x, y + 1]);

  if (x > 0 && y > 0) neighbours.push([x - 1, y - 1]);
  if (x > 0 && y < maxY) neighbours.push([x - 1, y + 1]);
  if (x < maxX && y > 0) neighbours.push([x + 1, y - 1]);
  if (x < maxX && y < maxY) neighbours.push([x + 1, y + 1]);

  return neighbours;
};

const pointToString = (point: Point): string => `${point[0]}|${point[1]}`;
const stringToPoint = (string: string): Point =>
  string.split("|").map(Number) as Point;
export const isLowPoint = (point: Point, grid: number[][]) =>
  getNeighbours(point, grid).every((neighbour) =>
    getPointValue(neighbour, grid) > getPointValue(point, grid)
  );

export const processFlashes = (grid: number[][]): number => {
  const WIDTH = grid[0].length;
  const HEIGHT = grid.length;

  const pointsToProcess: string[] = [];
  const alreadyFlashed: string[] = [];

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const point: Point = [x, y];
      pointsToProcess.push(pointToString(point));
      increasePointValue(point, grid);
    }
  }

  while (pointsToProcess.length > 0) {
    const pointString = pointsToProcess.shift() as string;
    const point = stringToPoint(pointString);
    const pointValue = getPointValue(point, grid);

    if (pointValue > 9 && !alreadyFlashed.includes(pointString)) {
      const neighbours = getNeighbours(point, grid);
      neighbours.forEach((neighbour) => {
        const neighbourString = pointToString(neighbour);
        if (!pointsToProcess.includes(neighbourString)) {
          pointsToProcess.push(neighbourString);
        }
        increasePointValue(neighbour, grid);
      });

      alreadyFlashed.push(pointString);
    }
  }

  alreadyFlashed.map(stringToPoint).forEach((point) =>
    resetPointValue(point, grid)
  );

  return alreadyFlashed.length;
};

const printGrid = (grid: number[][]) => {
  console.log(grid.map((row) => row.join("")).join("\n"));
};
export default (lines: string[]) => {
  const grid = lines.map((line) => line.split("").map(Number));
  let totalFlashes = 0;

  for (let i = 0; i < 100; i++) {
    totalFlashes += processFlashes(grid);
  }

  return totalFlashes;
};
