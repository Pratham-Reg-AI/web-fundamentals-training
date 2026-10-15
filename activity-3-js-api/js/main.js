// main.js: starts the app and connects the UI to the API.
import { getProducts, searchProducts } from "./api.js";
import { Card } from "./views/card.js";

const list = document.querySelector("#product-list");
const status = document.querySelector("#status");
const form = document.querySelector("#search-form");
const input = document.querySelector("#search-input");

function setStatus(message, state = "") {
  status.textContent = message;
  status.className = `status ${state}`.trim();
}

// TODO 4: write load(query)
//   1. show a LOADING state  (status.textContent = "Loading products…")
//   2. try: await getProducts() or searchProducts(query)
//   3. SUCCESS: list.innerHTML = data.products.map(Card).join("")
//   4. EMPTY:   no products? show a "No products found" message
//   5. ERROR:   catch the error, show a message and a "Try again" button
async function load(query = "") {
  const trimmedQuery = query.trim();

  setStatus("Loading products…", "loading");
  list.innerHTML = "";

  try {
    const data = trimmedQuery
      ? await searchProducts(trimmedQuery)
      : await getProducts();

    const products = data.products ?? [];

    if (!products.length) {
      setStatus(
        trimmedQuery ? `No products found for "${trimmedQuery}"` : "No products found",
        "empty"
      );
      return;
    }

    list.innerHTML = products.map(Card).join("");
    setStatus(trimmedQuery ? `Showing results for "${trimmedQuery}"` : "Products loaded", "success");
  } catch (error) {
    console.error(error);
    setStatus("Something went wrong while loading products.", "error");

    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "btn retry-btn";
    retryButton.textContent = "Try again";
    retryButton.addEventListener("click", () => load(trimmedQuery));
    status.appendChild(retryButton);
  }
}

// TODO 5: on form submit, stop the page reload and call load(input.value.trim())
form.addEventListener("submit", (event) => {
  event.preventDefault();
  load(input.value.trim());
});

// Stretch: debounce the "input" event so search runs when typing pauses
let searchTimeoutId;
input.addEventListener("input", () => {
  clearTimeout(searchTimeoutId);
  searchTimeoutId = setTimeout(() => load(input.value.trim()), 400);
});

document.querySelector("#year").textContent = new Date().getFullYear();
load();
