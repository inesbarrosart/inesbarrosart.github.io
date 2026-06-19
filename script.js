/* =========================================
   INÉS BARROS ART — script.js
   ========================================= */

// ── LOADER ──
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('fade-out'), 400);
});

// ── NAVBAR scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MENÚ HAMBURGUESA ──
function toggleMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  }
}
function closeMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (toggle) toggle.classList.remove('active');
  if (links) links.classList.remove('active');
}

// ── ANIMACIONES SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// ── CARRUSEL COLECCIONES ──
function scrollCarousel(id, dir) {
  const track = document.getElementById(id);
  if (!track) return;
  const item = track.querySelector('.carousel-item');
  if (!item) return;
  const itemWidth = item.offsetWidth + 14;
  track.scrollBy({ left: dir * itemWidth * 2, behavior: 'smooth' });
}

// ── CARRUSEL EVENTOS ──
let eventoIndex = 0;

function moverEventos(dir) {
  const track = document.getElementById('eventos-track');
  if (!track) return;
  const imgs = track.querySelectorAll('img');
  eventoIndex = (eventoIndex + dir + imgs.length) % imgs.length;
  track.style.transform = `translateX(-${eventoIndex * 100}%)`;
  actualizarDots();
}

function actualizarDots() {
  document.querySelectorAll('#eventos-dots .dot').forEach((d, i) => {
    d.classList.toggle('active', i === eventoIndex);
  });
}

window.addEventListener('load', () => {
  const track = document.getElementById('eventos-track');
  if (!track) return;
  const imgs = track.querySelectorAll('img');
  const dotsContainer = document.getElementById('eventos-dots');
  if (!dotsContainer) return;
  imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => {
      eventoIndex = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      actualizarDots();
    };
    dotsContainer.appendChild(dot);
  });
});

// ── CARRUSEL MINI (hero index) ──
let heroIndex = 0;
function moverHero(dir) {
  const track = document.getElementById('heroTrack');
  if (!track) return;
  const imgs = track.querySelectorAll('img');
  heroIndex = (heroIndex + dir + imgs.length) % imgs.length;
  track.style.transform = `translateX(-${heroIndex * 100}%)`;
}
setInterval(() => {
  const track = document.getElementById('heroTrack');
  if (!track) return;
  const imgs = track.querySelectorAll('img');
  if (!imgs.length) return;
  heroIndex = (heroIndex + 1) % imgs.length;
  track.style.transform = `translateX(-${heroIndex * 100}%)`;
}, 4000);

// ── MODAL OBRAS ──
function openModal(img, collection, title, desc) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  document.getElementById('modalImg').src = img;
  document.getElementById('modalCollection').textContent = collection || '';
  document.getElementById('modalTitle').textContent = title || '';
  document.getElementById('modalDesc').textContent = desc || '';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal');
  if (modal && e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
function toggleDropdown() {
  const menu = document.getElementById('dropdownMenu');
  if (menu) menu.classList.toggle('active');
}
document.addEventListener('click', (e) => {
  const dropdown = document.querySelector('.contacto-dropdown');
  const menu = document.getElementById('dropdownMenu');
  if (menu && dropdown && !dropdown.contains(e.target)) {
    menu.classList.remove('active');
  }
});
function toggleDropdown2() {
  const menu = document.getElementById('dropdownMenu2');
  if (menu) menu.classList.toggle('active');
}
document.addEventListener('click', (e) => {
  const dropdown2 = document.querySelector('.contacto-dropdown:nth-of-type(2)');
  const menu2 = document.getElementById('dropdownMenu2');
  if (menu2 && dropdown2 && !dropdown2.contains(e.target)) {
    menu2.classList.remove('active');
  }
});
const formContacto = document.getElementById('formContacto');
if (formContacto) {
  formContacto.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(formContacto);
    fetch('https://formspree.io/f/xdavwyrd', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
  window.location.href = 'https://inesbarrosart.github.io/gracias.html';
})
    .catch(error => {
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o escríbenos por WhatsApp.');
    });
  });
}
