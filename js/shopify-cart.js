// Map variant IDs to product info for cart display
const TAESTI_PRODUCTS = {
  "44536169431087": {
    name: "Tæsti Bar Bracelet — Gold",
    image: "bracelet.jpg",
    price: "35.00"
  },
  "44536169758767": {
    name: "Refill Pack",
    image: "refill.jpg",
    price: "10.00"
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
        const variantId = item.variant.id.split("/").pop();
        const prod = TAESTI_PRODUCTS[variantId];
        return `
          <div style="display:flex;align-items:center;margin-bottom:1.2rem;">
            <img src="${prod ? prod.image : ''}" alt="${item.title}" style="width:80px;height:80px;border-radius:16px;box-shadow:0 2px 8px #e754801a;margin-right:1.5rem;object-fit:cover;">
            <div>
              <div style="font-weight:bold;font-size:1.25rem;">${prod ? prod.name : item.title} &times;${item.quantity}</div>
              <div style="color:#E75480;font-weight:700;font-size:1.15rem;margin-top:2px;">$${prod ? prod.price : item.variant.price}</div>
            </div>
          </div>
        `;
      }).join('') +
      `<div style="margin-top:1.4rem;font-size:1.2rem;">
        <strong>Subtotal:</strong> $${Number(cart.subtotalPrice).toFixed(2)}
      </div>
      <div style="margin-top:2rem;">
        <button class="checkout-btn" style="background:#E75480;color:#fff;font-size:1.2rem;padding:1rem 2.2rem;border-radius:9999px;border:none;cursor:pointer;font-weight:700;" onclick="openEmbeddedCheckout()">Checkout</button>
      </div>`;
  }
}

function openEmbeddedCheckout() {
  const cart = window.taestiCart;
  if (cart && cart.webUrl) {
    // Show iframe modal with Shopify checkout
    const checkoutModal = document.createElement('div');
    checkoutModal.style.position = 'fixed';
    checkoutModal.style.top = '0';
    checkoutModal.style.left = '0';
    checkoutModal.style.width = '100vw';
    checkoutModal.style.height = '100vh';
    checkoutModal.style.background = 'rgba(0,0,0,0.5)';
    checkoutModal.style.display = 'flex';
    checkoutModal.style.justifyContent = 'center';
    checkoutModal.style.alignItems = 'center';
    checkoutModal.style.zIndex = '9999';
    checkoutModal.innerHTML = `
      <iframe src="${cart.webUrl}" style="width:90vw;height:90vh;border-radius:18px;border:none;background:#fff;"></iframe>
      <button style="position:absolute;top:32px;right:32px;font-size:2rem;background:#fff;border:none;color:#E75480;padding:0.5rem 1rem;border-radius:50%;cursor:pointer" onclick="this.parentElement.remove()">&times;</button>
    `;
    document.body.appendChild(checkoutModal);
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
