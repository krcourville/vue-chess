import ChessGameView from "./ChessGameView.vue";

export default (Vue, { game, logger }) => {
  Vue.component("chess-game", ChessGameView);

  Object.assign(Vue.prototype, {
    $game: game,
    $logger: logger,
  });
};
