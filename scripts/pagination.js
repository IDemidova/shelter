'use strict';

import { pets } from '../data/pets.js';
import { getRandomInt, toLowerCaseFirstLetter } from './common.js';

const pagination = {
    sliderElement: document.querySelector('.pets_friends_slider'),
    sliderItems: document.querySelectorAll('.pets_friends_slider_item'),
    pageIndicator: document.querySelector('.friends_slider_pagination_page_indicator'),
    prevButton: document.querySelector('.friends_slider_pagination_prev'),
    nextButton: document.querySelector('.friends_slider_pagination_next'),
    startButton: document.querySelector('.friends_slider_pagination_start'),
    endButton: document.querySelector('.friends_slider_pagination_end'),
    paginationButtons: document.querySelectorAll('.friends_slider_pagination_button'), //
    repeatPets: 6,
    randomPets: [],
    currentView: '',
    desktopView: {
        pagesAmount: 6,
        petsAmount: 8,
        pagesContent: {},
        mediaQuery: '(min-width: 1280px)',
        currentPage: 1
    },
    tabletView: {
        pagesAmount: 8,
        petsAmount: 6,
        pagesContent: {},
        mediaQuery: '(min-width: 768px) and (max-width: 1279px)',
        currentPage: 1
    },
    mobileView: {
        pagesAmount: 16,
        petsAmount: 3,
        pagesContent: {},
        mediaQuery: '(min-width: 320px) and (max-width: 767px)',
        currentPage: 1
    },
    generatePets(repeat) {
        //сначала наполняем общий массив каждым из 8 имен по 6 раз подряд
        let initialPets = [...pets];
        for (let i = 0; i < initialPets.length; i++) {
            let result = [];
            while (result.length < repeat) {
                result.push(initialPets[i].name);
            }
            this.randomPets.push(...result);
        }
    },
    generatePages(view) {
        //теперь наполняем случайные страницы для конкретной вьюшки
        let pets = [...this.randomPets];
        let pages = [];
        let content = {};
        //создаем нужное количество страниц
        for (let i = 0; i < view.pagesAmount; i++) {
            pages.push(i + 1);
        }
        let pageCounter = 0;
        while (pages.length > 0) {
            //выбираем случайную страницу и создаем в объекте content свойство с ее номером
            let randomPage = getRandomInt(0, pages.length);
            content[pages[randomPage]] = [];
            //наполняем выбранную страницу значениями из базового массива по принципу "каждое кратное количеству страниц"
            //с учетом порядкового номера заполняемой страницы (от 0 до количества страниц)
            let petCounter = pageCounter;
            while (content[pages[randomPage]].length < view.petsAmount) {
                content[pages[randomPage]].push(pets[petCounter]);
                petCounter += view.pagesAmount;
            }
            //перемешиваем содержимое страницы
            let randomizedPage = [];
            while (randomizedPage.length < view.petsAmount) {
                let randomPet = getRandomInt(0, view.petsAmount);
                if (!randomizedPage.includes(content[pages[randomPage]][randomPet])) {
                    randomizedPage.push(content[pages[randomPage]][randomPet]);
                }
            }
            content[pages[randomPage]].splice(0, content[pages[randomPage]].length);
            content[pages[randomPage]] = [...randomizedPage];
            //вырезаем использованный номер страницы
            pages.splice(randomPage, 1);
            //увеличиваем порядковый номер страницы
            pageCounter++;
        }
        view.pagesContent = { ...content };
    },
    checkMedia() {
        if (window.matchMedia(this.desktopView.mediaQuery).matches) {
            return 'desktop';
        }
        if (window.matchMedia(this.tabletView.mediaQuery).matches) {
            return 'tablet';
        }
        if (window.matchMedia(this.mobileView.mediaQuery).matches) {
            return 'mobile';
        }
    },
    checkObject(object) {
        for (let key in object) {
            return false;
        }
        return true;
    },
    updatePageIndicator(view) {
        this.pageIndicator.textContent = view.currentPage;
    },
    updatePageContent(view) {
        for (let i = 0; i < view.petsAmount; i++) {
            this.sliderItems[i].querySelector('.friends_slider_item_desc_title').textContent = view.pagesContent[view.currentPage][i];
            this.sliderItems[i].querySelector('.friends_slider_item_image').src = `assets/images/friends_images/friends_${toLowerCaseFirstLetter(view.pagesContent[view.currentPage][i])}.png`;
        }
    },
    disableButton(button) {
        button.classList.remove('active_round_button');
        button.classList.add('disabled_round_button');
        button.setAttribute('disabled', '');
    },
    enableButton(button) {
        button.classList.add('active_round_button');
        button.classList.remove('disabled_round_button');
        button.removeAttribute('disabled', '');
    },
    updateButtonState(view) {
        if (view.currentPage == 1) {
            this.disableButton(this.prevButton);
            this.disableButton(this.startButton);
            this.enableButton(this.nextButton);
            this.enableButton(this.endButton);
        }
        if (view.currentPage > 1 && view.currentPage < view.pagesAmount) {
            this.enableButton(this.prevButton);
            this.enableButton(this.nextButton);
            this.enableButton(this.startButton);
            this.enableButton(this.endButton);
        }
        if (view.currentPage == view.pagesAmount) {
            this.disableButton(this.nextButton);
            this.disableButton(this.endButton);
            this.enableButton(this.prevButton);
            this.enableButton(this.startButton);
        }
    },
    updatePage(view) {
        this.updatePageIndicator(view);
        this.updateButtonState(view);
        this.updatePageContent(view);
    },
    applyView() {
        if (this.checkMedia() == 'desktop') {
            this.currentView = 'desktop';
            if (this.checkObject(this.desktopView.pagesContent)) {
                this.generatePages(this.desktopView);
            }
            this.updatePage(this.desktopView);
        }
        if (this.checkMedia() == 'tablet') {
            this.currentView = 'tablet';
            if (this.checkObject(this.tabletView.pagesContent)) {
                this.generatePages(this.tabletView);
            }
            this.updatePage(this.tabletView);
        }
        if (this.checkMedia() == 'mobile') {
            this.currentView = 'mobile';
            if (this.checkObject(this.mobileView.pagesContent)) {
                this.generatePages(this.mobileView);
            }
            this.updatePage(this.mobileView);
        }
    },
    prevButtonClickHandler() {
        if (this.checkMedia() == 'desktop') {
            if (this.desktopView.currentPage > 1) {
                this.desktopView.currentPage--;
                this.updatePage(this.desktopView);
            }
        }
        if (this.checkMedia() == 'tablet') {
            if (this.tabletView.currentPage > 1) {
                this.tabletView.currentPage--;
                this.updatePage(this.tabletView);
            }
        }
        if (this.checkMedia() == 'mobile') {
            if (this.mobileView.currentPage > 1) {
                this.mobileView.currentPage--;
                this.updatePage(this.mobileView);
            }
        }
    },
    nextButtonClickHandler() {
        if (this.checkMedia() == 'desktop') {
            if (this.desktopView.currentPage < this.desktopView.pagesAmount) {
                this.desktopView.currentPage++;
                this.updatePage(this.desktopView);
            }
        }
        if (this.checkMedia() == 'tablet') {
            if (this.tabletView.currentPage < this.tabletView.pagesAmount) {
                this.tabletView.currentPage++;
                this.updatePage(this.tabletView);
            }
        }
        if (this.checkMedia() == 'mobile') {
            if (this.mobileView.currentPage < this.mobileView.pagesAmount) {
                this.mobileView.currentPage++;
                this.updatePage(this.mobileView);
            }
        }
    },
    startButtonClickHandler() {
        if (this.checkMedia() == 'desktop') {
            if (this.desktopView.currentPage != 1) {
                this.desktopView.currentPage = 1;
                this.updatePage(this.desktopView);
            }
        }
        if (this.checkMedia() == 'tablet') {
            if (this.tabletView.currentPage != 1) {
                this.tabletView.currentPage = 1;
                this.updatePage(this.tabletView);
            }
        }
        if (this.checkMedia() == 'mobile') {
            if (this.mobileView.currentPage != 1) {
                this.mobileView.currentPage = 1;
                this.updatePage(this.mobileView);
            }
        }
    },
    endButtonClickHandler() {
        if (this.checkMedia() == 'desktop') {
            if (this.desktopView.currentPage != this.desktopView.pagesAmount) {
                this.desktopView.currentPage = this.desktopView.pagesAmount;
                this.updatePage(this.desktopView);
            }
        }
        if (this.checkMedia() == 'tablet') {
            if (this.tabletView.currentPage != this.tabletView.pagesAmount) {
                this.tabletView.currentPage = this.tabletView.pagesAmount;
                this.updatePage(this.tabletView);
            }
        }
        if (this.checkMedia() == 'mobile') {
            if (this.mobileView.currentPage != this.mobileView.pagesAmount) {
                this.mobileView.currentPage = this.mobileView.pagesAmount;
                this.updatePage(this.mobileView);
            }
        }
    },
    removeAnimation() {
        this.sliderElement.classList.remove('fade');
    },
    applyAnimation() {
        this.sliderElement.classList.add('fade');
        setTimeout(() => {
            pagination.removeAnimation();
        }, 200);
    },
    init() {
        this.generatePets(this.repeatPets);
        this.applyView();
        //если убрать window.onresize, состояния вьюшек будут обновляться только при обновлении страницы
        window.addEventListener('resize', () => {
            pagination.applyView();
        });
        this.prevButton.addEventListener('click', () => {
            this.prevButtonClickHandler();
        });
        this.nextButton.addEventListener('click', () => {
            this.nextButtonClickHandler();
        });
        this.startButton.addEventListener('click', () => {
            this.startButtonClickHandler();
        });
        this.endButton.addEventListener('click', () => {
            this.endButtonClickHandler();
        });
        this.paginationButtons.forEach(paginationButton => {
            paginationButton.addEventListener('click', () => {
                this.applyAnimation();
            });
        });
    }
};

pagination.init();
