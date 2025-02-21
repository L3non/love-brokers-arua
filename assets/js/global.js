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
    
    const isAtTop = currentScrollY === 0;

    header.style.backgroundColor = isAtTop ? 'transparent' : 'var(--light)';
    header.classList.toggle('scrolled', !isAtTop);
    navActions.forEach(action => action.style.color = isAtTop ? 'var(--light)' : 'var(--dark)');

    lastScrollY = currentScrollY;
});

// Modal
const openModalBtn = document.getElementById('open_modal');
const modalContainer = document.getElementById('modal_container');
const closeModalBtns = document.querySelectorAll('.close_modal');

function showModal() {
    modalContainer.classList.add('show_modal');
    document.body.classList.add('modal_open'); // Prevent scrolling
}

function closeModal() {
    modalContainer.classList.remove('show_modal');
    document.body.classList.remove('modal_open'); // Enable scrolling again
}

// Open modal
openModalBtn.addEventListener('click', showModal);

// Close modal on button click
closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));

// Close modal when clicking outside it
modalContainer.addEventListener('click', (event) => {
    if (event.target === modalContainer) {
        closeModal();
    }
});
