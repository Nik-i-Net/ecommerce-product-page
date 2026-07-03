const cartPopup = document.querySelector(".cart-popup");
const cartBtn = document.querySelector(".header-cart-btn");
const lightboxOverlay = document.querySelector(".lightbox-overlay");
const lightboxContainer = document.querySelector(".lightbox-container");
const lightboxCloseBtn = document.querySelector(".lightbox-close");
const productGalleryBtn = document.querySelector(".product-gallery-btn");

cartBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  cartPopup.classList.toggle("hidden");
});

document.addEventListener("click", function () {
  cartPopup.classList.add("hidden");
});

cartPopup.addEventListener("click", (e) => e.stopPropagation());

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cartPopup.classList.add("hidden");
    lightboxOverlay.classList.add("hidden");
  }
});

productGalleryBtn.addEventListener("click", function () {
  lightboxOverlay.classList.remove("hidden");
});

lightboxCloseBtn.addEventListener("click", function () {
  lightboxOverlay.classList.add("hidden");
});

lightboxOverlay.addEventListener("click", function () {
  lightboxOverlay.classList.add("hidden");
});

lightboxContainer.addEventListener("click", (e) => e.stopPropagation());
