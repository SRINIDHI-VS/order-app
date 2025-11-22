const BASE_URL =
  "https://6867b50de3fefb261edfb282.mockapi.io/nolte/api/v1/order";

export async function fetchOrders() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function updateOrder(id, order) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function deleteOrder(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
