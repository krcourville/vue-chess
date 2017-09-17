export default class Piece {
  constructor(options = {}) {
    const { color, type } = options;
    if (color === null) {
      throw new Error("color is required");
    }
    this.color = color;
    if (type === null) {
      throw new Error("type is required");
    }
    this.type = type;
    this.moves = 0;
  }
}
