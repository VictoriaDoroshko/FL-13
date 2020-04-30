function countPoints(matches) {
    let count = 0;
    for (let i = 0; i < matches.length; i++) {
        let item = matches[i];
        let x = +item[0];
        let y = +item[2];
        if (x > y) {
            count +=3;
        }
        if(x === y){
            count += 1;
        }

    }
    return count;
}
countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']);