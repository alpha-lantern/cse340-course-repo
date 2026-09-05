document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      // Toggle 'active' classes
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');

      // Update accessibility state
      const isExpanded = hamburgerBtn.classList.contains('active');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    // document.addEventListener('click', (e) => {
    //   if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
    //     hamburgerBtn.classList.remove('active');
    //     navMenu.classList.remove('active');
    //     hamburgerBtn.setAttribute('aria-expanded', 'false');
    //   }
    // });
    // Still need to understand this functionality to add it
  }
});