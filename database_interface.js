const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient; // this will be used to connect to the db and intercat with it.
const connectionURL = 'mongodb://127.0.0.1:27017'; // the url of local database which is the localhost server with port number of mongodb server
const databaseName = 'task-manager-db'; // name of database

// /Users/abdul/mongodb-win32-x86_64-windows-4.4.3/bin/mongod.exe --dbpath=/Users/abdul/mongodb_data

// function that is used to connect to the database
const connect = () => {
    const connectdb = MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true });
    return connectdb;
}

// this function is used to add one record to the database
const add = (title, dev, release_date, platforms) => {
    connect().then((client) => {
        // console.log(client);
        const dbClient = client.db(databaseName);
        dbClient.collection("inventory").insertOne({
            title: title,
            dev: dev,
            release_date: new Date(release_date),
            platforms: platforms
        }).then((data) => {
            console.log("the following data has been inserted into the database");
            console.log(data.ops);
        }).catch((error) => {
            console.log("failed to insert data into the database");
        })
   
    }).catch((error) => {
        console.log("failed to connect to the database");
        console.log(error);
    });
}

// used to view all of the data in the database
const viewAll = () => {
    connect().then((client) => {
        const dbClient = client.db(databaseName);
        dbClient.collection("inventory").find({
            // empty finds all
        }).toArray().then((data) => {
            console.table(data);
        }).catch((error) => {
            console.log("unable to find data");
        })
    }).catch((error) => {
        console.log("failed to connect to the database");
    })
}

const search = (dev) => {
    connect().then((client) => {
        const dbClient = client.db(databaseName);
        dbClient.collection("inventory").find({
            dev: dev,

        }).toArray().then((data) => {
            console.table(data);
        }).catch((error) => {
            console.log("no data to display based on crietria");
        })
        
    }).catch((error) => {
        console.log("failed to connect to the database");
    })
}

const del = (title) => {
    connect().then((client) => {
        const dbClient = client.db(databaseName);
        dbClient.collection("inventory").deleteOne({
            title: title

        }).toArray().then((data) => {
            console.log("the following data has been deleted");
            console.table(data);
        }).catch((error) => {
            console.log("no data to display based on crietria");
        })
        
    }).catch((error) => {
        console.log("failed to connect to the database");
    })
}

//del("Nier:Automata");


module.exports = {
    add: add,
    viewAll: viewAll,
    search: search,
    del: del
}


