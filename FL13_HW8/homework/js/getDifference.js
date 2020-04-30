function getDifference(firstNum, secondNum) {
    let difference = firstNum - secondNum;
    if(difference < 0) {
        difference *= -1;
    }
    return difference;
}

console.log(getDifference(5, 7));