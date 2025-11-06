// Coustom2.js
export function counterLogic(count, action) {
  if (action === "increment") {
    return count + 1;
  } else if (action === "decrement") {
    return count - 1;
  }
  return count;
}
