const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://jackgoettle:jackpassword@cluster0.enuas.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let db;
const dbname = 'whiteboarders'

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

module.exports = {db, init}