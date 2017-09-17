import { range } from "lodash";

export default function moveBuilder({ board, cell1 }) {
  const { x: x1, y: y1 } = cell1;
  const validPoint = point => board.isValidPoint(point);

  return {
    linear: {
      north(max) {
        const yRange = negativeRange(y1, max);
        const xRange = fillRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      south(max) {
        const yRange = positiveRange(y1, max);
        const xRange = fillRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      east(max) {
        const yRange = fillRange(y1, max);
        const xRange = positiveRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      west(max) {
        const yRange = fillRange(y1, max);
        const xRange = negativeRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      northWest(max) {
        const yRange = negativeRange(y1, max);
        const xRange = negativeRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      northEast(max) {
        const yRange = negativeRange(y1, max);
        const xRange = positiveRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      southEast(max) {
        const yRange = positiveRange(y1, max);
        const xRange = positiveRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
      southWest(max) {
        const yRange = positiveRange(y1, max);
        const xRange = negativeRange(x1, max);
        return joinRanges(xRange, yRange).filter(validPoint);
      },
    },
  };
}

function joinRanges(xRange, yRange) {
  return xRange.map((x, idx) => ({
    x: x,
    y: yRange[idx],
  }));
}

function fillRange(currentIdx, max) {
  return Array(max).fill(currentIdx);
}

function negativeRange(currentIdx, max) {
  const start = currentIdx - 1;
  const end = start - max - 1;
  const step = -1;
  return range(start, end, step);
}

function positiveRange(currentIdx, max) {
  const start = currentIdx + 1;
  const end = start + max + 1;
  const step = 1;
  return range(start, end, step);
}
