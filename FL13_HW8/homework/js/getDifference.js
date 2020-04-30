function getDifference(firstNum, secondNum) {
    let difference = firstNum - secondNum;
    if(difference < 0) {
        difference *= -1;
    }
    return difference;
}
getDifference(5, 7);