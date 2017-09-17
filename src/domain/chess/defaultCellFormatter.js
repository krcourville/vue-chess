export default ({ x, y }) => {
  const isDark =
    y % 2 === 0 ? (x % 2 === 0 ? true : false) : x % 2 === 0 ? false : true;

  return {
    isDark,
    x,
    y,
  };
};
