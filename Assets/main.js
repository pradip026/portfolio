// ===== THEME =====
let isDark = true;

function toggleTheme() {
  isDark = !isDark;
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ===== NAVIGATION =====
function navigateTo(section) {
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  updateActiveLink(section);
}

function updateActiveLink(section) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === section);
  });
}

// ===== SCROLL EFFECTS =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  // Navbar scroll effect
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top visibility
  if (window.scrollY > window.innerHeight * 0.8) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active section detection
  const sections = ['Home', 'About', 'Skills', 'Resume', 'Contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 300 && rect.bottom >= 300) {
        updateActiveLink(id);
      }
    }
  });
});

// Back to top click
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TYPING ANIMATION =====
function typeText() {
  const text = 'Network Security Engineer & Programmer';
  const el = document.getElementById('typedText');
  if (!el) return;
  let i = 0;
  const timer = setInterval(() => {
    if (i <= text.length) {
      el.innerHTML = text.slice(0, i) + '<span class="typed-cursor">|</span>';
      i++;
    } else {
      clearInterval(timer);
    }
  }, 50);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
}

// ===== SKILL BAR ANIMATION =====
function initSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.skill-fill');
        bars.forEach((bar, i) => {
          setTimeout(() => {
            const level = bar.dataset.level;
            bar.style.width = level + '%';
            bar.classList.add('animated');
          }, i * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('Skills');
  if (skillsSection) observer.observe(skillsSection);
}

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = (Math.random() * 4 + 2) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = i % 2 === 0 ? '#00f0ff' : '#7b2ff7';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = '0.3';
    particle.style.animationDuration = (3 + Math.random() * 4) + 's';
    particle.style.animationDelay = (Math.random() * 2) + 's';
    container.appendChild(particle);
  }
}

// ===== BACKGROUND LINES =====
function createBackgroundLines() {
  const container = document.getElementById('bg-lines');
  if (!container) return;

  // Vertical lines
  [10, 25, 40, 60, 75, 90].forEach((left, i) => {
    const line = document.createElement('div');
    line.style.cssText = `position:absolute;left:${left}%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,transparent,${i%2===0?'rgba(0,240,255,0.08)':'rgba(123,47,247,0.06)'},transparent)`;
    const dot = document.createElement('div');
    dot.style.cssText = `position:absolute;width:3px;height:80px;left:-1px;background:linear-gradient(180deg,transparent,${i%2===0?'rgba(0,240,255,0.6)':'rgba(123,47,247,0.5)'},transparent);border-radius:2px;animation:travelDown ${8+i*2}s linear infinite;animation-delay:${i*1.5}s;box-shadow:0 0 10px ${i%2===0?'rgba(0,240,255,0.4)':'rgba(123,47,247,0.3)'}`;
    line.appendChild(dot);
    container.appendChild(line);
  });

  // Horizontal lines
  [15, 35, 55, 75, 90].forEach((top, i) => {
    const line = document.createElement('div');
    line.style.cssText = `position:absolute;top:${top}%;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${i%2===0?'rgba(0,240,255,0.05)':'rgba(123,47,247,0.04)'},transparent)`;
    const dot = document.createElement('div');
    dot.style.cssText = `position:absolute;height:3px;width:120px;top:-1px;background:linear-gradient(90deg,transparent,${i%2===0?'rgba(0,240,255,0.4)':'rgba(123,47,247,0.35)'},transparent);border-radius:2px;animation:travelRight ${12+i*3}s linear infinite;animation-delay:${i*2}s;box-shadow:0 0 8px ${i%2===0?'rgba(0,240,255,0.3)':'rgba(123,47,247,0.25)'}`;
    line.appendChild(dot);
    container.appendChild(line);
  });

  // Glow nodes
  [{x:25,y:35},{x:60,y:15},{x:75,y:55},{x:40,y:75},{x:10,y:55},{x:90,y:35}].forEach((pos, i) => {
    const node = document.createElement('div');
    node.style.cssText = `position:absolute;left:${pos.x}%;top:${pos.y}%;width:6px;height:6px;border-radius:50%;background:${i%2===0?'rgba(0,240,255,0.4)':'rgba(123,47,247,0.4)'};box-shadow:0 0 15px ${i%2===0?'rgba(0,240,255,0.3)':'rgba(123,47,247,0.3)'};animation:nodePulse ${3+i}s ease-in-out infinite;animation-delay:${i*0.8}s`;
    container.appendChild(node);
  });
}

