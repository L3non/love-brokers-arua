/* == == == Highlights == == == */
let swiperHighlight = new Swiper('.highlights_swiper', {
    loop: true,
    spaceBetween: 15,
    grabCursor: true,
    slidesPerView: 1,
    centeredSlides: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        400: {slidesPerView: 1.5,},
        500: {slidesPerView: 1.8,},
        700: {slidesPerView: 2.5,},
        800: {slidesPerView: 2.8,},
        900: {slidesPerView: 3.5,},
    }
});

/* == == == Team == == == */
let swiperTeam = new Swiper('.cards_swiper', {
    loop: true,
    spaceBetween: 15,
    grabCursor: true,
    slidesPerView: 1.5,
    centeredSlides: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        500: {slidesPerView: 1.8,},
        600: {slidesPerView: 2.5,},
        800: {slidesPerView: 2.8,},
        900: {slidesPerView: 3.5,},
        1000: {slidesPerView: 3.8,},
        1023: {slidesPerView: 1.5,},
        1200: {slidesPerView: 1.8,},
        1500: {slidesPerView: 2.5,},
    }
});

/* == == == Highlights == == == */
let swiperold = new Swiper('.sold_swiper', {
    loop: true,
    spaceBetween: 15,
    grabCursor: true,
    slidesPerView: 1,
    centeredSlides: false,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        400: {slidesPerView: 1.5,},
        500: {slidesPerView: 1.8,},
        700: {slidesPerView: 2.5,},
        800: {slidesPerView: 2.8,},
        900: {slidesPerView: 3.5,},
    }
});