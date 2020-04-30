
function positiveSum(items) {
    let sum = 0;

    for (let i = 0; i < items.length; i++) {
        if (items[i] > 0) {
            sum += items[i];
        }
    }
    return sum;
}

positiveSum([2, -2, 3, 8, -5]);