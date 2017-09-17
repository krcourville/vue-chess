import changePlayerRule from "@/domain/chess/rules/change-player-rule";
import * as PieceColor from "@/domain/chess/PieceColor";

describe("changePlayerRule", () => {
  it("should change white to black", () => {
    const game = {
      player: PieceColor.White,
    };
    changePlayerRule({ game });
    expect(game.player).to.equal(PieceColor.Black);
  });
  it("should change black to white", () => {
    const game = {
      player: PieceColor.Black,
    };
    changePlayerRule({ game });
    expect(game.player).to.equal(PieceColor.White);
  });
});
