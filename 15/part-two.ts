import { minBy } from "https://deno.land/std@0.116.0/collections/mod.ts";

const minDiffToPoint = (a: Node, b: Node) => {
  const xDiff = Math.abs(a.x - b.x);
  const yDiff = Math.abs(a.y - b.y);

  return xDiff + yDiff;
};

export class Node {
  x: number;
  y: number;
  distanceFromNeighbour: number;
  grid: Node[][];
  visited: boolean;
  distance: number;
  fDistance: number;
  cameFrom: Node | null;

  constructor(
    x: number,
    y: number,
    distanceFromNeighbour: number,
    grid: Node[][],
  ) {
    this.x = x;
    this.y = y;
    this.distanceFromNeighbour = distanceFromNeighbour;
    this.grid = grid;
    this.visited = false;
    this.distance = Infinity;
    this.fDistance = Infinity;
    this.cameFrom = null;
  }

  getNeighbours(): Node[] {
    const x = this.x;
    const y = this.y;
    const neighbours: Node[] = [];

    const maxX = this.grid[0].length - 1;
    const maxY = this.grid.length - 1;

    if (x > 0) neighbours.push(this.grid[y][x - 1]);
    if (y > 0) neighbours.push(this.grid[y - 1][x]);
    if (x < maxX) neighbours.push(this.grid[y][x + 1]);
    if (y < maxY) neighbours.push(this.grid[y + 1][x]);

    return neighbours;
  }
}

export const bumpByN = (string: string, n: number) =>
  string.split("").map((digit) => {
    const bumped = Number(digit) + n;
    return bumped > 9 ? bumped % 9 : bumped;
  }).join("");

export const multiplyLines = (lines: string[]) => {
  let newLines: string[] = [];

  for (let j = 0; j < 5; j++) {
    newLines = newLines.concat(lines.map((l) => bumpByN(l, j)));
  }

  newLines = newLines.map((l) => {
    let newLine = "";

    for (let j = 0; j < 5; j++) {
      newLine += bumpByN(l, j);
    }

    return newLine;
  });

  return newLines;
};

export default (lines: string[]) => {
  lines = multiplyLines(lines);

  const WIDTH = lines[0].length;
  const HEIGHT = lines.length;
  const grid: Node[][] = [];

  for (let y = 0; y < WIDTH; y++) {
    grid[y] = [];
    for (let x = 0; x < HEIGHT; x++) {
      const node = new Node(x, y, Number(lines[y][x]), grid);
      grid[y][x] = node;
    }
  }

  const start = grid[0][0];
  const end = grid[HEIGHT - 1][WIDTH - 1];

  let current = start;

  const openSet = new Set([start]);

  const minDiffToEnd = (node: Node) => minDiffToPoint(node, end);

  start.distance = 0;
  start.fDistance = minDiffToEnd(start);

  while (openSet.size > 0) {
    current = minBy(Array.from(openSet), (n: Node) => n.fDistance) as Node;

    if (current == end) {
      return current.distance;
    }

    openSet.delete(current);
    current.getNeighbours().forEach((n) => {
      const tentativeDistance = current.distance + n.distanceFromNeighbour;
      if (tentativeDistance < n.distance) {
        n.cameFrom = current;
        n.distance = tentativeDistance;
        n.fDistance = tentativeDistance + minDiffToEnd(n);
        if (!openSet.has(n)) {
          openSet.add(n);
        }
      }
    });
  }
};
