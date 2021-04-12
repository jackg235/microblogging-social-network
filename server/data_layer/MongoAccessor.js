let mongoose = require('mongoose');

class Database {
    _connect(dbname) {
        const uri = `mongodb+srv://jackgoettle:jackpassword@cluster0.enuas.mongodb.net/${dbname}?retryWrites=true&w=majority`;
        console.log(uri)
        mongoose.connect(uri, {useNewUrlParser: true})
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error ' + err)
            })
    }
}

module.exports = new Database()

/*
async function init() {
    console.log('connecting to mongodb')
    // Connect to the MongoDB cluster
    await client.connect();
    db = client.db(dbname)
}

// dummy function that lists the databases in mongo
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main() {

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);

module.exports = {init} */