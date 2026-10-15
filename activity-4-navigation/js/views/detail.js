
import { getProduct } from "../api.js";

export async function DetailView(app, id) {
  app.innerHTML = `
    <a href="#/" class="back-link">← Back to products</a>
    <p class="status" role="status">Loading product…</p>
  `;

  try {
    const product = await getProduct(id);
    const stock = product.stock > 0 ? `${product.stock} in stock` : "Out of stock";
    const rating = product.rating?.toFixed(1) ?? "0.0";
    const image = product.images?.[0] ?? product.thumbnail ?? "";

    document.title = `${product.title} | Cartly`;
    app.innerHTML = `
      <a href="#/" class="back-link">← Back to products</a>
      <article class="detail" aria-live="polite">
        <img src="${image}" alt="${product.title}" width="600" height="600">
        <div>
          <p class="card-category">${product.category ?? "Uncategorized"} · ${product.brand ?? "Cartly"}</p>
          <h1 id="page-title" tabindex="-1">${product.title}</h1>
          <p class="price">$${Number(product.price).toFixed(2)}</p>
          <p>${product.description}</p>
          <dl class="facts">
            <dt>Rating</dt>
            <dd>${rating} / 5</dd>
            <dt>Stock</dt>
            <dd class="${product.stock === 0 ? "stock-low" : ""}">${stock}</dd>
          </dl>
        </div>
      </article>
    `;

    const heading = app.querySelector("#page-title");
    heading?.focus();
  } catch (error) {
    document.title = "Product not found | Cartly";
    app.innerHTML = `
      <section class="state" aria-live="polite">
        <h1 id="page-title" tabindex="-1">Product not found</h1>
        <p>We couldn’t find that product.</p>
        <a href="#/" class="btn">← Back to products</a>
      </section>
    `;

    const heading = app.querySelector("#page-title");
    heading?.focus();
  }
}
