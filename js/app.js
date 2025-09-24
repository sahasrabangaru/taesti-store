// ====== Tæsti site bootstrap ======
const SHOPIFY_DOMAIN = 'vk009q-ne.myshopify.com';                 // TODO: set real domain
const SHOPIFY_BASE   = `https://${SHOPIFY_DOMAIN}`;
const ACCOUNT_LOGIN     = `${SHOPIFY_BASE}/account/login?return_url=%2Faccount`;
const ACCOUNT_REGISTER  = `${SHOPIFY_BASE}/account/register`;
const ACCOUNT_DASHBOARD = `${SHOPIFY_BASE}/account`;
const PRODUCT_BRACELET_URL = `${SHOPIFY_BASE}/products/bracelet`;     // TODO: real handle
const PRODUCT_REFILL_URL   = `${SHOPIFY_BASE}/products/refill-pack`;  // TODO: real handle

function byText(selector, text){
  return [...document.querySelectorAll(selector)]
    .find(el => el.textContent.trim().toLowerCase() === text.toLowerCase());
}

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const hdr = document.querySelector('.site-header');
  const onScroll = () => hdr && hdr.classList.toggle('is-scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll);

  // Remove visible “Skip to main content”
  document.querySelectorAll('a').forEach(a=>{
    if (a.textContent.trim().toLowerCase() === 'skip to main content') a.remove();
  });

  // Make logo clickable to home
  const logo = document.querySelector('.logo, header .brand, header [data-logo]');
  if (logo && logo.tagName !== 'A') {
    const link = document.createElement('a');
    link.href = '/index.html'; link.setAttribute('aria-label','Tæsti home');
    link.className = (logo.className || '') + ' logo';
    link.innerHTML = logo.innerHTML || 'TÆSTI';
    logo.replaceWith(link);
  }

  // Nav: ensure single “Shop” linking to /shop.html
  const navShops = [...document.querySelectorAll('nav a')].filter(a => /shop/i.test(a.textContent));
  navShops.slice(1).forEach(a => a.remove()); // remove duplicates
  if (navShops[0]) navShops[0].href = '/shop.html';
  if (location.pathname.endsWith('/shop.html') && navShops[0]) {
    navShops[0].setAttribute('aria-current','page');
  }

  // Account icon: if linking to image, fix to /account.html
  document.querySelectorAll('a[href$="account-logo.png"]').forEach(a=>{
    a.href = '/account.html'; a.setAttribute('aria-label','Account');
  });

  // Account page wiring
  if (location.pathname.endsWith('/account.html')) {
    let login = byText('a,button', 'Sign In') || document.getElementById('btn-login');
    let reg   = byText('a,button', 'Register') || document.getElementById('btn-register');
    const orders= byText('a', 'Go to My Orders') || document.getElementById('link-orders');
    if (login)  { if (login.tagName !== 'A') { const a=document.createElement('a'); a.className=login.className; a.textContent=login.textContent||'Sign In'; login.replaceWith(a); login=a; } login.href = ACCOUNT_LOGIN; }
    if (reg)    { if (reg.tagName   !== 'A') { const a=document.createElement('a'); a.className=reg.className;   a.textContent=reg.textContent||'Register'; reg.replaceWith(a);   reg=a;   } reg.href   = ACCOUNT_REGISTER; }
    if (orders) orders.href = ACCOUNT_DASHBOARD;
  }

  // Rename “See the Pods” → “See the Bracelets” and link to Shop
  document.querySelectorAll('a,button').forEach(el=>{
    const t = el.textContent.trim();
    if (/^see the pods$/i.test(t)) {
      el.textContent = 'See the Bracelets';
      if (el.tagName === 'A') el.href = '/shop.html';
    }
  });

  // Shop page: ensure “Add to Cart” CTAs are clickable
  if (location.pathname.endsWith('/shop.html')) {
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
      cta.setAttribute('rel','noopener');
    });
  }
});
