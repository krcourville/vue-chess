import GridCell from "./GridCell";
import defaultCellFormatter from "./defaultCellFormatter";

const DEFAULT_GRID_WIDTH = 8;
const DEFAULT_GRID_HEIGHT = 8;

export default class Board {
  constructor(options = {}) {
    const { gridWidth, gridHeight, cellFormatter } = options;
    this.width = gridWidth || DEFAULT_GRID_WIDTH;
    this.height = gridHeight || DEFAULT_GRID_HEIGHT;
    this.cellFormatter = cellFormatter || defaultCellFormatter;
  }

  setup = () => {
    this._grid = [];
    let cellId = 0;
    for (let y = 0; y < this.height; y++) {
      this._grid[y] = [];
      for (let x = 0; x < this.width; x++) {
        cellId += 1;
        const cellOptions = this.cellFormatter({ x, y });
        const cell = new GridCell({
          cellId,
          ...cellOptions,
        });
        this.setCell({ x, y, cell });
      }
    }
  };

  place = ({ x, y, piece }) => {
    const cell = this.getCell({ x, y });
    cell.piece = piece;
    piece.moves = 0;
  };

  move = (cell1, cell2) => {
    const { piece } = cell1;
    cell2.piece = piece;
    cell1.piece = null;
    piece.moves += 1;
    return this;
  };

  getCell = ({ x, y }) => this._grid[y][x];

  setCell = ({ x, y, cell }) => {
    this._grid[y][x] = cell;
  };

  getGrid = () => this._grid;

  getRow = idx => this._grid[idx];

  isValidPoint = ({ x, y }) => {
    const valid = x >= 0 && x < this.width && y >= 0 && y < this.height;
    window.console.log("VALID", x, y, valid);
    return valid;
  };

  isVacant = point => {
    const cell = this.getCell(point);
    return cell.piece == null;
  };
}
