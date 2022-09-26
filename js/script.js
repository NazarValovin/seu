
"use strict";


document.addEventListener('DOMContentLoaded', () => {

    // Swiper

    function swiperSlider() {
        const indexOffer = document.querySelector('.index-offer__slider');
        const indexRaves = document.querySelector('.index-raves__slider');

        const swiper = new Swiper(indexOffer, {
            // Default parameters
            slidesPerView: 1,
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
        const swiperRaves = new Swiper(indexRaves, {
            // Default parameters
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                },
                404: {
                    slidesPerView: 2,
                },
                568: {
                    slidesPerView: 3,
                    centeredSlides: true,
                },
            }
        });
    }
    swiperSlider();

    //================================================================


    //Burger

    function showMenuSecond() {
        const menuSecond = document.querySelector('.header__nav-second-list');
        const menuSecondParent = document.querySelectorAll('.header__nav-arrow');
        if (menuSecond) {
            for (let index = 0; index < menuSecondParent.length; index++) {
                const element = menuSecondParent[index];
                element.addEventListener('click', (e) => {
                    if (document.documentElement.clientWidth <= 992) {
                        e.preventDefault();
                        menuSecond.classList.toggle('_active');
                        element.classList.toggle('_active');
                    }
                });
            }
        }
    }
    showMenuSecond();

    function burgerClick() {
        const burger = document.querySelector('.header__burger');
        const menu = document.querySelector('.header__nav');
        const info = document.querySelector('.header__info');
        const body = document.body;

        const menuMobile = document.createElement('div');
        menuMobile.classList.add('menu-mobile');

        if (burger) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('_active');
                body.classList.toggle('_active');
                menuMobile.classList.toggle('_active');
            });

            if (document.documentElement.clientWidth <= 992) {
                burger.insertAdjacentElement('afterend', menuMobile);
                menuMobile.insertAdjacentElement('beforeend', menu);
            }
            if (document.documentElement.clientWidth <= 530) {
                menuMobile.insertAdjacentElement('beforeend', info);
            }
        }
    }
    burgerClick();

    //==============================================================


    // Header Location

    function headerLocation() {
        const locationBtn = document.querySelector('.header__location-btn');
        const locationModal = document.querySelector('.modal-location-header');
        const locationModalClose = document.querySelector('.modal-location-header__close');
        const locationItems = document.querySelectorAll('.modal-location-header__item');
        const burger = document.querySelector('.header__burger');
        const body = document.body;

        if (locationBtn) {
            locationBtn.textContent = locationItems[0].textContent;

            locationBtn.addEventListener('click', () => {
                locationModal.classList.add('_active');
                body.classList.add('_active');
            });
            for (let index = 0; index < locationItems.length; index++) {
                const locationItem = locationItems[index];
                locationItem.addEventListener('click', () => {
                    locationBtn.textContent = locationItem.textContent;
                    locationModal.classList.remove('_active');
                    body.classList.remove('_active');

                    if (burger) {
                        if (!burger.classList.contains('_active')) {
                            body.classList.remove('_active');
                        }
                    } else {
                        body.classList.remove('_active');
                    }
                });
            }
            locationModalClose.addEventListener('click', () => {
                locationModal.classList.remove('_active');

                if (burger) {
                    if (!burger.classList.contains('_active')) {
                        body.classList.remove('_active');
                    }
                } else {
                    body.classList.remove('_active');
                }
            });
        }
    }

    headerLocation();

    //===================================================================


    // Footer click top

    function clickBtnFooterTop() {
        const btnTop = document.querySelector('.footer__bottom-top');
        const documentEl = document.documentElement;
        const offsetPosition = documentEl.offsetTop;

        if (btnTop) {
            btnTop.addEventListener('click', () => {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            });
        }
    }
    clickBtnFooterTop();

    //===============================================================================


    // Click Form Change Club

    function clickChangeClub() {
        const clubBtn = document.querySelector('.form__form-club-change span');
        const clubBody = document.querySelector('.form__form-club-body');
        const clubItem = document.querySelectorAll('.form__form-club-item');
        const clubInput = document.querySelector('.form__form-club input');

        if (clubBtn) {
            clubBtn.addEventListener('click', () => {
                clubBody.classList.toggle('_active');
            });
            for (let index = 0; index < clubItem.length; index++) {
                const element = clubItem[index];
                element.addEventListener('click', () => {
                    clubBody.classList.remove('_active');
                    element.classList.add('_active');
                    clubInput.value = element.textContent;
                });
            }
        }
    }
    clickChangeClub();

    //=================================================================================


    // Form Validate

    function sendMailCatalog() {
        const form = document.querySelector('form');
        const btn = document.querySelector('form button');
        const inputs = document.querySelectorAll('form input');
        const btns = document.querySelector('.form__form-btn');
        const success = document.querySelector('.form__form-success');
        let err = 0;

        if (form) {
            for (let index = 0; index < inputs.length; index++) {
                const input = inputs[index];

                if (input.value === '') {
                    err = err + 1;
                }

                input.addEventListener('change', () => {
                    if (input.value != '') {
                        err = err - 1;

                        if (err <= 0) {
                            err = 0;
                        }
                    } else {
                        err = err + 1;
                    }
                    if (err <= 0) {
                        btn.classList.add('_active');
                    } else {
                        btn.classList.remove('_active');
                    }
                });
            }
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                if (btn.classList.contains('_active')) {
                    formSend();
                }
            });
            async function formSend() {

                let formData = new FormData(form);

                let response = await fetch('mail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    form.reset();
                    btns.remove();
                    success.classList.add('_active');
                } else {
                    alert("Ошибка");
                }
            }
        }
    }
    sendMailCatalog();

    //===================================================================================


    // Faq Items

    function faqClickItems() {
        const items = document.querySelectorAll('.faq-question__header');
        const itemsBody = document.querySelectorAll('.faq-question__body');

        if (items.length > 0) {
            for (let index = 0; index < items.length; index++) {
                const item = items[index];

                const textHeight = itemsBody[index].clientHeight;
                itemsBody[index].style.height = '0px';

                item.addEventListener('click', () => {
                    if (item.classList.contains('_active')) {
                        item.classList.remove('_active');
                        itemsBody[index].classList.remove('_active');
                        itemsBody[index].style.height = '0px';
                    } else {
                        item.classList.add('_active');
                        itemsBody[index].classList.add('_active');
                        itemsBody[index].style.height = `${textHeight}px`;
                    }
                });
            }
        }
    }
    faqClickItems();

    //==========================================================================================














});