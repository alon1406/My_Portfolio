// Mobile nav toggle and smooth scroll helpers
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href')?.slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// AI-style rotating hero line
const aiLineEl = document.getElementById('aiLine');

const aiLines = [
  "Fast learner · Team player · Problem solver",
  "Self-learning · Responsible · Motivated",
  "Curious · Organized · Detail-oriented"
];

aiLineEl.textContent = aiLines[0];

let index = 1;
setInterval(() => {
  aiLineEl.style.opacity = 0;

  setTimeout(() => {
    aiLineEl.textContent = aiLines[index];
    aiLineEl.style.opacity = 1;
    index = (index + 1) % aiLines.length;
  }, 400);

}, 3000);


if (aiLineEl) {
  let idx = 0;
  const updateLine = () => {
    aiLineEl.style.opacity = '0';
    setTimeout(() => {
      idx = (idx + 1) % aiLines.length;
      aiLineEl.textContent = aiLines[idx];
      aiLineEl.style.opacity = '1';
    }, 200);
  };
  setInterval(updateLine, 3400);
}

// Tilt hover effect for icons/pills
const tiltItems = document.querySelectorAll('.tilt');
tiltItems.forEach(item => {
  item.addEventListener('mousemove', e => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 6;
    const rotateY = ((x / rect.width) - 0.5) * -6;
    item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

// Scroll reveal for sections and cards
const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);
revealItems.forEach(el => revealObserver.observe(el));

// Subtle parallax for hero
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.transform = `perspective(1200px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
  });
  hero.addEventListener('mouseleave', () => {
    hero.style.transform = '';
  });
}

// Scroll progress bar and back-to-top
const progressBar = document.getElementById('progressBar');
const toTop = document.getElementById('toTop');

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${width}%`;
  if (toTop) {
    if (scrollTop > 260) {
      toTop.classList.add('show');
    } else {
      toTop.classList.remove('show');
    }
  }
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

if (toTop) {
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
