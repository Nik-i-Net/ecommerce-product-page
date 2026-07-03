const cartPopup = document.querySelector(".cart-popup");
const cartBtn = document.querySelector(".header-cart-btn");
cartBtn.addEventListener("click", function () {
  cartPopup.classList.toggle("hidden");
});

const lightboxOverlay = document.querySelector(".lightbox-overlay");
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxCloseBtn = document.querySelector(".lightbox-close");
const productGalleryBtn = document.querySelector(".product-gallery-btn");

productGalleryBtn.addEventListener("click", function () {
  lightboxOverlay.classList.remove("hidden");
});

lightboxCloseBtn.addEventListener("click", function () {
  lightboxOverlay.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightboxOverlay.classList.add("hidden");
  }
});

lightboxOverlay.addEventListener("click", function () {
  lightboxOverlay.classList.add("hidden");
});

lightboxContainer.addEventListener("click", (e) => e.stopPropagation());
