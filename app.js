const { describe, command, demandOption } = require("yargs");
const yargs = require("yargs");
const db_utils = require("./database_interface");

// add new record to database
yargs.command({
    command: "add",
    describe: "add new record to the database",
    builder: {
        title: {
            describe: "title of the game",
            demandOption: true,
            type: "string"
        },
        dev: {
            describe: "developer of the game",
            demandOption: true,
            type: "string"
        },
        platforms: {
            describe: "platforms that the game got released for",
            demandOption: true,
            type: "array"
        },
        date: {
            describe: "release date of the game YYYY-MM-DD",
            demandOption: true,
            type: "string"
        }  
    },handler(argv) {
      db_utils.add(argv.title, argv.dev, argv.date, argv.platforms);
      // console.log(`${argv.title}, ${argv.dev}, ${argv.platforms}, ${argv.date}`);

    }
}); // end of command

yargs.command({
    command: "viewAll",
    describe: "show all of the data in the database",
    handler(){
        db_utils.viewAll();
    }
});

// seach command by developer
yargs.command({
    command: "search",
    describe: "return data based on search criteria",
    builder: {
        dev : {
            describe: "search database by dev name",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        db_utils.search(argv.dev);
    }

})

// delete command by game name
yargs.command({
    command: "del",
    describe: "deletes data based on the game name",
    builder: {
        title: {
            describe: "insert a title for the game that you want to be deleted",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        db_utils.del(argv.title);
    }
});


yargs.command({
    command: "man",
    describe: "Display all of the available commands and their functions",
    handler() {
        console.log("add - add new record to the database \nviewAll - view all of the data that have been added");
    }
});

yargs.parse();

