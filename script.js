const $ = {
  headerCartBtn: document.querySelector(".header-cart-btn"),
  headerCartBadge: document.querySelector(".header-cart-badge"),
  cartPopup: document.querySelector(".cart-popup"),
  cartEmpty: document.querySelector("#cart-empty"),
  cartFilled: document.querySelector("#cart-filled"),
  cartItems: document.querySelector(".cart-items"),
  cartItemTemplate: document.getElementById("cart-item-template"),

  productGalleryBtn: document.querySelector(".product-gallery-btn"),
  productImages: document.querySelectorAll(".product-image"),
  productThumbnailBtns: document.querySelectorAll(".product-thumbnail-btn"),
  productQuantity: document.querySelector("#product-quantity"),
  productQuantityDescreaseBtn: document.querySelector("#product-quantity-decrease-btn"),
  productQuantityInscreaseBtn: document.querySelector("#product-quantity-increase-btn"),
  addToCartBtn: document.querySelector("#add-to-cart-btn"),

  lightboxOverlay: document.querySelector(".lightbox-overlay"),
  lightboxContainer: document.querySelector(".lightbox-container"),
  lightboxImages: document.querySelectorAll(".lightbox-image"),
  lightboxCloseBtn: document.querySelector(".lightbox-close"),
  lightboxPrevBtn: document.querySelector(".lightbox-prev"),
  lightboxNextBtn: document.querySelector(".lightbox-next"),
  lightboxThumbnailBtns: document.querySelectorAll(".lightbox-thumbnail-btn"),
};

const PRODUCT = { id: "product-123", name: "Fall Limited Edition Sneakers", price: 125 };
const TOTAL_IMAGES = $.productImages.length;
const state = {
  activeImageIndex: 0,
  productQuantity: 0,
  cartItems: [],
};

const storedCart = localStorage.getItem("cart");
if (storedCart) setCartItems(JSON.parse(storedCart));

function setActiveImageIndex(newIndex) {
  const curIndex = state.activeImageIndex;
  if (curIndex === newIndex) return;
  state.activeImageIndex = newIndex;

  $.productImages[curIndex].classList.remove("active");
  $.productImages[newIndex].classList.add("active");

  $.productThumbnailBtns[curIndex].classList.remove("selected");
  $.productThumbnailBtns[newIndex].classList.add("selected");

  $.lightboxImages[curIndex].classList.remove("active");
  $.lightboxImages[newIndex].classList.add("active");

  $.lightboxThumbnailBtns[curIndex].classList.remove("selected");
  $.lightboxThumbnailBtns[newIndex].classList.add("selected");
}

function setProductQuantity(quantity) {
  state.productQuantity = quantity;
  $.productQuantity.textContent = quantity;
}

function setCartItems(items) {
  state.cartItems = items;
  renderCart();
  localStorage.setItem("cart", JSON.stringify(items));
}

function renderCart() {
  const cartItemCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  $.headerCartBadge.textContent = cartItemCount;

  if (cartItemCount === 0) {
    $.cartEmpty.classList.remove("hidden");
    $.cartFilled.classList.add("hidden");
    $.headerCartBadge.classList.add("hidden");
  } else {
    $.cartEmpty.classList.add("hidden");
    $.cartFilled.classList.remove("hidden");
    $.headerCartBadge.classList.remove("hidden");
  }

  $.cartItems.innerHTML = "";

  state.cartItems.forEach((item) => {
    const clone = $.cartItemTemplate.content.cloneNode(true);
    clone.querySelector(".cart-item-name").textContent = item.name;
    clone.querySelector(".cart-item-unit-price").textContent = `$${item.price.toFixed(2)}`;
    clone.querySelector(".cart-item-quantity").textContent = item.quantity;
    clone.querySelector(".cart-item-subtotal").textContent = `$${item.subtotal.toFixed(2)}`;
    clone.querySelector(".cart-item-remove-btn").dataset.itemId = item.id;
    $.cartItems.appendChild(clone);
  });
}

$.productGalleryBtn.addEventListener("click", () => {
  $.lightboxOverlay.classList.remove("hidden");
});

$.productThumbnailBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => setActiveImageIndex(i));
});

$.lightboxOverlay.addEventListener("click", () => {
  $.lightboxOverlay.classList.add("hidden");
});

$.lightboxContainer.addEventListener("click", (e) => e.stopPropagation());

$.lightboxCloseBtn.addEventListener("click", () => {
  $.lightboxOverlay.classList.add("hidden");
});

$.lightboxPrevBtn.addEventListener("click", () => {
  const newIndex = (state.activeImageIndex - 1 + TOTAL_IMAGES) % TOTAL_IMAGES;
  setActiveImageIndex(newIndex);
});

$.lightboxNextBtn.addEventListener("click", () => {
  const newIndex = (state.activeImageIndex + 1) % TOTAL_IMAGES;
  setActiveImageIndex(newIndex);
});

$.lightboxThumbnailBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => setActiveImageIndex(i));
});

$.productQuantityDescreaseBtn.addEventListener("click", () => {
  const curQuantity = state.productQuantity;
  if (curQuantity === 0) return;
  setProductQuantity(curQuantity - 1);
});

$.productQuantityInscreaseBtn.addEventListener("click", () => {
  const curQuantity = state.productQuantity;
  if (curQuantity === 9) return;
  setProductQuantity(curQuantity + 1);
});

$.addToCartBtn.addEventListener("click", () => {
  const quantity = Number($.productQuantity.textContent);
  if (quantity === 0) return;

  const subtotal = quantity * PRODUCT.price;
  const cartItems = [...state.cartItems];

  const cartItemIdx = state.cartItems.findIndex((i) => i.id === PRODUCT.id);
  if (cartItemIdx === -1) {
    cartItems.push({ ...PRODUCT, quantity, subtotal });
  } else {
    cartItems[cartItemIdx].quantity += quantity;
    cartItems[cartItemIdx].subtotal += subtotal;
  }

  setCartItems(cartItems);
  setProductQuantity(0);
});

$.headerCartBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  $.cartPopup.classList.toggle("hidden");
});

$.cartPopup.addEventListener("click", (e) => e.stopPropagation());

$.cartItems.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".cart-item-remove-btn");
  if (!removeBtn) return;

  const cartItems = state.cartItems.filter((i) => i.id !== removeBtn.dataset.itemId);
  setCartItems(cartItems);
});

document.addEventListener("click", () => {
  $.cartPopup.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $.cartPopup.classList.add("hidden");
    $.lightboxOverlay.classList.add("hidden");
  }
});
