function assign() {
    let target = arguments[0];
    for(let i = 1; i < arguments.length; i++){
        let sourceObject = arguments[i];
        for(let key in sourceObject){
            if(sourceObject[key]){
                target[key] = sourceObject[key];
            }
        }
    }
    return target;
}