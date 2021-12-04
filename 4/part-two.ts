type Combination = [number, number, number, number, number];
export type Ticket = {
  rows: Combination[];
  columns: Combination[];
};

export const checkTicket = (ticket: Ticket, numbers: number[]): boolean => {
  const combinationsToCheck = [...ticket.rows, ...ticket.columns];

  for (let i = 0; i < combinationsToCheck.length; i++) {
    const combination = combinationsToCheck[i];

    const winning = combination.every((number) => numbers.includes(number));
    if (winning) return true;
  }

  return false;
};

export const calculateTicketScore = (
  ticket: Ticket,
  numbers: number[],
): number => {
  const sumOfUnmarked = ([] as number[])
    .concat(...ticket.rows)
    .filter((number) => !numbers.includes(number))
    .reduce((sum: number, current: number) => sum + current, 0);
  const lastDrawn = numbers[numbers.length - 1];

  return sumOfUnmarked * lastDrawn;
};

export default (lines: string[]) => {
  const drawnNumbers = lines[0].split(",").map(Number);
  const ticketLines = lines.slice(1, lines.length);
  const tickets: Ticket[] = [];

  for (let i = 0; i < ticketLines.length / 6; i++) {
    const start = i * 6 + 1;
    const end = start + 5;
    const rows = ticketLines
      .slice(start, end)
      .map(
        (ticketLine) =>
          ticketLine.replaceAll("  ", " ").split(" ").map(
            Number,
          ) as Combination,
      );

    const columns = [0, 1, 2, 3, 4].map(
      (index) => rows.map((row) => row[index]) as Combination,
    );

    tickets.push({ rows, columns });
  }

  let remainingTickets = tickets;

  for (let i = 5; i < drawnNumbers.length; i++) {
    const numbers = drawnNumbers.slice(0, i);

    const remainingBefore = [...remainingTickets];

    remainingTickets = tickets.filter((ticket) =>
      !checkTicket(ticket, numbers)
    );

    if (remainingBefore.length === 1 && remainingTickets.length === 0) {
      return calculateTicketScore(remainingBefore[0], numbers);
    }
  }

  return 0;
};
