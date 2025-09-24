// Shopify Integration
const SHOPIFY_BASE = 'https://vk009q-ne.myshopify.com';

// Optional product URLs if you’re not using Buy Buttons yet:
const PRODUCT_BRACELET_URL = `${SHOPIFY_BASE}/products/bracelet`;
const PRODUCT_REFILL_URL   = `${SHOPIFY_BASE}/products/refill-pack`;

// Account routes
const ACCOUNT_LOGIN     = `${SHOPIFY_BASE}/account/login?return_url=%2Faccount`;
const ACCOUNT_REGISTER  = `${SHOPIFY_BASE}/account/register`;
const ACCOUNT_DASHBOARD = `${SHOPIFY_BASE}/account`; // shows orders after login
const ACCOUNT_ORDERS    = `${SHOPIFY_BASE}/account`; // fallback; Shopify shows orders inside dashboard

// Header scroll: transparent -> cream
window.addEventListener('scroll', () => {
  const h = document.querySelector('.site-header');
  if (!h) return;
  h.classList.toggle('is-scrolled', window.scrollY > 10);
});
