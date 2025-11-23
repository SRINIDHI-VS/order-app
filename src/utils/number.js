export const toNumber = (value) => {
  const n = parseFloat(value);
  return isNaN(n) ? 0 : n;
};
