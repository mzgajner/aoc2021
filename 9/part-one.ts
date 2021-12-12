type Point = [number, number];

export const getPointValue = (point: Point, grid: number[][]) =>
  grid[point[1]][point[0]];

export const getRiskLevel = (point: Point, grid: number[][]) =>
  getPointValue(point, grid) + 1;

export const isLowPoint = (point: Point, grid: number[][]) => {
  const [x, y] = point;
  const maxX = grid[0].length - 1;
  const maxY = grid.length - 1;

  const neighbours: Point[] = [];

  if (x > 0) neighbours.push([x - 1, y]);
  if (y > 0) neighbours.push([x, y - 1]);
  if (x < maxX) neighbours.push([x + 1, y]);
  if (y < maxY) neighbours.push([x, y + 1]);

  return neighbours.every((neighbour) =>
    getPointValue(neighbour, grid) > getPointValue(point, grid)
  );
};

export default (lines: string[]) => {
  const grid = lines.map((line) => line.split("").map(Number));
  const WIDTH = grid[0].length;
  const HEIGHT = grid.length;

  let totalRisk = 0;

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const point: Point = [x, y];
      if (isLowPoint(point, grid)) {
        totalRisk += getRiskLevel(point, grid);
      }
    }
  }

  return totalRisk;
};
