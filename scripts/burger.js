'use strict';

let burger = document.querySelector('.burger');
let burgerContent = document.querySelector('.burger_content');
let burgerOpenButton = document.querySelector('.burger_open_button');
let burgerCloseButton = document.querySelector('.burger_close_button');
let burgerLinks = document.querySelectorAll('.burger_content_navigation_item_link');
let burgerAnchorLinks = document.querySelectorAll('.burger_content_navigation_item_link_anchor');
let burgerCurrentPageLinks = document.querySelectorAll('.burger_current_page_link');

function showBurger() {
    burger.classList.remove('slide_out');
    burger.classList.add('slide_in');
    burgerOpenButton.classList.remove('rotate_out');
    burgerOpenButton.classList.add('rotate_in');
    burgerCloseButton.classList.remove('rotate_out');
    burgerCloseButton.classList.add('rotate_in');
    burger.removeAttribute('closed');
    document.body.classList.add('hidden');
};

function closeBurger() {
    burger.classList.remove('slide_in');
    burger.classList.add('slide_out');
    burgerOpenButton.classList.add('rotate_out');
    burgerOpenButton.classList.remove('rotate_in');
    burgerCloseButton.classList.add('rotate_out');
    burgerCloseButton.classList.remove('rotate_in');
    burger.setAttribute('closed', '');
    document.body.classList.remove('hidden');
}

burgerOpenButton.addEventListener('click', () => {
    showBurger();
});

burgerCloseButton.addEventListener('click', () => {
    closeBurger();
});

burger.addEventListener('click', (event) => {
    if (event.target == burger) {
        closeBurger();
    }
});

window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 767px)').matches) {
        burgerOpenButton.classList.add('rotate_out'); //если сделать remove, то анимации не будет
        if (!burger.hasAttribute('closed')) {
            closeBurger();
        }
    }
});

burgerAnchorLinks.forEach(burgerAnchorLink => {
    burgerAnchorLink.addEventListener('click', () => {
        closeBurger();
    })
});

burgerCurrentPageLinks.forEach(burgerCurrentPageLink => {
    burgerCurrentPageLink.addEventListener('click', (event) => {
        event.preventDefault();
        closeBurger();
    })
});