import Enemy from '../interfaces/IEnemy';
import Adventurer from '../classes/Adventurer';

export default class Boss {
    enemy?: Enemy;

    constructor() {
        this.enemy = undefined; // Initialize enemy
    }

    fightEnemy(adventurer: Adventurer) {
        // Implement fighting enemy logic here
    }
}