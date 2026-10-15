// card.js: a "component": takes one product object, returns an HTML string.
//
// A product from the API looks like:
// { id: 1, title: "Essence Mascara Lash Princess", price: 9.99,
//   rating: 2.56, category: "beauty", brand: "Essence",
//   thumbnail: "https://cdn.dummyjson.com/..." }

export function Card(product) {
  const brand = product.brand ?? "Cartly";
  const price = Number(product.price ?? 0).toFixed(2);

  return `
    <li class="card">
      <article>
        <img
          src="${product.thumbnail}"
          alt="${product.title} by ${brand}"
          width="300"
          height="300"
          loading="lazy"
        >
        <div>
          <p class="card-category">${product.category}</p>
          <h3 class="card-title">${product.title}</h3>
          <p class="card-price">$${price}</p>
          <p class="card-rating">⭐ ${product.rating ?? "N/A"}</p>
          <button type="button" class="btn">Add to cart</button>
        </div>
      </article>
    </li>
  `;
}
