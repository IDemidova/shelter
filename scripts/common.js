'use strict';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //максимум не включается, минимум включается
}

function toLowerCaseFirstLetter(str) {
    str = str.split('');
    str[0] = str[0].toLowerCase();
    str = str.join('');
    return str;
}

export { getRandomInt, toLowerCaseFirstLetter };