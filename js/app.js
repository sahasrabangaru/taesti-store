/* ====== Tæsti site bootstrap ====== */
/* EDIT THESE to your real shop: */
const SHOPIFY_DOMAIN = 'taesti.myshopify.com';
const SHOPIFY_BASE   = `https://${SHOPIFY_DOMAIN}`;
const ACCOUNT_LOGIN     = `${SHOPIFY_BASE}/account/login?return_url=%2Faccount`;
const ACCOUNT_REGISTER  = `${SHOPIFY_BASE}/account/register`;
const ACCOUNT_DASHBOARD = `${SHOPIFY_BASE}/account`;

const PRODUCT_BRACELET_URL = `${SHOPIFY_BASE}/products/bracelet`;     // update handle
const PRODUCT_REFILL_URL   = `${SHOPIFY_BASE}/products/refill-pack`;  // update handle

function byText(selector, text){
  return [...document.querySelectorAll(selector)]
    .find(el => el.textContent.trim().toLowerCase() === text.toLowerCase());
}

document.addEventListener('DOMContentLoaded', () => {
  /* 0) Header scroll style toggle (for inspo look) */
  const hdr = document.querySelector('.site-header');
  const onScroll = () => hdr && hdr.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll);

  /* 1) Remove visible “Skip to main content” links */
  document.querySelectorAll('a').forEach(a=>{
    if (a.textContent.trim().toLowerCase() === 'skip to main content') a.remove();
  });

  /* 2) Make logo clickable to home */
  const logo = document.querySelector('.logo, header .brand, header [data-logo]');
  if (logo && logo.tagName !== 'A') {
    const link = document.createElement('a');
    link.href = '/index.html';
    link.setAttribute('aria-label','Tæsti home');
    link.className = (logo.className || '') + ' logo';
    link.innerHTML = logo.innerHTML || 'TÆSTI';
    logo.replaceWith(link);
  }

  /* 3) Nav: ensure exactly one “Shop” item → /shop.html */
  const navShops = [...document.querySelectorAll('nav a')]
    .filter(a => /shop/i.test(a.textContent));
  // keep the first, remove duplicates
  navShops.slice(1).forEach(a => a.remove());
  if (navShops[0]) navShops[0].href = '/shop.html';
  if (location.pathname.endsWith('/shop.html') && navShops[0]) {
    navShops[0].setAttribute('aria-current','page');
  }

  /* 4) Fix account icon/link globally if it points to an image */
  document.querySelectorAll('a[href$="account-logo.png"]').forEach(a=>{
    a.href = '/account.html'; a.setAttribute('aria-label','Account');
  });

  /* 5) Account page: wire buttons + orders link if present */
  if (location.pathname.endsWith('/account.html')) {
    const login = byText('a,button', 'Sign In') || document.getElementById('btn-login');
    const reg   = byText('a,button', 'Register') || document.getElementById('btn-register');
    const orders= byText('a', 'Go to My Orders') || document.getElementById('link-orders');
    if (login)  { if (login.tagName !== 'A') { const a = document.createElement('a'); a.className = login.className; a.textContent = login.textContent; login.replaceWith(a); login = a; } login.href = ACCOUNT_LOGIN; }
    if (reg)    { if (reg.tagName   !== 'A') { const a = document.createElement('a'); a.className = reg.className;   a.textContent = reg.textContent;   reg.replaceWith(a);   reg = a; }   reg.href   = ACCOUNT_REGISTER; }
    if (orders) { orders.href = ACCOUNT_DASHBOARD; }
  }

  /* 6) Rename “See the Pods” → “See the Bracelets” and link to Shop */
  document.querySelectorAll('a,button').forEach(el=>{
    const t = el.textContent.trim();
    if (/^see the pods$/i.test(t)) {
      el.textContent = 'See the Bracelets';
      if (el.tagName === 'A') { el.href = '/shop.html'; }
    }
  });

  /* 7) Shop page: make CTAs clickable even if plain text */
  if (location.pathname.endsWith('/shop.html')) {
    // Convert any “Add to Cart” elements inside product cards into working links
    document.querySelectorAll('.product-card, .card, .product').forEach(card=>{
      const isRefill = /refill/i.test(card.textContent);
      let cta = [...card.querySelectorAll('a,button')].find(el => /add to cart|add to bag|buy now/i.test(el.textContent));
      if (!cta) return;
      if (cta.tagName !== 'A') {
        const a = document.createElement('a');
        a.className = cta.className || 'btn-primary';
        a.textContent = cta.textContent || 'Add to Cart';
        cta.replaceWith(a); cta = a;
      }
      cta.href = isRefill ? PRODUCT_REFILL_URL : PRODUCT_BRACELET_URL;
      cta.setAttribute('rel','noopener'); // safety for external
    });
  }
});
