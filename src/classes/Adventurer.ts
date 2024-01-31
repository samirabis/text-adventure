import IItem from "../interfaces/IItem";
import { getPlayerAction } from "../utils/utils";

export default class Adventurer {
  health: number;
  experience: number;
  gold: number;
  attackDamage: number;
  armor: number;
  level: number;
  experienceNeededForNextLevel: number;
  inventory: IItem[];
  maxHealth: number;
  currentWeapon?: IItem;
  currentArmor?: IItem;

  constructor(
    health: number,
    experience: number,
    gold: number,
    attackDamage: number,
    armor: number
  ) {
    this.health = health;
    this.maxHealth = health;
    this.experience = experience;
    this.gold = gold;
    this.attackDamage = attackDamage;
    this.armor = armor;
    this.inventory = [];
    this.level = 1;
    this.experienceNeededForNextLevel =
      this.calculateExperienceNeededForNextLevel();
  }

  calculateExperienceNeededForNextLevel(): number {
    // Increase the required experience exponentially.
    return Math.pow(this.level, 2);
  }

  gainExperience(amount: number): void {
    this.experience += amount;

    while (this.experience >= this.experienceNeededForNextLevel) {
      this.levelUp();
    }
  }

  levelUp(): void {
    this.level++;
    this.experience -= this.experienceNeededForNextLevel;
    this.experienceNeededForNextLevel =
      this.calculateExperienceNeededForNextLevel();

    // Increase base stats
    this.health += 10;
    this.maxHealth += 10;
    this.attackDamage += 5;
    this.armor += 5;

    console.log(`You leveled up! Your new level is ${this.level}.`);
  }

  equipItem(newItem: IItem, type: string) {
    // Equip the new item
    if (type === "weapon") {
      this.currentWeapon = newItem;
    } else if (type === "armor") {
      this.currentArmor = newItem;
    }
  }

  regenerateHealth() {
    this.health = this.maxHealth;
  }

  usePotion(potionName: string): void {
    const potion = this.getItemFromInventory(potionName);
    if (potion && potion.type === "potion") {
      this.removeItemFromInventory(potion);
      this.regenerateHealth();
      console.log(`You used a ${potionName} and your health was restored.`);
    } else {
      console.log(`You don't have ${potionName} in your inventory.`);
    }
  }

  async chooseAction() {
    const action = await getPlayerAction(["attack", "flee"]);
    return action === "attack";
  }

  removeItemFromInventory(item: IItem): void {
    const index = this.inventory.indexOf(item);
    if (index > -1) {
      this.inventory.splice(index, 1);
    }
  }

  displayStats(): void {
    let baseAttackDamage = this.attackDamage;
    let baseArmor = this.armor;
    let attackBoost = 0;
    let armorBoost = 0;

    if (this.currentWeapon && this.currentWeapon.attackBoost !== undefined) {
      attackBoost = this.currentWeapon.attackBoost;
    }

    if (this.currentArmor && this.currentArmor.defenseBoost !== undefined) {
      armorBoost = this.currentArmor.defenseBoost;
    }
    console.log(`Level: ${this.level}`);
    console.log(
      `Experience: ${this.experience}/${this.experienceNeededForNextLevel}`
    );
    console.log(`Health: ${this.health}/${this.maxHealth}`);
    console.log(`Gold: ${this.gold}`);
    console.log(
      `Attack Damage: ${
        baseAttackDamage + attackBoost
      } (${baseAttackDamage}+${attackBoost})`
    );
    console.log(
      `Armor: ${baseArmor + armorBoost} (${baseArmor}+${armorBoost})`
    );
  }

  getItemFromInventory(itemName: string): IItem | null {
    return (
      this.inventory.find((item) => item.name.trim() === itemName.trim()) ||
      null
    );
  }

  displayInventory(): void {
    console.log("Inventory:");
    this.inventory.forEach((item, index) => {
      let boost = "";
      let equipped = "";
      if (item.type === "weapon") {
        boost = ` (+${item.attackBoost} atk)`;
        equipped = item === this.currentWeapon ? " (Equipped)" : "";
      } else if (item.type === "armor") {
        boost = ` (+${item.defenseBoost} def)`;
        equipped = item === this.currentArmor ? " (Equipped)" : "";
      }
      console.log(`${index + 1}. ${item.name}${boost}${equipped}`);
    });
  }
}
