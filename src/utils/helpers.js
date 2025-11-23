export const toNumber = (value) => {
  const n = parseFloat(value);
  return isNaN(n) ? 0 : n;
};

export function validateOrder(form) {
  if (!form.name || !form.name.trim()) return "Customer name is required";
  if (!form.product || !form.product.trim()) return "Product name is required";
  const p1 = parseFloat(form.price1);
  const p2 = parseFloat(form.price2);
  if (isNaN(p1) || p1 < 0) return "Price 1 must be a valid non-negative number";
  if (isNaN(p2) || p2 < 0) return "Price 2 must be a valid non-negative number";
  return null;
}
