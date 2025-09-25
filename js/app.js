document.addEventListener('DOMContentLoaded', function () {
  // Hamburger menu
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
  // Account icon routing: always go to Shopify login
  const profileBtn = document.querySelector('.taesti-profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', function () {
      window.location.href = "https://vk009q-ne.myshopify.com/account/login";
    });
  }
});
// Marquee hover-to-pause, fade-in/slide on scroll, and hero animation

// Marquee pause on hover (CSS animation-play-state handles most cases)
document.querySelectorAll('.marquee-content').forEach(marquee => {
  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
});

// Fade-in animation for hero, sections, images, etc.
function fadeInOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Animate hero text on load
window.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.hero-content')?.classList.add('visible');
});
