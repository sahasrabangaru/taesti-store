// Map product/variant IDs to images and names for cart display
const TAESTI_PRODUCTS = {
  "44536169431087": {
    name: "Tæsti Bar Bracelet — Gold",
    image: "bracelet.jpg",
    price: "$35" // You can update this to pull from Shopify if you want
  },
  "44536169758767": {
    name: "Refill Pack",
    image: "refill.jpg",
    price: "$10"
  }
};

function encodeShopifyGid(id, type = 'ProductVariant') {
  return btoa(`gid://shopify/${type}/${id}`);
}

window.taestiAddToCart = async function(productId, variantId, quantity = 1) {
  const client = window.taestiShopifyClient();
  if (!window.taestiCart) {
    window.taestiCart = await client.checkout.create();
  }
  window.taestiCart = await client.checkout.addLineItems(window.taestiCart.id, [{
    variantId: encodeShopifyGid(variantId),
    quantity: quantity
  }]);
  taestiOpenCartOverlay(window.taestiCart);
};

function taestiOpenCartOverlay(cart) {
  const drawer = document.querySelector('.cart-drawer');
  if (drawer) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.querySelector('.cart-contents').innerHTML =
      cart.lineItems.map(item => {
        const prod = TAESTI_PRODUCTS[item.variant.id.split("/").pop()];
        return `
          <div style="display:flex;align-items:center;margin-bottom:1.2rem;">
            <img src="${prod ? prod.image : ''}" alt="${item.title}" style="width:60px;height:60px;border-radius:12px;box-shadow:0 2px 8px #e754801a;margin-right:1rem;">
            <div>
              <div style="font-weight:bold;">${prod ? prod.name : item.title} &times;${item.quantity}</div>
              <div style="color:#E75480;font-weight:700;">${item.variant.price ? "$" + item.variant.price : prod ? prod.price : ""}</div>
            </div>
          </div>
        `;
      }).join('') +
      `<div style="margin-top:1.4rem;"><strong>Subtotal:</strong> $${cart.subtotalPrice}</div>`;
  }
}

// Cart icon click opens cart drawer
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      window.taestiAddToCart(
        btn.dataset.productId,
        btn.dataset.variantId,
        1
      );
    });
    btn.addEventListener('keydown', function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
  // Cart icon event
  const cartIcon = document.querySelector('.taesti-cart-btn');
  if (cartIcon) {
    cartIcon.addEventListener('click', function() {
      taestiOpenCartOverlay(window.taestiCart || {lineItems:[],subtotalPrice:"0.00"});
    });
  }
});
