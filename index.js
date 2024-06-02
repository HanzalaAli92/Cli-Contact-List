#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.italic.yellow.bold(`\n
  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗    ██╗     ██╗███████╗████████╗
 ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝    ██║     ██║██╔════╝╚══██╔══╝
 ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║       ██║     ██║███████╗   ██║   
 ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║       ██║     ██║╚════██║   ██║   
 ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║       ███████╗██║███████║   ██║   
  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝       ╚══════╝╚═╝╚══════╝   ╚═╝\n`));
let list = [];
let contactNo = 1;
async function contactList() {
    const userContact = await inquirer.prompt({
        type: "list",
        name: "User",
        message: chalk.italic.cyanBright.bold("\nSelect a option\n"),
        choices: [
            chalk.italic.greenBright.bold("Add Contact"),
            chalk.italic.magentaBright.bold("View Contact"),
            chalk.italic.redBright.bold("Exit")
        ]
    });
    switch (userContact.User) {
        case chalk.italic.greenBright.bold("Add Contact"):
            addContact();
            break;
        case chalk.italic.magentaBright.bold("View Contact"):
            viewContact();
            break;
        case chalk.italic.redBright.bold("Exit"):
            console.log(chalk.italic.yellowBright.bold("\n\tThank you for using the contact book. Have a nice day!\n"));
            break;
    }
}
contactList();
async function addContact() {
    const ansContact = await inquirer.prompt([{
            type: "input",
            name: "AddName",
            message: chalk.italic.yellow.bold("Enter the name:\n"),
            validate: function (AddName) {
                if (AddName.length < AddName) {
                    return chalk.italic.redBright.bold("Please enter a valid name");
                }
                return true;
            }
        }, {
            type: "number",
            name: "AddPhoneNo",
            message: chalk.italic.magenta.bold("Enter the phone number:\n"),
            validate: function (AddPhoneNo) {
                if (isNaN(AddPhoneNo)) {
                    return chalk.italic.redBright.bold("Please enter a number");
                }
                return true;
            }
        }]);
    list.push({ id: contactNo++, name: ansContact.AddName, phoneNo: ansContact.AddPhoneNo });
    console.log(chalk.italic.cyan.bold("Contact added successfully!\n"));
    contactList();
}
function viewContact() {
    if (list.length > 0) {
        list.forEach((user) => console.log(chalk.italic.yellow.bold(`\n${user.id} >>>>> Person Name: ${chalk.italic.green.bold(user.name)} >>>>> Contact Number: ${chalk.italic.cyan.bold(user.phoneNo)}\n`)));
    }
    else {
        console.log(chalk.italic.red.bold("\n\tNo contact added yet!\n"));
    }
    contactList();
}
