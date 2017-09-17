import { get } from "lodash";

export default function noMoveOnSameColor({ cell1, cell2 }) {
  const color1 = get(cell1, "piece.color", null);
  const color2 = get(cell2, "piece.color", null);

  return {
    valid: color1 !== color2,
  };
}
