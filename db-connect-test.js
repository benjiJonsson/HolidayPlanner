const MongoClient = require('mongodb').MongoClient;

//build our url from our config file info
const config = require('./config-db.js');
const url = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.database}?authSource=admin`;
const client = new MongoClient(url, { useUnifiedTopology: true });
let collection1 = null; //we will give this a value after we connect to the database

//connect to the database
client.connect()
//NOTE: the regular expression replaces the password with **** so it is not printed in plain text to the console! 
.then(conn => {
    //if the collection does not exist it will automatically be created
    collection1 = client.db().collection(config.collection1);
    console.log("Connected!", conn.s.url.replace(/:([^:@]{1,})@/, ':****@')) 
})
.catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err);  })
//just close the connection because there is nothing else we want to do!
.finally( () => { client.close(); console.log("Disconnected"); });
