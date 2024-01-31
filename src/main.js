"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Adventurer_1 = require("./classes/Adventurer");
var Shop_1 = require("./classes/Shop");
var Quest_1 = require("./classes/Quest");
var Boss_1 = require("./classes/Boss");
var readline = require('readline');
var adventurer = new Adventurer_1.default(100, 0, 100, 10, 10);
var shop = new Shop_1.default();
var quest = new Quest_1.default();
var boss = new Boss_1.default();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function displayMainMenu() {
    console.log("1. Go to the shop");
    console.log("2. Start a quest");
    console.log("3. Fight the boss");
    var choice = prompt("Enter your choice: ");
    if (choice === null) {
        throw new Error("Invalid Input");
    }
    return choice;
}
function getPlayerChoice() {
    return new Promise(function (resolve, reject) {
        rl.question("Enter your choice: ", function (answer) {
            resolve(answer);
        });
    });
}
while (true) {
    displayMainMenu();
    var choice = getPlayerChoice().then(function (choice) {
        switch (choice) {
            case 'shop':
                shop.buyItem(adventurer);
                break;
            case 'quest':
                quest.fightEnemy(adventurer);
                break;
            case 'boss':
                boss.fightEnemy(adventurer);
                break;
        }
    });
    if (adventurer.health <= 0) {
        console.log('Game over');
        break;
    }
}
