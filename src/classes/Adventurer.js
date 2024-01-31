"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Adventurer = /** @class */ (function () {
    function Adventurer(health, experience, gold, attackDamage, armor) {
        this.health = health;
        this.experience = experience;
        this.gold = gold;
        this.attackDamage = attackDamage;
        this.armor = armor;
    }
    return Adventurer;
}());
exports.default = Adventurer;
