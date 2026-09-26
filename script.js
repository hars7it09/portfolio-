const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const yearEl = document.getElementById('current-year');
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const contactForm = document.getElementById('contactForm');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const terminalResponses = {
  help: `Available commands:\nhelp, skills, projects, clear, contact`,
  skills: `Languages: C, C++, Python, Bash\nNetworking: TCP/UDP, DHCP, Linux/POSIX APIs\nSecurity: Cryptography Basics, Auditing, GCC/G++, Git & GitHub`,
  projects: `DHCP Server\nSecureVault\nSystemScanner\nUse the repository links in the project cards to explore them.`,
  contact: `Email: harshitthakurdev@gmail.com\nGitHub: https://github.com/hars7it09\nLinkedIn: https://www.linkedin.com`,
  default: `Command not found. Try: help, skills, projects, clear, contact`
};

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;

    const command = terminalInput.value.trim().toLowerCase();
    const outputContainer = document.createElement('div');

    outputContainer.innerHTML = `
      <div class="command-entry">
        <span class="prompt">guest@harshit</span>
        <span class="path">~/portfolio</span>
        <span class="symbol">$</span>
        <span>${command || ' '}</span>
      </div>
    `;

    terminalOutput.appendChild(outputContainer);

    if (command === 'clear') {
      terminalOutput.innerHTML = '';
      terminalInput.value = '';
      return;
    }

    const response = terminalResponses[command] || terminalResponses.default;
    const responseNode = document.createElement('div');
    responseNode.className = 'output-block';
    responseNode.textContent = response;
    terminalOutput.appendChild(responseNode);
    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message')
    };

    let valid = true;

    Object.entries(fields).forEach(([key, field]) => {
      const errorEl = document.querySelector(`[data-error-for="${key}"]`);
      const value = field.value.trim();

      if (!value) {
        errorEl.textContent = 'This field is required.';
        valid = false;
        return;
      }

      if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorEl.textContent = 'Please enter a valid email address.';
        valid = false;
        return;
      }

      if (key === 'message' && value.length < 10) {
        errorEl.textContent = 'Message must be at least 10 characters.';
        valid = false;
        return;
      }

      errorEl.textContent = '';
    });

    if (!valid) return;

    alert('Thanks! Your message has been prepared for Harshit.');
    contactForm.reset();
  });
}
