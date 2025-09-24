document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.taesti-burger');
  const navLinks = document.querySelector('.taesti-links');
  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        burger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        burger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }
});
