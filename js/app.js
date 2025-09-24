// Hamburger menu and Account button routing
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
  // Account icon routing: always go to Shopify login (Shopify will redirect if logged in)
  const profileBtn = document.querySelector('.taesti-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', function () {
      window.location.href = "https://vk009q-ne.myshopify.com/account/login";
    });
  }
});
