'use strict';
const num = Number.parseFloat(prompt('Input check number', ''));
const tip = Number.parseFloat(prompt('Input tip percentage', ''));
const hundred = 100;
const tipAmount = Math.round(num * tip) / hundred;
const total = num + tipAmount;

if ( typeof num === 'number' && num >= 0 && typeof tip === 'number' && tip >= 0 && tip < hundred && total >= 0) {
    alert(`
    Check number:  ${num}
    Tip: ${tip} %
    Tip amount: ${tipAmount}
    Total sum to pay: ${total}`);
} else {
    alert('Invalid input data');
}