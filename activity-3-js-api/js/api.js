// api.js: every network call lives here.
// The rest of the app should never call fetch() directly.

const BASE_URL = "https://dummyjson.com";

// TODO 1: write a helper that GETs a path and returns parsed JSON.
//   - await fetch(`${BASE_URL}${path}`)
//   - if response.ok is false, throw new Error(...)
//   - return response.json()
async function getJSON(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// TODO 2: GET /products?limit=12
export function getProducts(limit = 12) {
  return getJSON(`/products?limit=${limit}`);
}

// TODO 3: GET /products/search?q=<query>
// Hint: wrap the query in encodeURIComponent()
export function searchProducts(query) {
  return getJSON(`/products/search?q=${encodeURIComponent(query)}`);
}
