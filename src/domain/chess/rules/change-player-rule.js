import * as PieceColor from "../PieceColor";

export default function changePlayerRule({ game }) {
  const { player } = game;
  game.player =
    player === PieceColor.White ? PieceColor.Black : PieceColor.White;

  return {
    game,
    valid: true,
    gameEnd: false,
  };
}
