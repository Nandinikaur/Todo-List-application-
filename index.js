#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
//MAIN FUNCTION:
let main = async () => {
    while (condition) {
        let ans = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "choose an option:",
            choices: ["Add Todo", "View Todos", "Update", "Delete Todo", "Exit"],
        });
        if (ans.option === "Add Todo") {
            await addTodo();
        }
        else if (ans.option === "View Todos") {
            await viewList();
        }
        else if (ans.option === "Update") {
            await updateTodo();
        }
        else if (ans.option === "Delete Todo") {
            await deleteTask();
        }
        else if (ans.option === "Exit") {
            condition = false;
            console.log("EXIT TODOS!!!");
        }
    }
};
//Created a function "ADD":
let addTodo = async () => {
    let newTask = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "What would you want to add in your todo:",
        validate: function (input) {
            if (input.trim() == "") {
                return "please add an non-empty task";
            }
            return true;
        }
    });
    todos.push(newTask.task);
    console.log(`\n${newTask.task} new task added successfully\n`);
};
//Created a function "VIEW":
let viewList = () => {
    console.log("\n **** View Todo List **** \n");
    todos.forEach((task, index) => {
        console.log(`${index + 1}: ${task}`);
    });
    console.log("\n");
};
//Created a function "UPDATE":
let updateTodo = async () => {
    await viewList();
    let updateTaskIndex = await inquirer.prompt([{
            type: "number",
            name: "numIndex",
            message: "please enter the index.no to update list",
        },
        {
            type: "input",
            name: "newTask",
            message: "now add your new task",
        }]);
    todos[updateTaskIndex.numIndex - 1] = updateTaskIndex.newTask;
    console.log(`\n${updateTaskIndex.numIndex - 1} updated successfully!!!`);
};
//Created a function "DELETE";
let deleteTask = async () => {
    await viewList();
    let taskIndex = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "please enter your index no, you want to delete:"
    });
    let deleteTask = todos.splice(taskIndex.index - 1, 1);
    console.log(`\n${deleteTask}  deleted successfully!!!\n`);
};
main();
