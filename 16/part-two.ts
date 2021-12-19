enum PacketType {
  Sum,
  Product,
  Minimum,
  Maximum,
  Literal,
  GreaterThan,
  LessThan,
  EqualTo,
}

export class Packet {
  version: number;
  type: PacketType;
  value: number;
  children: Packet[];

  constructor(
    version: number,
    type: PacketType,
    value: number,
    children: Packet[],
  ) {
    this.version = version;
    this.type = type;
    this.value = value;
    this.children = children;
  }

  getValue(): number {
    if (this.type === PacketType.Literal) {
      return this.value;
    } else {
      const values = this.children.map((child) => child.getValue());
      switch (this.type) {
        case PacketType.Sum:
          return values.reduce((sum, current) => sum + current, 0);
        case PacketType.Product:
          return values.reduce((sum, current) => sum * current, 1);
        case PacketType.Minimum:
          return Math.min(...values);
        case PacketType.Maximum:
          return Math.max(...values);
        case PacketType.GreaterThan:
          return values[0] > values[1] ? 1 : 0;
        case PacketType.LessThan:
          return values[0] < values[1] ? 1 : 0;
        case PacketType.EqualTo:
          return values[0] === values[1] ? 1 : 0;
      }
    }
  }

  static parseLiteralContent(content: string): [number, string] {
    let keepParsing = true;
    let currentPosition = 0;
    let bitString = "";
    while (keepParsing) {
      const chunk = content.substring(currentPosition, currentPosition + 5);
      keepParsing = chunk[0] === "1";
      bitString += chunk.substring(1);
      currentPosition += 5;
    }
    let remainder = content.substring(currentPosition);
    if (!remainder.includes("1")) remainder = "";
    return [parseInt(bitString, 2), remainder];
  }

  static parseOperatorContent(string: string): [Packet[], string] {
    const lengthTypeId = Number(string[0]);
    string = string.substring(1);

    if (lengthTypeId === 0) {
      const CUTOFF_POSITION = 15;
      const lengthOfPackets = parseInt(
        string.substring(0, CUTOFF_POSITION),
        2,
      );
      string = string.substring(CUTOFF_POSITION);
      const [children, _] = Packet.parseFromString(
        string.substring(0, lengthOfPackets),
      );
      string = string.substring(lengthOfPackets);
      return [children, string];
    } else {
      const CUTOFF_POSITION = 11;
      const numberOfPackets = parseInt(
        string.substring(0, CUTOFF_POSITION),
        2,
      );
      string = string.substring(CUTOFF_POSITION);
      const [children, remainder] = Packet.parseFromString(
        string,
        numberOfPackets,
      );
      string = remainder;
      return [children, string];
    }
  }

  static parseFromString(
    string: string,
    limit = Infinity,
  ): [Packet[], string] {
    const packets: Packet[] = [];
    while (packets.length < limit && string.length > 0) {
      const version = parseInt(string.substring(0, 3), 2);
      const typeId = parseInt(string.substring(3, 6), 2);
      const type = typeId as PacketType;
      string = string.substring(6);

      if (type === PacketType.Literal) {
        const [value, remainder] = Packet.parseLiteralContent(string);
        const packet = new Packet(version, type, value, []);
        packets.push(packet);
        string = remainder;
      } else {
        const [children, remainder] = Packet.parseOperatorContent(string);
        const packet = new Packet(version, type, -1, children);
        packets.push(packet);
        string = remainder;
      }
    }
    return [packets, string];
  }
}

export const hexToBitString = (string: string): string =>
  string.split("").map((hexChar) =>
    parseInt(hexChar, 16).toString(2).padStart(4, "0")
  ).join("");

export default (lines: string[]) => {
  const binary = hexToBitString(lines[0]);

  const [packet, _] = Packet.parseFromString(binary, 1);

  return packet[0].getValue();
};
