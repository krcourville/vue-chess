<template>
  <table class="game-table">
    <tbody>
      <tr v-for="(column, y) in grid" :key="y">
        <td :class="getClass(cell)" v-for="(cell, x) in column" :key="x">
          <piece-view v-bind="{cell, x, y}" @click.native.stop="$emit('cell-click', cell, x, y)"></piece-view>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import pieceView from "./PieceView"

export default {
  props: {
    board: {
      required: true
    }
  },

  computed: {
    grid() {
      return this.board.getGrid();
    },
    width() {
      return this.board.width;
    },
    height() {
      return this.board.height;
    }
  },

  methods: {
    getClass(cell) {
      return cell.isDark ?
        "cell cell-dark" :
        "cell cell-light";
    },
  },

  components: {
    pieceView
  }
}
</script>


<style scoped>
.game-table {
  border-collapse: collapse;
}

.cell {
  width: 3em;
  height: 3em;
}

.cell.cell-light {
  background-color: blanchedalmond;
}

.cell.cell-dark {
  background-color: black;
}
</style>
