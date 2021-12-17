type Point = [number, number];
type Axis = "x" | "y";
type Fold = {
  axis: Axis;
  value: number;
};

const pts = (p: Point): string => `${p[0]},${p[1]}`;
const stp = (s: string): Point => s.split(",").map(Number) as Point;

const foldAlong = (axis: Axis, value: number, points: Set<string>) => {
  const newPoints: Set<string> = new Set();

  points.forEach((pointString: string) => {
    const [x, y] = stp(pointString);

    if (axis === "x") {
      if (x > value) newPoints.add(pts([2 * value - x, y]));
      else newPoints.add(pointString);
    } else if (axis === "y") {
      if (y > value) newPoints.add(pts([x, 2 * value - y]));
      else newPoints.add(pointString);
    }
  });

  return newPoints;
};

const gridToString = (pointStrings: Set<string>) => {
  const grid: boolean[][] = [];

  pointStrings.forEach((pointString) => {
    const [x, y] = stp(pointString);

    if (grid[y] === undefined) grid[y] = [];

    grid[y][x] = true;
  });

  let finalString = "";

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      finalString += grid[y][x] === true ? "#" : " ";
    }
    finalString += "\n";
  }

  return finalString;
};

export default (lines: string[]) => {
  const splitPoint = lines.indexOf("");

  const pointLines = lines.slice(0, splitPoint);
  const foldLines = lines.slice(splitPoint + 1, lines.length);

  const points = new Set(pointLines);
  const folds: Fold[] = foldLines.map((foldLine) => {
    const [axis, value] = foldLine.replace("fold along ", "").split("=");
    return { axis: axis as Axis, value: Number(value) };
  });

  const finalState = folds.reduce(
    (currentPoints, fold) => foldAlong(fold.axis, fold.value, currentPoints),
    points,
  );

  return gridToString(finalState);
};
