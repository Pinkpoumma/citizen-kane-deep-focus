// Smooth Scroll Navigation with accurate offset
const navLinks = document.querySelectorAll('nav a');
const navHeight = document.querySelector('nav').offsetHeight;

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    const offsetTop = target.offsetTop - navHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
  });
});

// Image Carousel
const images = document.querySelectorAll('.carousel-img');
let current = 0;

function showNextImage() {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}

setInterval(showNextImage, 4000);

// Fade-in effect for deep focus images
const deepFocusImages = document.querySelectorAll('.deep-focus-img');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

deepFocusImages.forEach(img => observer.observe(img));

// Set carousel to be taller but narrower
const carousel = document.querySelector('.carousel');
if (carousel) {
  carousel.style.height = '500px';
  carousel.style.maxWidth = '80%';
  carousel.style.margin = '2rem auto';
  carousel.querySelectorAll('img').forEach(img => {
    img.style.borderRadius = '16px';
  });
}

// Accurate section highlighting
const sections = document.querySelectorAll('main section');
const navItems = document.querySelectorAll('nav a');

function clearHighlights() {
  navItems.forEach(link => link.classList.remove('active-nav'));
}

function highlightCurrentSection() {
  let scrollY = window.scrollY + navHeight + 10;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      clearHighlights();
      const currentLink = document.querySelector(`nav a[href="#${id}"]`);
      if (currentLink) currentLink.classList.add('active-nav');
    }
  });
}

window.addEventListener('scroll', highlightCurrentSection);
window.addEventListener('load', highlightCurrentSection);