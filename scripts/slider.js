'use strict';

import { pets } from '../data/pets.js';
import { getRandomInt, toLowerCaseFirstLetter } from './common.js';

const slider = {
    sliderElement: document.querySelector('.index_friends_slider'),
    sliderItems: document.querySelectorAll('.index_friends_slider_item'),
    sliderButtons: document.querySelectorAll('.index_friends_slider_button'),
    sliderContent: [],
    generateContent(contentLength) {
        while (this.sliderContent.length < contentLength) {
            let random = getRandomInt(0, pets.length);
            if (!this.sliderContent.includes(pets[random].name)) {
                this.sliderContent.push(pets[random].name);
            }
        }
    },
    updateContent() {
        for (let i = 0; i < this.sliderItems.length; i++) {
            this.sliderItems[i].querySelector('.friends_slider_item_desc_title').textContent = this.sliderContent[i];
            this.sliderItems[i].querySelector('.friends_slider_item_image').src = `assets/images/friends_images/friends_${toLowerCaseFirstLetter(this.sliderContent[i])}.png`;
        }
    },
    changeContent() {
        this.generateContent(6);
        this.sliderContent.splice(0, 3);
        this.updateContent();
    },
    removeAnimation() {
        this.sliderElement.classList.remove('fade');
    },
    applyAnimation() {
        this.sliderElement.classList.add('fade');
        setTimeout(() => {
            slider.removeAnimation();
        }, 200);
    },
    initSlider: function () {
        this.generateContent(3);
        this.updateContent();
        this.sliderButtons.forEach(sliderButton => {
            sliderButton.addEventListener('click', () => {
                this.changeContent();
                this.applyAnimation();
            });
        });
    }
};

slider.initSlider();