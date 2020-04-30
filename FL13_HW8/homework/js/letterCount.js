function letterCount(item, letter) {
    let count = 0;
    let lowitem = item.toLowerCase();
    let lowletter = letter.toLowerCase();

    for (let i = 0; i < lowitem.length; i++) {
        
        if (lowitem[i] === lowletter) {   
            count += 1;
        }
    }
    return count;
}
console.log(letterCount('Maggy', 'g'));
console.log(letterCount('Barry', 'b'));
console.log(letterCount('', 'z'));