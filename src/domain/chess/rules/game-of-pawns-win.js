import * as PieceColor from "../PieceColor";

export default function gameOfPawnsWin({ game, logger }) {
  const { board } = game;
  const valid = true;

  const didWhiteWin = isInRow(board, 0, PieceColor.White);
  if (didWhiteWin) {
    logger.log("White Wins!");
    return {
      gameEnd: true,
      valid,
    };
  }

  const didBlackWin = isInRow(board, board.height - 1, PieceColor.Black);
  if (didBlackWin) {
    logger.log("Black Wins!");
    return {
      gameEnd: true,
      valid,
    };
  }

  return {
    valid,
  };
}

function isInRow(board, rowIdx, color) {
  return board
    .getRow(rowIdx)
    .some(cell => cell.piece && cell.piece.color === color);
}
