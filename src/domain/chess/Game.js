import Board from "./Board";

import defaultRules from "./defaultRules";

export default class Game {
  constructor(options = {}) {
    const { rules, logger } = options;

    this._rules = rules || defaultRules;
    this.logger = logger;

    this.board = new Board(options);
    this.player = null;
  }

  setup = () => {
    this._rules.setup(this);
    this.logger.log("Game started.");
    return this;
  };

  applyMove = (cell1, cell2) => this._rules.applyMove(this, cell1, cell2);
}
