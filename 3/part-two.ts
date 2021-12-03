enum CommonBit {
  One,
  Zero,
  Equal,
}

const getCommonBit = (numbers: string[], position: number): CommonBit => {
  let count = 0;

  numbers.forEach((number) => {
    count += Number(number[position]);
  });

  if (count === numbers.length / 2) {
    return CommonBit.Equal;
  } else {
    return count < numbers.length / 2 ? CommonBit.Zero : CommonBit.One;
  }
};
export default (lines: string[]) => {
  const lineLength = lines[0].length
  let numbers = [...lines]

  for (let i = 0; i < lineLength; i++) {
    const commonBit = getCommonBit(numbers, i)
    // oxygen generator, equal counts as 1
    const target = commonBit === CommonBit.Zero ? "0" : "1"


    numbers = numbers.filter(number => number[i] === target)

    if (numbers.length === 1) break
  }

  const oxygenGeneratorRating = parseInt(numbers[0], 2)

  numbers = [...lines]

  for (let i = 0; i < lineLength; i++) {
    const commonBit = getCommonBit(numbers, i)
    // co2 scrubber, equal counts as 0
    const target = commonBit === CommonBit.Zero ? "1" : "0"

    numbers = numbers.filter(number => number[i] === target)
    if (numbers.length === 1) break
  }

  const co2ScrubberRating = parseInt(numbers[0], 2)

  return oxygenGeneratorRating * co2ScrubberRating
};
