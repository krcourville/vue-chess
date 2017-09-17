import rules from "./rules/game-of-pawns-ruleset";
import ruleProcessor from "./rules/rule-processor";
import * as PieceType from "./PieceType";
import * as PieceColor from "./PieceColor";
import Piece from "./Piece";

export default {
  setup(game) {
    const { board } = game;
    const { height } = board;

    // white goes first
    game.player = PieceColor.White;

    // use default board setup
    board.setup();

    // 1 row of white pawns
    fillPawnRow(height - 2, board, PieceColor.White);

    // 1 row of black pawns
    fillPawnRow(1, board, PieceColor.Black);
  },

  applyMove(game, cell1, cell2) {
    const { logger } = game;

    const result = ruleProcessor(rules, {
      game,
      cell1,
      cell2,
      logger,
    });
    return {
      game,
      ...result,
    };
  },
};

function fillPawnRow(rowIdx, board, color) {
  for (let x = 0; x < board.width; x++) {
    const piece = new Piece({
      color,
      type: PieceType.Pawn,
    });
    board.place({
      x,
      y: rowIdx,
      piece,
    });
  }
}
