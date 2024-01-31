const readline = require("readline");

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function getPlayerChoice(): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.question("Enter your choice: ", (answer: string) => {
      resolve(answer);
    });
  });
}

export async function getPlayerAction(choices: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    rl.question("Enter your choice: ", (answer: string) => {
      if (choices.includes(answer)) {
        resolve(answer);
      } else {
        console.log("Invalid choice. Please enter a valid option.");
        getPlayerAction(choices).then(resolve);
      }
    });
  });
}
