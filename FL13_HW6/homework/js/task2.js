'use strict';
const word = prompt('Please, enter the word', '');

if (typeof word === 'string') {
    const wordTrim = word.trim();
    const wordLength = word.length;
    const mod = 2;
    const k = Math.floor(wordLength / mod);
    let num;
    if (wordTrim.length === 0) {
        alert('Invalid value');
    } else if (wordLength % mod === 0) {
        num = k;
        alert(word.substring(num - 1, num + 1));
    } else {
        num = k;
        alert(word.slice(num, length - num));
    } 
} else {
        alert('Invalid value');
    }