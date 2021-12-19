import { minBy } from "https://deno.land/std@0.116.0/collections/mod.ts";

export class Node {
  x: number;
  y: number;
  distanceFromNeighbour: number;
  grid: Node[][];
  visited: boolean;
  distance: number;

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

const getUnvisited = (nodes: Node[]) => nodes.filter((n) => !n.visited);

export default (lines: string[]) => {
  const WIDTH = lines[0].length;
  const HEIGHT = lines.length;
  const grid: Node[][] = [];
  const allUnvisited: Set<Node> = new Set();

  for (let y = 0; y < WIDTH; y++) {
    grid[y] = [];
    for (let x = 0; x < HEIGHT; x++) {
      const node = new Node(x, y, Number(lines[y][x]), grid);
      grid[y][x] = node;
      allUnvisited.add(node);
    }
  }

  const start = grid[0][0];
  const end = grid[HEIGHT - 1][WIDTH - 1];
  start.distance = 0;

  let current = start;

  while (current !== end) {
    getUnvisited(current.getNeighbours()).forEach((n) => {
      n.distance = Math.min(
        current.distance + n.distanceFromNeighbour,
        n.distance,
      );
    });

    current.visited = true;
    allUnvisited.delete(current);
    current = minBy(Array.from(allUnvisited), (n: Node) => n.distance) as Node;
  }

  return end.distance;
};
