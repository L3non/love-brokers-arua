/* == == == Header == == == */
const header = document.querySelector('header'),
      navMenu = document.getElementById('nav_menu'),
      navToggle = document.getElementById('nav_toggle'),
      navClose = document.getElementById('nav_close'),
      navActions = document.querySelectorAll('.action');

let lastScrollY = window.scrollY;

// Toggle menu function
function toggleMenu(open) {
    if (open) {
        navMenu.classList.add('show_menu');
        document.body.style.overflow = 'hidden'; // Disable scroll
        header.style.position = 'fixed'; // Fix header position
    } else {
        navMenu.classList.remove('show_menu');
        document.body.style.overflow = ''; // Enable scroll
        header.style.position = ''; // Reset header position
    }
}

// Open menu
navToggle.addEventListener('click', () => toggleMenu(true));

// Close menu (when clicking close button)
navClose.addEventListener('click', () => toggleMenu(false));

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
        toggleMenu(false);
    }
});

// Scroll behavior for hiding header
window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('show_menu')) return; // Prevent hiding when menu is open

    const currentScrollY = window.scrollY;
    
    // Hide the header when scrolling down, show when scrolling up
    header.style.transform = currentScrollY > lastScrollY ? 'translateY(-100%)' : 'translateY(0)';
    
    if (currentScrollY === 0) {
        header.style.backgroundColor = 'transparent';
        navActions.forEach(action => action.style.color = 'var(--light)');
        header.classList.remove('scrolled');
    } else {
        header.style.backgroundColor = 'var(--light)';
        navActions.forEach(action => action.style.color = 'var(--dark)');
        header.classList.add('scrolled');
    }

    lastScrollY = currentScrollY;
});