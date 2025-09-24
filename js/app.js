// Mobile Navbar Hamburger and Shopify modal logic
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.taesti-burger');
  const navLinks = document.querySelector('.taesti-nav-center');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        navLinks.classList.remove('open');
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
});