// ===== CONTACT FORM VALIDATION =====
function containsCode(text) {
  const patterns = [/<[^>]*>/, /\{[^}]*\}/, /function\s*\(/, /=>\s*\{/, /<script/i, /javascript:/i, /on\w+\s*=/i, /eval\s*\(/, /document\./, /window\./, /import\s+/, /require\s*\(/, /SELECT\s+.*FROM/i, /INSERT\s+INTO/i, /DROP\s+TABLE/i, /;\s*(var|let|const)\s+/, /\$\{.*\}/];
  return patterns.some(p => p.test(text));
}

function validateEmailFormat(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function sanitize(text) {
  return text.replace(/[<>{}]/g, '').trim();
}

function validateField(field) {
  const input = document.getElementById(field + 'Input');
  const status = document.getElementById(field + 'Status');
  const value = input.value;

  input.classList.remove('valid', 'error');
  status.className = 'field-status';
  status.textContent = '';

  if (field === 'name') {
    const clean = sanitize(value);
    if (!clean) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Name is required'; }
    else if (clean.length < 2) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Name must be at least 2 characters'; }
    else if (containsCode(value)) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Invalid characters detected'; }
    else { input.classList.add('valid'); status.className = 'field-status valid'; status.textContent = '✓ Valid'; }
  }

  if (field === 'email') {
    if (!value.trim()) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Email is required'; }
    else if (!validateEmailFormat(value.trim())) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Please enter a valid email'; }
    else if (containsCode(value)) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Invalid characters detected'; }
    else { input.classList.add('valid'); status.className = 'field-status valid'; status.textContent = '✓ Valid email'; }
  }

  if (field === 'message') {
    const clean = sanitize(value);
    const charCount = document.getElementById('charCount');
    if (charCount) charCount.textContent = clean.length + ' / 10 min';
    if (!clean) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Message is required'; }
    else if (clean.length < 10) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Message must be at least 10 characters'; }
    else if (containsCode(value)) { input.classList.add('error'); status.className = 'field-status error'; status.textContent = '⚠️ Code or scripts are not allowed'; }
    else { input.classList.add('valid'); status.className = 'field-status valid'; status.textContent = '✓ Valid message'; }
  }

  updateSubmitButton();
}

function isFormValid() {
  const name = sanitize(document.getElementById('nameInput').value);
  const email = document.getElementById('emailInput').value.trim();
  const message = sanitize(document.getElementById('messageInput').value);
  return name.length >= 2 && validateEmailFormat(email) && message.length >= 10 &&
    !containsCode(document.getElementById('nameInput').value) &&
    !containsCode(email) &&
    !containsCode(document.getElementById('messageInput').value);
}

function updateSubmitButton() {
  const btn = document.getElementById('submitBtn');
  if (isFormValid()) { btn.classList.add('active'); btn.disabled = false; }
  else { btn.classList.remove('active'); btn.disabled = true; }
}

function handleSubmit() {
  if (!isFormValid()) return;

  const name = sanitize(document.getElementById('nameInput').value);
  const email = document.getElementById('emailInput').value.trim();
  const message = sanitize(document.getElementById('messageInput').value);

  const _d = [112,114,97,100,105,112,112,97,110,100,105,116,57,56,49,56,48,64,103,109,97,105,108,46,99,111,109];
  const target = _d.map(c => String.fromCharCode(c)).join('');

  const subject = encodeURIComponent('Portfolio Contact: ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

  window.open('mailto:' + target + '?subject=' + subject + '&body=' + body, '_blank');

  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('messageInput').value = '';
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('valid', 'error'));
    document.querySelectorAll('.field-status').forEach(el => { el.textContent = ''; el.className = 'field-status'; });
    updateSubmitButton();
  }, 4000);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  typeText();
  createParticles();
  createBackgroundLines();
  initScrollReveal();
  initSkillBars();
});