enum Direction {
  Up = "up",
  Down = "down",
  Forward = "forward",
}

type Movement = {
  direction: Direction;
  value: number;
};

function processMovements(movements: Movement[]): [number, number] {
  let aim = 0;
  let position = 0;
  let depth = 0;

  movements.forEach((movement) => {
    if (movement.direction === Direction.Forward) {
      position += movement.value;
      depth += aim * movement.value;
    } else if (movement.direction === Direction.Down) {
      aim += movement.value;
    } else if (movement.direction === Direction.Up) {
      aim -= movement.value;
    }
  });

  return [position, depth];
}

export default (lines: string[]) => {
  const movements: Movement[] = lines.map((line) => {
    const [direction, stringValue] = line.split(" ");
    const value = Number(stringValue);

    return { direction: direction as Direction, value };
  });
  const [position, depth] = processMovements(movements);
  return position * depth;
};
