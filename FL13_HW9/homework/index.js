'use strict';

function convert() {
    let arrNumber = [];
    for(let i = 0; i < arguments.length; i++) {
        let item = arguments[i];
        if(typeof item === 'string') {
            item = Number(item);
        } else{
            item = item.toString();
        }
        arrNumber.push(item);
    }
    return arrNumber;
}

function executeforEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }    
}

function mapArray (arr, callback) {
    const NEW_ARR = [];
    executeforEach(arr, function(el) { 
        let item = el;
        if (typeof item === 'string') {
            item = + item;
        }
        const NEW_ITEM = callback(item);
        NEW_ARR.push(NEW_ITEM)
    });
    return NEW_ARR;
}

function filterArray (arr, callback) {
    const NEW_ARR = [];
    executeforEach(arr, function(el) {
        if(callback(el) === true){
            NEW_ARR.push(el);
        }
    });
    return NEW_ARR;
}

function containsValue(arr, check) {
    let result = false;
    executeforEach(arr, function(el) { 
        if(el === check){
            result = true;
        }
    });
    return result;   
}

function flipOver(arr) {
    let newArr = '';
    for(let i = 0; i < arr.length; i++) {
        let item = arr[arr.length - 1 - i];
        newArr +=item;
    }
    return newArr;
}

function makeListFromRange(arr) {
    let newArr = [];
    let start = arr[0];
    let end = arr[1];
    if(end < start) {
        start = arr[1];
        end = arr[0];
    }
    if(start === end) {
        newArr.push(start);
        return newArr;
    } else {
        for(let i = start; i <= end; i++) {
            newArr.push(i);
        } 
        return newArr;
    }
}

function getArrayOfKeys(arr, key) {
    let newArr = [];
    executeforEach(arr, function(obj) {
        newArr.push(obj[key]);
    });
    return newArr;
}

function substitute(arr) {
    let newArr = []
    mapArray(arr, function(el) {
        let item = el;
        const START = 10;
        const END = 20;
        if (item < END && item > START){
            item = '*';
        }
        newArr.push(item)
    });
    return newArr;
}

function getPastDay(date, numDay) {
    date.setDate(date.getDate() - numDay);
    return date.getDate();
}

function formatDate (date) {
    function pad(number) {
        const MAX_NUM = 10;
        if (number < MAX_NUM) {
          return '0' + number;
        }
        return number;
    }
    const DATE_MONTH = pad(date.getMonth() + 1);
    const DATE = pad(date.getDate());
    const DATE_YEAR = date.getFullYear();
    const DATE_HOURS = pad(date.getHours());
    const DATE_MIN = pad(date.getMinutes());
    console.log(`${DATE_YEAR}/${DATE_MONTH}/${DATE} ${DATE_HOURS}:${DATE_MIN}`)
}