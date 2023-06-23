const MongoClient = require('mongodb').MongoClient;

//build our url from our config file info
const config = require('./config-db.js');
const { cousers } = require('./config-db.js');
const url = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.database}?authSource=admin`;
const client = new MongoClient(url, { useUnifiedTopology: true });
let collectionHolidays = null;
let collectionUsers = null; //we will give this a value after we connect to the database


//bsj5 code//
//insert data into our Beach collection (TEST)
//Events Collection
const insertManyStarterData1 = async function () {
    // await collectionHolidays.deleteMany({})
    return collectionHolidays.insertMany([
        { username: 'John', date: '2023-01-02', name: 'castle', type: 'Museum', location: "stAndrews", transportation: 'car', rating: "1 Stars", comment: "Quite meaningful.", src: "images/castle.jpg" },
        { username: 'joe', date: '2023-01-03', name: 'Travel in Edinburgh', type: 'Beach', location: 'King Street', transportation: 'car', rating: "5 Stars", comment: 'It\'s very fun!', src: "images/1.jpeg" },
        { username: 'joe', date: '2023-01-04', name: 'Have fun in London', type: 'Food', location: 'Queen Street', transportation: 'subway', rating: "4 Stars", comment: 'The food is delicious!', src: "images/2.webp" },
        { username: 'joe', date: '2023-01-05', name: 'Vacation in Edinburgh', type: 'Sport', location: 'Whitehall Street', transportation: 'walk', rating: "3 Stars", comment: 'A little bit bad.', src: "images/3.jpeg" },
        { username: 'joe', date: '2023-01-06', name: 'Summer vacation in London', type: 'Museum', location: 'Sun Street', transportation: 'taxi', rating: "4 Stars", comment: 'It\'s very bad!', src: "images/4.jpeg" },
        { username: 'joe', date: '2023-01-06', name: 'Holiday in London', type: 'Attraction', location: 'sunshine Street', transportation: 'bus', rating: "2 Stars", comment: 'A little bit bad.', src: "images/5.jpeg" },
        { username: 'joe', date: '2023-01-07', name: 'My plan in Edinburgh', type: 'Beach', location: 'Moon Street', transportation: 'walk', rating: "1 Stars", comment: 'Too cold!', src: "images/6.webp" },
        { username: 'joe', date: '2023-01-08', name: '3 days in London', type: 'Food', location: 'Moonlight Street', transportation: 'subway', rating: "4 Stars", comment: 'Amazing!', src: "images/7.jpeg" },
        { username: 'joe', date: '2023-01-10', name: 'Christmas in London', type: 'Sport', location: 'Water Street', transportation: 'bus', rating: "3 Stars", comment: 'So tired!', src: "images/8.jpeg" },
        { username: 'joe', date: '2023-01-11', name: 'New year in Edinburgh', type: 'Museum', location: 'Tree Street', transportation: 'taxi', rating: "2 Stars", comment: 'It\'s closed too early.', src: "images/9.jpeg" },
        { username: 'joe', date: '2023-01-12', name: 'weekend in London', type: 'Attraction', location: 'winter Street', transportation: 'car', rating: "3 Stars", comment: 'It\'s very beautiful!', src: "images/10.jpeg" },
        { username: 'joe', date: '2023-01-13', name: 'Monday in Edinburgh', type: 'Beach', location: 'Star Street', transportation: 'subway', rating: "3 Stars", comment: 'It\'s beautiful!', src: "images/11.jpeg" },
        { username: 'joe', date: '2023-01-14', name: 'Tuesday in Edinburgh', type: 'Food', location: 'China Town', transportation: 'Bus', rating: "5 Stars", comment: 'Amazing!', src: "images/12.webp" },
        { username: 'joe', date: '2023-01-15', name: 'Wednesday in London', type: 'Sport', location: 'Sport Street', transportation: 'walk', rating: "4 Stars", comment: 'Not bad.', src: "images/13.jpeg" },
        { username: 'joe', date: '2023-01-22', name: 'Thursday in London', type: 'Museum', location: 'Flower Street', transportation: 'taxi', rating: "1 Stars", comment: 'Too much people.', src: "images/14.jpeg" },
        { username: 'joe', date: '2023-01-23', name: 'Friday in Edinburgh', type: 'Attraction', location: 'Downing Street', transportation: 'car', rating: "2 Stars", comment: 'Closed too early.', src: "images/15.jpeg" },
        { username: 'joe', date: '2023-03-03', name: 'westSands', type: 'Beach', location: "stAndrews", transportation: 'walk', rating: "5 Stars", comment: 'A little bit tired.', src: "images/47.jpeg" }, //can be more specific with location
        { username: 'Linda', date: '2023-02-22', name: 'northPoint', type: 'Food', location: "stAndrews", transportation: 'walk', rating: "5 Stars", comment: "Not bad.", src: "images/48.jpeg" }, //can add more elements
        { username: 'Linda', date: '2023-03-22', name: 'golf', type: 'Sport', location: "stAndrews", transportation: 'walk', rating: "5 Stars", comment: "Pretty excited!", src: "images/49.jpeg" },    // can also create a collection for each holiday type if easier
        { username: 'joe', date: '2023-02-12', name: 'castle', type: 'Museum', location: "stAndrews", transportation: 'walk', rating: "5 Stars", comment: "Enjoy this little museum!", src: "images/50.webp" }
    ])
        .then(res => console.log("Data inserted with 51 holidayPosts"))
        .catch(err => {
            console.log("Could not add post data ", err.message);
            if (err.name != 'BulkWriteError' || err.code != 11000) throw err;
        })
}
//Users Collection 
const insertManyStarterData2 = async function () {
    // await collectionUsers.deleteMany({})
    return collectionUsers.insertMany([
        { _id: 'Joe', password: 'password' },
        { _id: 'Josey', password: '12345' },
        { _id: 'Linda', password: '12345' },
        { _id: 'John', password: '12345' },
        { _id: 'Cathy', password: '12345' },
        { _id: 'Jessica', password: '12345' }
    ])
        .then(res => console.log("Data inserted with userIDs"))
        .catch(err => {
            console.log("Could not add user data ", err.message);
            if (err.name != 'BulkWriteError' || err.code != 11000) throw err;
        })
}

//Collection for Peronal Itinery 
const insertManyStarterData3 = async function () {
    // await collectionItinery.deleteMany({})
    return collectionItinery.insertMany([
        { username: 'John', date: '2023-01-02', name: 'castle', type: 'Museum', location: "stAndrews", transportation: 'car', rating: "1 Stars", comment: "Quite meaningful.", src: "images/castle.jpg" },
    ])
        .then(res => console.log("Data inserted with 51 holidayPosts"))
        .catch(err => {
            console.log("Could not add post data ", err.message);
            if (err.name != 'BulkWriteError' || err.code != 11000) throw err;
        })
}

client.connect()
    //NOTE: the regular expression replaces the password with **** so it is not printed in plain text to the console! 
    .then(conn => {
        //if the collection does not exist it will automatically be created
        collectionHolidays = client.db().collection(config.collection1); //Collection for events
        collectionUsers = client.db().collection(config.cousers); //Collection for users
        collectionComments = client.db().collection(config.cocomments);//Collection for comments
        collectionItinery = client.db().collection(config.collectionItinery);//Collection for personal Itinery
        console.log("Connected!", conn.s.url.replace(/:([^:@]{1,})@/, ':****@'))
    })
    .catch(err => { console.log(`Could not connect to ${url.replace(/:([^:@]{1,})@/, ':****@')}`, err); throw err; })
    //interact with the database
    .then(() => insertManyStarterData1())
    .then(() => insertManyStarterData2())
    .then(() => insertManyStarterData3())
    // .then(() => insertManyStarterData4())
    //exit gracefully from any errors
    // .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost: ${API_PORT}`)))
    .catch(err => console.log(`Could not start server`, err))
