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
    },

    autoplay: {
        delay: '3000',
        disableOnInteraction: false,
    },
});

// Gallery
const btn = document.querySelector('#gallery_btn'),
      popup = document.querySelector('.popup'),
      closeBtn = document.querySelector('.close_btn');

btn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})