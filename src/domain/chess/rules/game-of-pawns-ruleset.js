import pawnMoveRule from "./pawn-move-rule";
import changePlayerRule from "./change-player-rule";
import moveOnlyCurrentPlayer from "./move-only-current-player";
import noMoveOnSameColor from "./no-move-on-same-color";
import gameOfPawnsWin from "./game-of-pawns-win";

export default {
  movement: [
    moveOnlyCurrentPlayer,
    noMoveOnSameColor,
    pawnMoveRule,
    changePlayerRule,
  ],
  win: [gameOfPawnsWin],
};
