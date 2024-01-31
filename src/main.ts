import Adventurer from "./classes/Adventurer";
import Shop from "./classes/Shop";
import Quest from "./classes/Quest";
import Boss from "./classes/Boss";
import { getPlayerChoice } from "./utils/utils";

let adventurer = new Adventurer(100, 0, 0, 5, 5);
let shop = new Shop();
let quest = new Quest();
let boss = new Boss();

function printMenu() {
  console.log("---");
  console.log("1. Go to the shop");
  console.log("2. Start a quest");
  console.log("3. Fight the boss");
  console.log("---");
}

function displayStatus(adventurer: Adventurer) {
  console.log(`Health: ${adventurer.health}`);
  console.log(`Experience: ${adventurer.experience}`);
  console.log(`Gold: ${adventurer.gold}`);
}

async function gameLoop() {
  while (true) {
    // Display the status
    //displayStatus(adventurer);

    printMenu();
    let choice = await getPlayerChoice();

    switch (choice) {
      case "1":
      case "shop":
        console.log("---");
        shop.displayItems();
        console.log("Type 'quit' to leave the shop.");
        console.log("---");
        console.log("Enter the name of the item you want to buy:");
        let itemName = await getPlayerChoice();
        let buyMessage = shop.buyItem(adventurer, itemName);
        console.log(buyMessage);
        console.log("---");
        break;
      case "2":
      case "quest":
        console.log("---");
        await quest.chooseEnemy(adventurer);
        console.log("---");
        break;
      case "3":
      case "boss":
        console.log("---");
        boss.fightEnemy(adventurer);
        console.log("---");
        break;
      case "stats":
        console.log("---");
        adventurer.displayStats();
        console.log("---");
        break;
      case "inventory":
        console.log("---");
        if (adventurer.inventory.length === 0) {
          console.log("Your inventory is empty.");
        } else {
          adventurer.displayInventory();
        }
        console.log("---");
        break;
      case "equip":
        console.log("---");
        console.log("Enter the name of the item you want to equip:");
        let equipItemName = await getPlayerChoice();
        let itemToEquip = adventurer.getItemFromInventory(equipItemName);
        if (itemToEquip) {
          adventurer.equipItem(itemToEquip, itemToEquip.type);
          console.log(`You equipped a ${itemToEquip.name}!`);
        } else {
          console.log(`You don't have a ${equipItemName} in your inventory.`);
        }
        console.log("---");
        break;
      case "potion":
      case "use":
      case "consume":
        console.log("---");
        console.log("Enter the name of the potion you want to use:");
        let potionName = await getPlayerChoice();
        adventurer.usePotion(potionName);
        console.log("---");
        break;
      case "quit":
        console.log("---");
        console.log("Game over");
        console.log("---");
        process.exit();
      case "help":
        console.log("---");
        console.log("Available commands:");
        console.log("Enter '1' or 'shop' to go to the shop");
        console.log("Enter '2' or 'quest' to start a quest");
        console.log("Enter '3' or 'boss' to fight the boss");
        console.log("Enter 'stats' to check stats");
        console.log("Enter 'inventory' to check inventory");
        console.log("Enter 'equip' to equip an item");
        console.log("Enter 'quit' to quit the game");
        console.log("Enter 'help' to display this help message");
        console.log("---");
        break;
      default:
        console.log("---");
        console.log("Invalid choice. Please enter a valid option.");
        console.log("---");
    }

    if (adventurer.health <= 0) {
      console.log("Game over");
      break;
    }
  }
}

gameLoop();
