import * as PieceColor from "../PieceColor";
import * as PieceType from "../PieceType";
import moveBuilder from "./move-builder";

export default function pawnMoveRule({ game, logger, cell1, cell2 }) {
  let valid = true;

  const { board } = game;
  const { piece: piece1 } = cell1;
  const { type, moves, color } = piece1;
  const { piece: piece2 } = cell2;
  //
  // only care about pawns
  if (type !== PieceType.Pawn) {
    return { valid };
  }

  const { x: x1 } = cell1;
  const { x: x2, y: y2 } = cell2;

  const isCaptureMove = x1 !== x2 && piece2 != null;
  const move = moveBuilder({ board, cell1 });
  const { linear } = move;

  let candidatePoints = [];
  if (!isCaptureMove) {
    const max = moves === 0 ? 2 : 1;
    const { north, south } = linear;
    candidatePoints = color === PieceColor.White ? north(max) : south(max);
    candidatePoints = candidatePoints.filter(point => board.isVacant(point));
  } else {
    valid = false;
    const max = 1;
    const { northWest, southWest, northEast, southEast } = linear;
    candidatePoints =
      color === PieceColor.White
        ? [...northWest(max), ...northEast(max)]
        : [...southEast(max), ...southWest(max)];
    candidatePoints = candidatePoints.filter(point => !board.isVacant(point));
    logger.log(`CAPTURED: ${cell2.piece.type} (${x2}, ${y2})`);
  }
  valid = candidatePoints.some(({ x, y }) => x === x2 && y === y2);
  return { valid };
}
