// Hamburger menu and Shopify cart logic
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.taesti-burger');
  const navLinks = document.querySelector('.taesti-nav-center');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      document.body.classList.toggle('menu-open', navLinks.classList.contains('open'));
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Profile icon routing (Shopify account)
  const profileBtn = document.querySelector('.taesti-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', function (e) {
      window.location.href = "/account/login";
    });
  }

  // Shopify Buy Button integration
  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    ShopifyBuyInit();
  } else {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    script.onload = ShopifyBuyInit;
    document.head.appendChild(script);
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'vk009q-ne.myshopify.com',
      storefrontAccessToken: '68658f29831d54af40b0163aed05afa5'
    });
    ShopifyBuy.UI.onReady(client).then(function(ui) {
      if (document.getElementById('product-component-bracelet')) {
        ui.createComponent('product', {
          id: '1758566044400',
          node: document.getElementById('product-component-bracelet'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              buttonDestination: 'cart',
              layout: 'vertical',
              iframe: false,
              styles: { button: { 'background-color': '#E75480', 'color': '#fff', 'border-radius': '9999px', 'font-weight': '700' } },
              events: { addVariantToCart: function() { openCartDrawer(); } }
            },
            cart: { popup: false }
          }
        });
      }
      if (document.getElementById('product-component-refill')) {
        ui.createComponent('product', {
          id: '1758566044401',
          node: document.getElementById('product-component-refill'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              buttonDestination: 'cart',
              layout: 'vertical',
              iframe: false,
              styles: { button: { 'background-color': '#E75480', 'color': '#fff', 'border-radius': '9999px', 'font-weight': '700' } },
              events: { addVariantToCart: function() { openCartDrawer(); } }
            },
            cart: { popup: false }
          }
        });
      }
    });
    function openCartDrawer() {
      var drawer = document.querySelector('.cart-drawer');
      if (drawer) {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        var focusable = drawer.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (focusable) focusable.focus();
      }
    }
  }
});
