'use strict';

import { pets } from '../data/pets.js';

let slider = document.querySelector('.friends_slider');
let modal = document.querySelector('.modal');
let modalButton = document.querySelector('.modal_content_close_button');

function showModal() {
    modal.classList.remove('decrease');
    modal.classList.add('increase');
    document.body.classList.add('hidden');
}

function hideModal() {
    modal.classList.add('decrease');
    modal.classList.remove('increase');
    document.body.classList.remove('hidden');
}

function updateModalContent(name) {
    pets.forEach(pet => {
        if (pet.name == name) {
            modal.querySelector('.modal_image').src = pet.img;
            modal.querySelector('.modal_content_title').textContent = pet.name;
            modal.querySelector('.modal_content_subtitle').textContent = `${pet.type} - ${pet.breed}`;
            modal.querySelector('.modal_content_desc').textContent = pet.description;
            modal.querySelector('.modal_content_list_item_char_age_value').textContent = pet.age;
            modal.querySelector('.modal_content_list_item_char_inoculations_value').textContent = pet.inoculations.join(', ');
            modal.querySelector('.modal_content_list_item_char_diseases_value').textContent = pet.diseases.join(', ');
            modal.querySelector('.modal_content_list_item_char_parasites_value').textContent = pet.parasites.join(', ');
        }
    });
}

slider.addEventListener('click', (event) => {
    let parent = event.target.closest('figure.friends_slider_item');
    let name = parent.querySelector('.friends_slider_item_desc_title').textContent.trim();
    if (parent) {
        updateModalContent(name);
        showModal();
    }
});

slider.addEventListener('click', (event) => {
    if (event.target.classList.contains('friends_slider_item_learn_more_button')) {
        event.preventDefault();
    }
});

modal.addEventListener('mouseover', (event) => {
    if (event.target == modal) {
        modalButton.classList.add('round_button_hover');
    } else {
        modalButton.classList.remove('round_button_hover');
    }
});

modal.addEventListener('click', (event) => {
    if (event.target == modal) {
        hideModal();
        modalButton.classList.remove('round_button_hover');
    }
});

modalButton.addEventListener('click', () => {
    hideModal();
    modalButton.classList.remove('round_button_hover');
});


