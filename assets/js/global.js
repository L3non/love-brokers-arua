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

// Modal controls
const openModalBtn = document.getElementById("open_modal");
const modalContainer = document.getElementById("modal_container");
const modalContent = document.querySelector(".modal_content");
const closeModalBtns = document.querySelectorAll(".close_modal");

function showModal() {
    modalContainer.classList.add("show_modal");
    document.body.classList.add("modal_open"); // Prevents scrolling
}

function closeModal() {
    modalContainer.classList.remove("show_modal");
    document.body.classList.remove("modal_open"); // Enables scrolling again
}

// Open modal
openModalBtn.addEventListener("click", showModal);

// Close the modal on the "Close" and "Save" buttons
closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));

// Closes only if clicked outside the modal
modalContainer.addEventListener("click", (event) => {
    if (!modalContent.contains(event.target)) {
        closeModal();
    }
});

// Currency switcher
const currencySwitcher = {
    current: "BRL",
    pendingCurrency: "BRL", // Stores the selected currency before saving
    rates: {}, // It will be filled by the API
    currencyData: {
        BRL: { name: "BRL", symbol: "R$" },
        EUR: { name: "EUR", symbol: "€" },
        USD: { name: "USD", symbol: "$" },
        CAD: { name: "CAD", symbol: "C$" },
        AUD: { name: "AUD", symbol: "A$" },
        RUB: { name: "RUB", symbol: "₽" },
        GBP: { name: "GBP", symbol: "£" },
    },
};

const switcherUI = {
    button: document.getElementById("current-currency"),
    list: document.getElementById("currency-options"),
    label: document.getElementById("currency-label"),
    symbol: document.getElementById("currency-symbol"),
    priceElement: document.querySelector(".price"),
    saveButton: document.querySelector(".modal_btn_link.close_modal"),
};

// Fetch exchange rates from API
const fetchExchangeRates = async () => {
    try {
        const response = await fetch("https://v6.exchangerate-api.com/v6/9c3afb9f6ca7f91013befe50/latest/BRL");
        const data = await response.json();
        currencySwitcher.rates = data.conversion_rates;
    } catch (error) {
        console.error("Erro ao buscar taxas de câmbio:", error);
    }
};

// Display currency options in dropdown
Object.keys(currencySwitcher.currencyData).forEach((code) => {
    const li = document.createElement("li");
    li.innerHTML = `${code} <span>${currencySwitcher.currencyData[code].symbol}</span>`;
    li.addEventListener("click", () => selectPendingCurrency(code));
    switcherUI.list.appendChild(li);
});

// Updates the selected currency (but does not save yet)
const selectPendingCurrency = (newCurrency) => {
    currencySwitcher.pendingCurrency = newCurrency;
    switcherUI.label.textContent = newCurrency;
    switcherUI.symbol.textContent = currencySwitcher.currencyData[newCurrency].symbol;
    switcherUI.list.classList.remove("show");
};

// Applies the conversion only when the user clicks "Save"
const applyConversion = () => {
    currencySwitcher.current = currencySwitcher.pendingCurrency; // Confirm the chosen currency
    localStorage.setItem("selectedCurrency", currencySwitcher.current); // Save the choice

    const basePrice = parseFloat(switcherUI.priceElement.dataset.price);
    const rate = currencySwitcher.rates[currencySwitcher.current] || 1; // If BRL, keep the original value
    const symbol = currencySwitcher.currencyData[currencySwitcher.current].symbol;

    const convertedPrice = (basePrice * rate).toFixed(2);
    switcherUI.priceElement.textContent = `${symbol} ${convertedPrice}`;
};

// Action to open/close the dropdown
switcherUI.button.addEventListener("click", () => {
    switcherUI.list.classList.toggle("show");
});

// The "Save" button applies the conversion and closes the modal.
switcherUI.saveButton.addEventListener("click", () => {
    applyConversion();
    closeModal();
});

document.addEventListener("DOMContentLoaded", async () => {
    const savedCurrency = localStorage.getItem("selectedCurrency") || "BRL";

    // Immediately display saved currency
    currencySwitcher.current = savedCurrency;
    currencySwitcher.pendingCurrency = savedCurrency;
    switcherUI.label.textContent = savedCurrency;
    switcherUI.symbol.textContent = currencySwitcher.currencyData[savedCurrency].symbol;

    // Try using the saved price before the API even responds
    const basePrice = parseFloat(switcherUI.priceElement.dataset.price);
    const symbol = currencySwitcher.currencyData[savedCurrency].symbol;
    switcherUI.priceElement.textContent = `${symbol} ${basePrice.toFixed(2)}`;

    // Search rates and update the price when ready
    await fetchExchangeRates();
    applyConversion();
});

// Language switcher
const languageSwitcher = {
    current: "pt",
    pendingLanguage: "pt",
    languages: {}
};

const languageUI = {
    button: document.getElementById("current-language"),
    list: document.getElementById("language-options"),
    label: document.getElementById("language-label"),
    flag: document.getElementById("language-flag"),
    saveButton: document.getElementById("save-button")
};

// Load translations directly from the JS file
const loadLanguages = () => {
    if (typeof translations === "undefined") {
        console.error("❌ Erro: translations.js não foi carregado corretamente!");
        return;
    }

    languageSwitcher.languages = translations; // Ensures that translations exist
    populateLanguageDropdown();
    initializeLanguage();
};

// Populate the dropdown dynamically
const populateLanguageDropdown = () => {
    if (!languageUI.list) {
        console.error("❌ Erro: Lista de idiomas não encontrada!");
        return;
    }
    languageUI.list.innerHTML = "";
    
    Object.keys(languageSwitcher.languages).forEach((code) => {
        const lang = languageSwitcher.languages[code];
        const li = document.createElement("li");
        li.innerHTML = `<img src="${lang.flag}" alt="Flag"> ${lang.name}`;
        li.addEventListener("click", () => selectPendingLanguage(code));
        languageUI.list.appendChild(li);
    });
};

// Updates the selected language (but does not apply yet)
const selectPendingLanguage = (newLanguage) => {
    languageSwitcher.pendingLanguage = newLanguage;
    const langData = languageSwitcher.languages[newLanguage];
    languageUI.label.textContent = langData.name;
    languageUI.flag.src = langData.flag;
    languageUI.list.classList.remove("show");
};

// Apply language change and save to LocalStorage
const applyLanguageChange = () => {
    languageSwitcher.current = languageSwitcher.pendingLanguage;
    localStorage.setItem("selectedLanguage", languageSwitcher.current);
    updateTexts(languageSwitcher.current);
};

// Automatically updates texts based on JSON
const updateTexts = (lang) => {
    const langData = languageSwitcher.languages[lang].translations;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
};

// Action to open/close the dropdown
languageUI.button.addEventListener("click", () => {
    languageUI.list.classList.toggle("show");
});

// Initialize the language saved in LocalStorage
const initializeLanguage = () => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "pt";
    languageSwitcher.current = savedLanguage;
    languageSwitcher.pendingLanguage = savedLanguage;
    const langData = languageSwitcher.languages[savedLanguage];

    if (langData) {
        languageUI.label.textContent = langData.name;
        languageUI.flag.src = langData.flag;
        updateTexts(savedLanguage);
    }
};

// Load languages ​​at page start
document.addEventListener("DOMContentLoaded", loadLanguages);

// The "Save" button applies the conversion and dates the modal
languageUI.saveButton.addEventListener("click", applyLanguageChange);
