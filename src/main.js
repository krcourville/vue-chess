import Vue from "vue";
import App from "./App";

import Game from "./domain/chess/Game";
import ChessVue from "./chess-vue";
import Logger from "./Logger";

Vue.config.productionTip = false;

const logger = new Logger();

const game = new Game({ logger }).setup();
Vue.use(ChessVue, { game, logger });

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
});
