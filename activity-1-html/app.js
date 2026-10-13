// Display the current year in the footer.
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Demo functionality for Add to Cart buttons.
const cartButtons = document.querySelectorAll("[data-add-to-cart]");

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Added to cart!");
  });
});

// Demo newsletter subscription.
const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm && newsletterMessage) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newsletterMessage.textContent =
      "Thank you for subscribing! This is a demo.";
      
    newsletterForm.reset();
  });
}
