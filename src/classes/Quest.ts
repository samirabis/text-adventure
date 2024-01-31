import Enemy from "../interfaces/IEnemy";
import Adventurer from "../classes/Adventurer";
import { getPlayerChoice, getPlayerAction } from "../utils/utils";

export default class Quest {
  enemies: Enemy[];

  constructor() {
    const slime: Enemy = {
      name: "Slime",
      health: 10,
      attack: 5,
      defense: 3,
      goldReward: 5,
      experienceReward: 1,
    };

    const spider: Enemy = {
      name: "Spider",
      health: 15,
      attack: 10,
      defense: 5,
      goldReward: 8,
      experienceReward: 2,
    };

    const goblin: Enemy = {
      name: "Goblin",
      health: 50,
      attack: 30,
      defense: 20,
      goldReward: 10,
      experienceReward: 4,
    };

    const orc: Enemy = {
      name: "Orc",
      health: 80,
      attack: 45,
      defense: 60,
      goldReward: 15,
      experienceReward: 7,
    };

    this.enemies = [slime, spider, goblin, orc];
  }

  async chooseEnemy(adventurer: Adventurer) {
    let validChoice = false;

    while (!validChoice) {
      console.log("Choose an enemy to fight: ");
      for (let i = 0; i < this.enemies.length; i++) {
        console.log(`${i + 1}. ${this.enemies[i].name}`);
      }

      const choice = await getPlayerChoice();

      // Check if the choice is a number
      if (!isNaN(Number(choice))) {
        const choiceNumber = Number(choice);
        if (choiceNumber > 0 && choiceNumber <= this.enemies.length) {
          validChoice = await this.fightEnemy(
            adventurer,
            this.enemies[choiceNumber - 1]
          );
        }
      }
      // Check if the choice is a name
      else {
        const enemyIndex = this.enemies.findIndex(
          (enemy) => enemy.name.toLowerCase() === choice.toLowerCase()
        );
        if (enemyIndex !== -1) {
          validChoice = await this.fightEnemy(
            adventurer,
            this.enemies[enemyIndex]
          );
        }
      }

      if (!validChoice) {
        console.log("Invalid choice. Please enter a valid option.");
      }
    }
  }

  async fightEnemy(adventurer: Adventurer, enemy: Enemy) {
    let enemyCopy = { ...enemy };

    while (adventurer.health > 0 && enemy.health > 0) {
      // Ask the player what action they want to take
      console.log("Do you want to attack or flee?");
      const action = await getPlayerChoice();

      if (action.toLowerCase() === "attack") {
        // Calculate total damage and defense
        let totalDamage = adventurer.attackDamage;
        let totalDefense = adventurer.armor;
        if (
          adventurer.currentWeapon &&
          adventurer.currentWeapon.attackBoost !== undefined
        ) {
          totalDamage += adventurer.currentWeapon.attackBoost;
        }
        if (
          adventurer.currentArmor &&
          adventurer.currentArmor.defenseBoost !== undefined
        ) {
          totalDefense += adventurer.currentArmor.defenseBoost;
        }

        // The adventurer attacks first
        let damageDealt = totalDamage;
        enemy.health -= damageDealt;
        console.log(
          `The Adventurer dealt ${damageDealt} damage to the ${enemy.name}.`
        );

        // If the enemy is still alive, it attacks back
        if (enemy.health > 0) {
          let damageReceived = enemy.attack - totalDefense;
          if (damageReceived < 0) damageReceived = 0; // Prevent negative damage
          adventurer.health -= damageReceived;
          console.log(
            `The ${enemy.name} dealt ${damageReceived} damage to the adventurer.`
          );
        }

        // Gain experience
        adventurer.gainExperience(enemy.experienceReward);
      } else if (action.toLowerCase() === "flee") {
        console.log("You fled from the battle!");
        break;
      } else {
        console.log("Invalid action. Please enter 'attack' or 'flee'.");
      }

      // Break the loop if the user's health is less than or equal to 0
      if (adventurer.health <= 0) {
        break;
      }
    }

    // Reset the enemy's health if it was defeated
    if (enemy.health <= 0) {
      enemy.health = enemyCopy.health;
    }

    //If the enemy is defeated, the adventurer gains rewards
    if (adventurer.health > 0 && enemy.health <= 0) {
      adventurer.gold += enemy.goldReward;
      adventurer.experience += enemy.experienceReward;
      console.log(
        `You gained ${enemy.goldReward} gold and ${enemy.experienceReward} experience!`
      );
    }
    
    // Ensure the method always returns a boolean
    return adventurer.health > 0;
  }
}
