// Marquee scroll animation
document.addEventListener('DOMContentLoaded', function () {
  const marquee = document.querySelector('.marquee__track');
  if (marquee) {
    marquee.style.animation = 'marquee 14s linear infinite';
  }
});

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.taesti-burger');
  const navCenter = document.querySelector('.taesti-nav-center');
  burger?.addEventListener('click', function () {
    navCenter.classList.toggle('open');
    document.body.classList.toggle('menu-open', navCenter.classList.contains('open'));
    burger.setAttribute('aria-expanded', navCenter.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (
      navCenter.classList.contains('open') &&
      !navCenter.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      navCenter.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Accessibility: Close menu with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const navCenter = document.querySelector('.taesti-nav-center');
    const burger = document.querySelector('.taesti-burger');
    if (navCenter?.classList.contains('open')) {
      navCenter.classList.remove('open');
      document.body.classList.remove('menu-open');
      burger?.setAttribute('aria-expanded', 'false');
    }
  }
});
