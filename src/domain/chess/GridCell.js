export default class GridCell {
  constructor(options) {
    this.piece = null;
    Object.keys(options).forEach(key => (this[key] = options[key]));
  }
}
