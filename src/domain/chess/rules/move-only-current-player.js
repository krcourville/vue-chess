export default function moveOnlyCurrentPlayer({ game, cell1, logger }) {
  const { player } = game;

  const { piece } = cell1;
  const { color } = piece;

  const valid = player === color;
  if (!valid) {
    logger.log(`Cannot move ${color}; it is ${player}'s turn.`);
  }

  return {
    game,
    valid,
    gameEnd: false,
  };
}
