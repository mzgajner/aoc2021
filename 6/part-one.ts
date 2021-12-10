const LIFECYCLE = 6;

export const progressOneDay = (today: number[]) => {
  const tomorrow: number[] = [];
  let newOnes = 0;
  today.forEach((fish) => {
    if (fish === 0) {
      tomorrow.push(LIFECYCLE);
      newOnes++;
    } else {
      tomorrow.push(fish - 1);
    }
  });

  for (let i = 0; i < newOnes; i++) {
    tomorrow.push(LIFECYCLE + 2);
  }

  return tomorrow;
};

export const progressMultipleDays = (start: number[], days: number) => {
  let end = start;

  for (let i = 0; i < days; i++) {
    end = progressOneDay(end);
  }

  return end;
};

export default (lines: string[]) => {
  const startingFish = lines[0].split(",").map(Number);
  const endingFish = progressMultipleDays(startingFish, 80);

  return endingFish.length;
};
