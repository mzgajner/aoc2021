type Point = [number, number];

export const getPointValue = (point: Point, grid: number[][]) =>
  grid[point[1]][point[0]];

export const getRiskLevel = (point: Point, grid: number[][]) =>
  getPointValue(point, grid) + 1;

export const getNeighbours = (point: Point, grid: number[][]): Point[] => {
  const [x, y] = point;
  const neighbours: Point[] = [];

  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;

  if (x > 0) neighbours.push([x - 1, y]);
  if (y > 0) neighbours.push([x, y - 1]);
  if (x < maxX) neighbours.push([x + 1, y]);
  if (y < maxY) neighbours.push([x, y + 1]);

  return neighbours;
};

const pointToString = (point: Point): string => `${point[0]}|${point[1]}`;
const stringToPoint = (string: string): Point =>
  string.split("|").map(Number) as Point;
export const isLowPoint = (point: Point, grid: number[][]) =>
  getNeighbours(point, grid).every((neighbour) =>
    getPointValue(neighbour, grid) > getPointValue(point, grid)
  );

export const getBasinPoints = (
  point: Point,
  grid: number[][],
): Point[] => {
  let found = [pointToString(point)];

  let keepLooping = true;

  while (keepLooping) {
    const startCount = found.length;

    const potentialNew: string[] = [];

    for (let i = 0; i < found.length; i++) {
      const point = stringToPoint(found[i]);
      found = found.concat(
        getNeighbours(point, grid).filter((p) =>
          getPointValue(p, grid) < 9 && !found.includes(pointToString(p))
        ).map(pointToString),
      );
    }

    const endCount = found.length;
    if (startCount === endCount) keepLooping = false;
  }

  return found.map(stringToPoint);
};

export default (lines: string[]) => {
  const grid = lines.map((line) => line.split("").map(Number));
  const WIDTH = grid[0].length;
  const HEIGHT = grid.length;

  const lowPoints: Point[] = [];

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const point: Point = [x, y];
      if (isLowPoint(point, grid)) {
        lowPoints.push(point);
      }
    }
  }

  const basinSizes = lowPoints.map((point) =>
    getBasinPoints(point, grid).length
  ).sort((a, b) => a - b).reverse();

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
};
