/* == == == Sub Header == == == */
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    const subHeader = document.getElementById("sub_header");
    let lastScrollTop = 0;

    function getHeaderHeight() {
        return window.innerWidth < 1023 ? 56 : 81;
    }

    window.addEventListener("scroll", function () {
        let currentScroll = window.scrollY;
        let headerHeight = getHeaderHeight();

        if (currentScroll > lastScrollTop) {
            // Scroll down -> header disappears and sub-header goes up
            header.style.transform = "translateY(-100%)";
            subHeader.style.top = "0";
        } else {
            // Scroll up -> header reappears and sub-header moves down
            header.style.transform = "translateY(0)";
            subHeader.style.top = `${headerHeight}px`; // Adjusts to fit the screen
        }

        lastScrollTop = currentScroll;
    });

    // Updates the header height if the screen is resized
    window.addEventListener("resize", function () {
        subHeader.style.top = `${getHeaderHeight()}px`;
    });
});

// Tabs
const tabsContainer = document.querySelector('.tabs_container'),
      tabsList = tabsContainer.querySelector('ul'),
      tabBtns = tabsList.querySelectorAll('a'),
      tabPanels = tabsContainer.querySelectorAll('.tabs_panels > article');

tabsList.setAttribute('role', 'tablist');

tabsList.querySelectorAll('li').forEach((listitem) => {
    listitem.setAttribute('role', 'presentation');
});

tabBtns.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');

    if (index === 0) {
        tab.setAttribute('aria-selected', 'true');
    } else {
        tab.setAttribute('tabindex', '-1');
        tabPanels[index].setAttribute('hidden', '');
    }
});

tabPanels.forEach((panel) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '0');
});

tabsContainer.addEventListener('click', (e) => {
    const clickedTab = e.target.closest('a');
    if (!clickedTab) return;
    e.preventDefault();

    switchTab(clickedTab);
});

tabsContainer.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'Home':
            e.preventDefault();
            switchTab(tabBtns[0]);
            break;
        case 'End':
            e.preventDefault();
            switchTab(tabBtns[tabBtns.length - 1]);
            break;
    }
});

function moveLeft() {
    const currentTab = document.activeElement;

    if (!currentTab.parentElement.previousElementSibling) {
        switchTab(tabBtns[tabBtns.length - 1]);
    } else {
        switchTab(currentTab.parentElement.previousElementSibling.querySelector('a'));
    }
}

function moveRight() {
    const currentTab = document.activeElement;

    if (!currentTab.parentElement.nextElementSibling) {
        switchTab(tabBtns[0]);
    } else {
        switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
    }
}

function switchTab(newTab) {
    const activePanelId = newTab.getAttribute('href'),
          activePanel = tabsContainer.querySelector(activePanelId);

    tabBtns.forEach((btn) => {
        btn.setAttribute('aria-selected', false);
        btn.setAttribute('tabindex', '-1');
    })
    
    tabPanels.forEach((panel) => {
        panel.setAttribute('hidden', true);
    });
    activePanel.removeAttribute('hidden');
    newTab.setAttribute('aria-selected', true);
    newTab.setAttribute('tabindex', '0');
    newTab.focus();
}

// Search
let searchBtn = document.querySelector('.search_btn'),
    closeBtn = document.querySelector('.close_btn'),
    searchBox = document.querySelector('.search_box'),
    searchInput = document.querySelector('#search'),
    items = document.querySelectorAll('.item'),
    noResults = document.querySelector('.no_results');

// Function to format strings (remove accents and convert to lowercase)
function formatString(value) {
    return value
        ? value.trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove accents
        : '';
}

// Event to display the search box
searchBtn.onclick = function () {
    searchBox.classList.add('active');
    closeBtn.classList.add('active');
    searchBtn.classList.add('active');
};

// Event to close the search box
closeBtn.onclick = function () {
    searchBox.classList.remove('active');
    closeBtn.classList.remove('active');
    searchBtn.classList.remove('active');
    searchInput.value = ''; // Clear the search field
    filterItems(); // Resets the display of items
};

// Research event
searchInput.addEventListener('input', () => {
    filterItems();
});

// Function to filter items
function filterItems() {
    const value = formatString(searchInput.value);
    let hasResults = false;

    items.forEach(item => {
        const itemDescriptionElement = item.querySelector('.card_description');
        const itemDescription = itemDescriptionElement ? itemDescriptionElement.textContent : '';

        if (formatString(itemDescription).includes(value)) {
            item.style.display = 'flex';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Show or hide the "No results found" message
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// Function to check for items and display the message "No results found"
function checkNoResults() {
    let visibleItems = Array.from(items).some(item => item.style.display !== 'none');
    
    if (noResults) {
        noResults.style.display = visibleItems ? 'none' : 'block';
    }
}

// Run the check initially
checkNoResults();



// Cards
// Image carousel
let swiper = new Swiper('.swiper', {
    loop: 'true',

    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});