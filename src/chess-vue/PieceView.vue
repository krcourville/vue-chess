<template>
  <button :class="cssClass">
    <span>{{caption}}</span>
  </button>
</template>

<script>
import { get } from "lodash";

export default {
  props: {
    cell: {
      required: true
    }
  },

  computed: {
    piece() {
      return this.cell.piece || {};
    },
    type() {
      return get(this.cell, "piece.type", null);
    },
    caption() {
      if (this.type == null) {
        return "";
      }

      return String(this.type).substr(0, 2);
    },
    cssClass() {
      return `piece ${this.piece.color}`
    }
  }

}
</script>

<style scoped>
.piece {
  min-width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 1.25em;
}

.piece.white {
  color: white;
  text-shadow: -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
}

.piece.black {
  color: black;
  text-shadow: -1px -1px 0 #FFF,
  1px -1px 0 #FFF,
  -1px 1px 0 #FFF,
  1px 1px 0 #FFF;
}
</style>

