import Item from "../interfaces/IItem";
import Adventurer from "../classes/Adventurer";

export default class Shop {
  items: Item[];

  constructor() {
    this.items = [
      { name: "wooden stick", type: "weapon", price: 10, attackBoost: 5 },
      { name: "wooden sword", type: "weapon", price: 20, attackBoost: 10 },
      { name: "knife", type: "weapon", price: 30, attackBoost: 15 },
      { name: "baton", type: "weapon", price: 40, attackBoost: 20 },
      { name: "sword", type: "weapon", price: 50, attackBoost: 25 },
      { name: "long sword", type: "weapon", price: 60, attackBoost: 30 },
      { name: "hammer", type: "weapon", price: 70, attackBoost: 35 },
      { name: "enhanced sword", type: "weapon", price: 80, attackBoost: 40 },
      { name: "shoes", type: "armor", price: 10, defenseBoost: 5 },
      { name: "pants", type: "armor", price: 20, defenseBoost: 10 },
      { name: "chest", type: "armor", price: 30, defenseBoost: 15 },
      { name: "helmet", type: "armor", price: 40, defenseBoost: 20 },
      { name: "health potion", type: "potion", price: 15 },
    ];
  }

  displayItems() {
    this.items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - Price: ${item.price}`);
    });
  }

  buyItem(adventurer: Adventurer, input: string): string {
    let itemName = input;
    if (!isNaN(Number(input))) {
      const itemIndex = Number(input) - 1;
      if (itemIndex >= 0 && itemIndex < this.items.length) {
        itemName = this.items[itemIndex].name;
      }
    }
    // Allow the user to quit the selection process
    if (itemName.toLowerCase() === "quit") {
      return "You decided to leave the shop.";
    }

    const item = this.items.find((item) => item.name === itemName);
    if (!item) {
      return "Item not found";
    }

    if (adventurer.gold >= item.price) {
      adventurer.gold -= item.price;

      // Add it to the Adventurer's inventory
      adventurer.inventory.push(item);

      // Remove the item from the shop's items array
      if (item.type !== "healthPotion") {
        const itemIndex = this.items.indexOf(item);
        if (itemIndex > -1) {
          this.items.splice(itemIndex, 1);
        }
      }

      return `You bought a ${item.name}!`;
    } else {
      return "You don't have enough gold to buy this item";
    }
  }
}
