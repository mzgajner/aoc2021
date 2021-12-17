type Point = [number, number];
type Axis = "x" | "y";

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

export default (lines: string[]) => {
  const splitPoint = lines.indexOf("");

  const pointLines = lines.slice(0, splitPoint);
  const foldLines = lines.slice(splitPoint + 1, lines.length);

  const points = new Set(pointLines);

  const foldPoint = foldLines[0].replace("fold along ", "").split("=");

  const folded = foldAlong(foldPoint[0] as Axis, Number(foldPoint[1]), points);

  return folded.size;
};
