'use strict';

class Fighter {
  constructor(obj) {
    this._name = obj.name;
    this._damage = obj.damage;
    this._strength = obj.strength;
    this._agility = obj.agility;
    this._health = obj.hp;
    this._maxHealth = obj.hp;
    this._wins = 0;
    this._losses = 0;
  }
  get getName () {
    return `${this._name}`;
  }
  get getDamage () {
    return this._damage;
  }
  get getStrength () {
    return this._strength;
  }
  get getAgility () {
    return this._agility;
  }
  get getHealth () {
    return this._health;
  }  
  attack (defender){
    let damage = this.getDamage;
    let hundred = 100;
    let isAttack = Math.random() * hundred;
    let strength = defender.getStrength;
    let agility = defender.getAgility;
    let health = defender.getHealth;
    let power = strength + agility;
    if(isAttack < power){
      console.log(`${this.getName} makes ${damage} damages ${defender.getName}`);
      health -= damage;
      defender._health = health;
    }else{
      console.log(`${this.getName} attack missed`)
    }
  }
  logCombatHistory () {
    console.log(`Name: ${this.getName}, Wins: ${this._wins}, Losses: ${this._losses}`);
  }
  heal(value) {
    let newHealth = this.getHealth + value;
    if(newHealth > this._maxHealth) {
      newHealth = this._maxHealth;
    }
    this._health = newHealth;
  }
  dealDamage (value) {
    let newHealth = this.getHealth - value;
    if(newHealth < 0 ) {
      newHealth = 0;
    }
    this._health = newHealth;
  }
  addWin () {
    this._wins += 1;
  }
  addLoss () {
    this._losses += 1;
  }
}
function battle(fighter1, fighter2) {
  if (fighter1.getHealth <= 0) {
    console.log(`${fighter1.getName} is dead and can't fight`);
    return;
  }
  if (fighter2.getHealth <= 0) {
    console.log(`${fighter2.getName} is dead and can't fight`);
    return;
  }
  let attacker = 0;
  while(fighter1.getHealth > 0 && fighter2.getHealth > 0) {
    if(attacker === 0) {
      fighter1.attack(fighter2);
      attacker = 1;
    } 
    if (attacker === 1) {
      fighter2.attack(fighter1);
      attacker = 0;
    }
  }
  if(fighter1.getHealth <= 0) {
    console.log(`${fighter2.getName} has won!`);
    fighter1.addLoss();
    fighter2.addWin();
    return;
  }
  if(fighter2.getHealth <= 0) {
    console.log(`${fighter1.getName} has won!`);
    fighter2.addLoss();
    fighter1.addWin();
    return;
  }
}

const myFighter = new Fighter({name: 'Maximus', damage: 25, hp: 100, strength: 30, agility: 25}); 
const myFighter2 = new Fighter({name: 'Com', damage: 25, hp: 100, strength: 30, agility: 25}); 

battle(myFighter, myFighter2);
battle(myFighter, myFighter2);