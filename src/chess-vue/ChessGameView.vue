<template>
  <div>
    <board class="board" :board="game.board" @cell-click="handleCellClick">
    </board>

    <aside>
      <div>
        <strong>Player: </strong>{{game.player}}
      </div>
      <div>
        <strong>Instructions: </strong>{{state}}

        <button v-if="showCancel" @click.stop="clearSelection">Cancel</button>
      </div>
      <div>
        <button v-if="gameEnd" @click.stop="newGame">Play Again?</button>
      </div>
      <div class="log">
        <div v-for="(item, idx) in messages" :key="idx">
          <div>{{item}}</div>
        </div>
      </div>

    </aside>

  </div>
</template>

<script>
import Game from '@/domain/chess/Game'
import board from './BoardView'

const STATE_SELECTING_PIECE = "Select a Piece";
const STATE_SELECTING_TARGET = "Select a Target";

export default {
  name: 'ChessGameView',

  data() {
    return {
      state: STATE_SELECTING_PIECE,
      selectedCell: null,
      game: this.$game,
      gameEnd: false,
      messages: []
    }
  },

  mounted() {
    if (!(this.$game instanceof Game)) {
      throw new Error("this.$game is invalid")
    }

    this.loadMessages();
    this.subscription = this.$logger.subscribe(this.loadMessages);
  },

  beforeDestroy() {
    if (typeof this.subscription === "function") {
      this.subscription();
    }
  },

  computed: {
    showCancel() {
      return this.state === STATE_SELECTING_TARGET;
    },
    board() {
      return this.game.board;
    }
  },

  methods: {
    newGame() {
      window.location.reload();
    },
    handleCellClick(cell) {
      if (this.gameEnd) {
        return;
      }
      const { piece } = cell;
      switch (this.state) {
        case STATE_SELECTING_PIECE: {
          if (piece == null) {
            return;
          }
          this.selectedCell = cell;
          this.state = STATE_SELECTING_TARGET;
          break;
        }

        case STATE_SELECTING_TARGET: {
          const cell1 = this.selectedCell;
          const cell2 = cell;

          const { game, gameEnd } = this.game.applyMove(cell1, cell2);
          this.game = game;
          this.gameEnd = gameEnd;
          this.clearSelection();
        }

      }
    },
    clearSelection() {
      this.state = STATE_SELECTING_PIECE;
      this.selectedCell = null;
    },
    loadMessages() {
      this.messages = this.$logger.getMessages().slice();
    }
  },

  components: {
    board
  }

}
</script>

<style scoped>
.board {
  float: left;
  margin-right: 15px;
}

aside {
  float: left;
  min-height: 100%;
  min-width: 48%;
  overflow: scroll;
  height: 1000px;
}

.log {
  background-color: lightslategray;
  min-width: 100%;
  color: whitesmoke;
  padding: 4px;
}
</style>

