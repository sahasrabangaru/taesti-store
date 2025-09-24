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
      cart.lineItems.map(item =>
        `<div>${item.title} x${item.quantity} — $${item.variant.price}</div>`
      ).join('') +
      `<div><strong>Subtotal:</strong> $${cart.subtotalPrice}</div>`;
  }
}

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
});
