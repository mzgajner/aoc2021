export class Edge {
  s: Vertex;
  t: Vertex;

  constructor(s: Vertex, t: Vertex) {
    this.s = s;
    this.t = t;
  }
}

export class Vertex {
  key: string;
  edges: Edge[] = [];

  constructor(key: string) {
    this.key = key;
  }

  add(vertex: Vertex) {
    this.edges.push(new Edge(this, vertex));
  }

  isSmallCave() {
    return this.key[0] === this.key[0].toLowerCase();
  }
}

export class Graph {
  vertices: Record<string, Vertex> = {};

  add(...vertices: Vertex[]) {
    vertices.forEach((n) => {
      this.vertices[n.key] = n;
    });
  }

  get(key: string): Vertex | null {
    return this.vertices[key] ?? null;
  }

  getVertices(): Vertex[] {
    return Object.values(this.vertices);
  }

  getEdges(): Edge[] {
    return Object.values(this.vertices).reduce<Edge[]>(
      (res, curr) => [...res, ...curr.edges],
      [],
    );
  }

  print() {
    console.log(this.vertices);
  }

  public generateAllPaths(start: Vertex, end: Vertex): string[] {
    const pathsFound: string[] = [];
    findPathsRecursion(start, end, "", pathsFound);

    return pathsFound;
  }
}

const findPathsRecursion = (
  current: Vertex,
  goal: Vertex,
  currentPath: string,
  pathsFound: string[],
  firstSmallCave = true,
) => {
  if (current.isSmallCave() && currentPath.includes(`(${current.key})`)) {
    firstSmallCave = false;
  }
  currentPath += `(${current.key})`;

  if (current == goal) {
    pathsFound.push(currentPath);
    return;
  } else {
    const relevantNeighbours = current.edges
      .map((e) => e.t)
      .filter(
        (v) => {
          if (v.key === "start") return false;
          else if (v.isSmallCave()) {
            if (currentPath.includes(`(${v.key})`)) {
              return firstSmallCave;
            } else {
              return true;
            }
          } else {
            return true;
          }
        },
      );
    relevantNeighbours.forEach((vertex) => {
      findPathsRecursion(
        vertex,
        goal,
        currentPath,
        pathsFound,
        firstSmallCave,
      );
    });
  }
};

export default (lines: string[]) => {
  const graph = new Graph();

  lines.forEach((line) => {
    const [startLabel, endLabel] = line.split("-");

    let startVertex = graph.get(startLabel);
    let endVertex = graph.get(endLabel);
    if (!startVertex) {
      startVertex = new Vertex(startLabel);
      graph.add(startVertex);
    }
    if (!endVertex) {
      endVertex = new Vertex(endLabel);
      graph.add(endVertex);
    }

    startVertex.add(endVertex);
    endVertex.add(startVertex);
  });

  const start = graph.get("start") as Vertex;
  const end = graph.get("end") as Vertex;
  const allPaths = graph.generateAllPaths(start, end);

  return allPaths.length;
};
