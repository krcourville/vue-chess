export default function processRules(rules, context) {
  const { game, cell1, cell2, logger } = context;
  const { piece, x: x1, y: y1 } = cell1;
  const { x: x2, y: y2 } = cell2;
  const { type } = piece;
  const { movement, win } = rules;

  const brokenMovementRule = movement.find(rule => {
    const { valid } = rule(context);
    return !valid;
  });

  if (brokenMovementRule) {
    logger.log("Invalid Move!");
    return {
      ...context,
      ...brokenMovementRule,
    };
  }

  game.board = game.board.move(cell1, cell2);
  logger.log(`MOVE: ${type} (${x1},${y1}) => (${x2},${y2})`);

  const winRule = win.find(rule => {
    const { gameEnd } = rule(context);
    return gameEnd;
  });

  return {
    gameEnd: winRule != null,
    ...context,
  };
}
