const productCardSwiper = () => {

    try {
        const cards = document.querySelectorAll(".cataloge__product");

        cards.forEach((card) => {
            new Swiper(card.querySelector(".cataloge__productSwiper"), {

                effect: 'fade',

                pagination: {
                    el: '.cataloge__productSwiper-pagination',
                    clickable: true,
                },

            });
        });
    } catch (error) {

    }

};

const showNavCataloge = () => {

    try {
        const cataloge = document.querySelector('.nav-cataloge');

        document.addEventListener('click', (e) => {
            const target = e.target;
            const withinBoundaries = e.composedPath().includes(cataloge);

            if (target.closest('.header__catalogeButton')) {
                cataloge.classList.toggle('visible');
            } else if (!withinBoundaries) {
                cataloge.classList.remove('visible');
            }
        });
    } catch (error) {

    }

};

const showLocationModal = () => {

    try {
        const cityValue = document.querySelector('.top-panel__location-trigger-text')
        const modal = document.querySelector('.locationModal');
        const overlay = document.querySelector('.locationModal__overlay');
        const modalInner = document.querySelector('.locationModal__inner');


        document.addEventListener('click', (e) => {

            const target = e.target;
            const withinBoundaries = e.composedPath().includes(modalInner);

            const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;



            if (target.closest('.top-panel__location-trigger-text')) {

                modal.classList.add('visible');
                document.body.classList.add('fixed');
                document.body.style.paddingRight = paddingOffset;
                overlay.style.paddingRight = paddingOffset;

            } else if (!withinBoundaries) {

                modal.classList.remove('visible');
                document.body.classList.remove('fixed');
                document.body.style.paddingRight = 0;
                overlay.style.paddingRight = 0;


            } else if (target.closest('.locationModal__closeButton')) {

                modal.classList.remove('visible');
                document.body.classList.remove('fixed');
                document.body.style.paddingRight = 0;
                overlay.style.paddingRight = 0;

            } else if (target.closest('.locationModal__listItem')) {

                cityValue.textContent = target.textContent;
                modal.classList.remove('visible');
                document.body.classList.remove('fixed');
                document.body.style.paddingRight = 0;
                overlay.style.paddingRight = 0;

            }
        });
    } catch (error) {

    }

};

const initOfferSwiper = () => {

    try {
        const swiper = new Swiper('.offerSwiper', {



            navigation: {
                nextEl: '.offerSwiper__nextButton',
                prevEl: '.offerSwiper__prevButton',
            },

            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },

                768: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },

                1024: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },

                1440: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }

        });
    } catch (error) {

    }

};

const initProductSliders = () => {

    try {
        const thumbSwiper = new Swiper('.product__thumbSwiper', {
            slidesPerView: 3,
            spaceBetween: 16,
        })

        const mainSwiper = new Swiper('.product__mainSwiper', {
            spaceBetween: 16,
            thumbs: {
                swiper: thumbSwiper
            }
        })
    } catch (error) {

    }

};



const contactsMap = () => {

    try {
        let center = [52.02710857207237, 113.48362199999994];
        let center1 = [52.01744857204756, 113.50749899999997];

        const addressesContainer = document.querySelector('.contacts__blocks');

        const init = () => {
            let map = new ymaps.Map('contats__map', {
                center: center,
                zoom: 18
            });

            let placemark = new ymaps.Placemark(center, {

                balloonContent: `
    
                    <div class="balloon">
                        <div class="balloon__address">
                            <div class="balloon__address-text">
                                г.Чита , ул. Лазо 112б. склад № 28
                            </div>
                        </div>
                        <div class="balloon__image"> 
                            <img src="./images/map/balloon-1.png" alt="shop">
                        </div>
                    </div>
                
                `

            }, {
                iconLayout: 'default#image',
                iconImageHref: './images/icons/location-pointer.svg',
                iconImageSize: [60, 60],
                iconImageOffset: [-40, -100]
            });

            let placemark1 = new ymaps.Placemark(center1, {

                balloonContent: `
    
                    <div class="balloon">
                        <div class="balloon__address">
                            <div class="balloon__address-text">
                                1-я Шубзаводская 47а (база геологов), 2 этаж, офис9
                            </div>
                        </div>
                        <div class="balloon__image"> 
                            <img src="./images/map/balloon-1.png" alt="shop">
                        </div>
                    </div>
                
                `

            }, {
                iconLayout: 'default#image',
                iconImageHref: './images/icons/location-pointer.svg',
                iconImageSize: [60, 60],
                iconImageOffset: [-40, -100]
            });


            map.events.add('balloonopen', function (e) {

                let balloon = e.get('balloon');

                map.events.add('click', function (e) {
                    if (e.get('target') === map) { // Если клик был на карте, а не на геообъекте
                        map.balloon.close();
                    }
                });

            });

            addressesContainer.addEventListener('click', (e) => {
                const target = e.target;

                if (target.closest('.-js-firstBalloon')) {
                    map.balloon.open(center1, `
    
                    <div class="balloon">
                        <div class="balloon__address">
                            <div class="balloon__address-text">
                                1-я Шубзаводская 47а (база геологов), 2 этаж, офис9
                            </div>
                        </div>
                        <div class="balloon__image"> 
                            <img src="./images/map/balloon-1.png" alt="shop">
                        </div>
                    </div>
                
                `);
                } else if (target.closest('.-js-secondBalloon')) {
                    map.balloon.open(center, `
    
                    <div class="balloon">
                        <div class="balloon__address">
                            <div class="balloon__address-text">
                                г.Чита , ул. Лазо 112б. склад № 28
                            </div>
                        </div>
                        <div class="balloon__image"> 
                            <img src="./images/map/balloon-1.png" alt="shop">
                        </div>
                    </div>
                
                `);
                }

            });

            map.controls.remove('geolocationControl'); // удаляем геолокацию
            map.controls.remove('searchControl'); // удаляем поиск
            map.controls.remove('trafficControl'); // удаляем контроль трафика
            map.controls.remove('typeSelector'); // удаляем тип
            map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
            map.controls.remove('rulerControl'); // удаляем контрол правил
            map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

            map.geoObjects.add(placemark);
            map.geoObjects.add(placemark1);
        }

        ymaps.ready(init);
    } catch (error) { }
};

