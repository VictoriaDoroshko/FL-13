let Vehicle = function (color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    this.model = 'unknown model';
    this.currentSpeed = 0;
    this.state = 'stopped';
    this.allowIncrease = true;
    this.allowDecrease = true;
    this.lastMaxSpeed = 0;
    this.timeStepIncrease = 2000;
    this.timeStepDecrease = 1500;
}

Vehicle.prototype.getInfo = function () {
    let infoObj = {
        engine: this.engine,
        color: this.color,
        maxSpeed: this.maxSpeed,
        model: this.model
    }
    return infoObj;
}

Vehicle.prototype.upgradeEngine = function (newEngine, newMaxSpeed) {
    if(this.currentSpeed > 0){
        return;
    }
    this.engine = newEngine;
    this.maxSpeed = newMaxSpeed;
}

Vehicle.prototype.speedUp = function() {
    if(this.allowIncrease === true){
        this.state = 'driving';
        let timer = setInterval(() => {
            if(!this.allowIncrease){
                clearInterval(timer);
                this.allowIncrease = true;
            }
            this.currentSpeed += 20;
            this.lastMaxSpeed = Math.max(this.currentSpeed, this.lastMaxSpeed);
            console.log(this.currentSpeed);
            if(this.currentSpeed > this.maxSpeed){
                console.log('speed is too high, SLOW DOWN');
            }
        }, this.timeStepIncrease);
    }
}

Vehicle.prototype.drive = function () {
    if(this.state !== 'driving'){
        this.allowDecrease = false;
        this.speedUp();
    }else{
        console.log('Already driving');
    }
}

Vehicle.prototype.speedDown = function() {
    if(this.allowDecrease === true && this.currentSpeed > 0){
        this.state = 'bracking';
        let timer = setInterval(() => {
            if(!this.allowDecrease){
                clearInterval(timer);
                this.allowDecrease = true;
            }else if(this.currentSpeed <= 0){
                clearInterval(timer);
                this.currentSpeed = 0;
                this.state = 'stopped';
                this.allowDecrease = true;
                this.message();
                this.lastMaxSpeed = 0;
            }else{
                this.currentSpeed -= 20;
                console.log(this.currentSpeed);
            }
            
        }, this.timeStepDecrease);
    }
}

Vehicle.prototype.stop = function () {
    if(this.state !== 'bracking' && this.state !== 'stopped'){
        this.allowIncrease = false;
        this.allowDecrease = true;
        this.speedDown();
    }else if(this.state === 'bracking'){
        console.log('Already slows down');
    }else{
        console.log('car stopped');
    }
    
}

Vehicle.prototype.message = function () {
    console.log(`Vehicle is stopped. Maximum speed during the drive ${this.lastMaxSpeed}`);
}

let Car = function(model, color, engine) {
    Vehicle.apply(this, arguments);
    this.model = model;
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 80;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.message = function () {
    console.log(`Car ${this.model} is stopped. Maximum speed during the drive ${this.lastMaxSpeed}`);
}

Car.prototype.changeColor = function (newColor){
    if(this.state === 'stopped'){
        if(this.color !== newColor) {
            this.color = newColor;
        }else{
            console.log(`Car already have ${this.color} color. Choose another color`)
        }
    }else{
        console.log('Please stop car before painting');
    }
    
}

let Motorcycle = function(model, color, engine) {
    Vehicle.apply(this, arguments);
    this.model = model;
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 90;
}

Motorcycle.prototype = Object.create(Vehicle.prototype);
Motorcycle.prototype.constructor = Motorcycle;

Motorcycle.prototype.message = function () {
    console.log(`Motorcycle ${this.model} is stopped.Good drive`);
}

Motorcycle.prototype.speedUp = function() {
    if(this.allowIncrease === true){
        this.state = 'driving';
        let stepOverheating = 10;
        let timer = setInterval(() => {
            if(!this.allowIncrease){
                clearInterval(timer);
                this.allowIncrease = true;
            }else if(this.currentSpeed > this.maxSpeed + stepOverheating){
                console.log('Engine overheating');
                this.stop();
                clearInterval(timer);
                this.allowIncrease = true;
            }else{
                this.currentSpeed += 20;
                this.lastMaxSpeed = Math.max(this.currentSpeed, this.lastMaxSpeed);
                console.log(this.currentSpeed);
            }
            
            if(this.currentSpeed > this.maxSpeed){
                console.log('speed is too high, SLOW DOWN');
            }
            
        }, this.timeStepIncrease);
    }
}