const initAboutCompanySlider = () => {

    try {
        const swiper = new Swiper('.aboutCompany-swiper', {

            navigation: {
                nextEl: '.aboutCompany-swiper__button-next',
                prevEl: '.aboutCompany-swiper__button-prev',
            },

            spaceBetween: 20,

            pagination: {
                el: '.aboutCompany-swiper__pagination',
            },

        });
    } catch (error) {

    }

};


const showSearchResult = () => {

    try {
        const results = document.querySelector('.search-concurrence');

        document.addEventListener('click', (e) => {
            const target = e.target;
            const withinBoundaries = e.composedPath().includes(results);

            if (target.closest('.-h-search-form__input')) {
                results.classList.add('visible');
            } else if (!withinBoundaries) {
                results.classList.remove('visible');
            }
        });
    } catch (error) {

    }

};

const attachHeader = () => {

    try {

        if (window.innerWidth >= 1150) {
            const headerBottom = document.querySelector('.header__bottom');
            const headerBottomHeight = headerBottom.clientHeight;

            window.addEventListener('scroll', (e) => {
                let scrollY = window.scrollY;

                if (scrollY > headerBottomHeight + 300) {
                    headerBottom.classList.add('fixed');
                    document.body.style.paddingTop = headerBottomHeight + 'px';
                } else {
                    headerBottom.classList.remove('fixed');
                    document.body.style.paddingTop = 0;
                }
            });
        } else {
            const headerMain = document.querySelector('.header');
            const headerMainHeight = headerMain.clientHeight;

            window.addEventListener('scroll', (e) => {
                let scrollY = window.scrollY;

                if (scrollY > headerMainHeight + 300) {
                    headerMain.classList.add('fixed');
                    document.body.style.paddingTop = headerMainHeight + 'px';
                } else {
                    headerMain.classList.remove('fixed');
                    document.body.style.paddingTop = 0;
                }
            });
        }

    } catch (error) {    }

};

const showBurgerMenu = () => {
    try {
        const menu = document.querySelector('.burgerMenu');
        const overlay = document.querySelector('.burgerMenu__overlay');
        const modalInner = document.querySelector('.burgerMenu__inner');


        document.addEventListener('click', (e) => {

            const target = e.target;
            const withinBoundaries = e.composedPath().includes(modalInner);

            const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

            if (target.closest('.burger-button')) {
                menu.classList.add('visible');
                document.body.classList.add('fixed');
                document.body.style.paddingRight = paddingOffset;
                overlay.style.paddingRight = paddingOffset;

            } else if (!withinBoundaries) {

                menu.classList.remove('visible');
                document.body.classList.remove('fixed');
                document.body.style.paddingRight = 0;
                overlay.style.paddingRight = 0;


            } else if (target.closest('.burgerMenu__closeButton')) {

                menu.classList.remove('visible');
                document.body.classList.remove('fixed');
                document.body.style.paddingRight = 0;
                overlay.style.paddingRight = 0;

            }
        });
    } catch (error) {

    }
};


attachHeader();
showSearchResult();
initAboutCompanySlider();
contactsMap();

initProductSliders();
initOfferSwiper();

productCardSwiper();
showNavCataloge();
showLocationModal();
showBurgerMenu();