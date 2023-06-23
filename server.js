// install node.js and express
// npm install node
// npm install express
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const expressBasicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const { ObjectId } = require('bson');

//build our url from our config file info
const config = require('./config-db.js');
const { cousers } = require('./config-db.js');
const url = `mongodb://${config.username}:${config.password}@${config.url}:${config.port}/${config.database}?authSource=admin`;
const client = new MongoClient(url, { useUnifiedTopology: true });
let collectionHolidays = null;
let collectionUsers = null; //we will give this a value after we connect to the database
// let collectionComments = null

const app = express(); // SD302: create express instance
const API_PORT = 3000;

// SD302: configure body-parser to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/content/index.html');
});

///HT61: THIS SECTION IS FOR SIGN UP A NEW USER ACCOUNT///
//save new user info to cousers collection
//check json before insert
const addNewuser = async function (newUser) {
    try {
        var dpUser = await collectionUsers.findOne({ _id: newUser.username });
        if (dpUser) {
            console.log("dp", dpUser)
            console.log("should return username duplicated.")
            return msg = "duplicate"
        } else {
            if (newUser.psw != "") {
                // console.log(newUser.psw);
                collectionUsers.insertOne({ _id: newUser.username, password: newUser.psw });
                console.log("add new user successfully", newUser.username);
                return msg = "success"
            } else {
                // console.log(newUser.psw);
                return msg = "nopsw"
            }
        }
    } catch (err) {
        console.log(err)
    }
}



//go to sign up page
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + '/content/signup.html');
})



//recceive and response to signup req
app.post("/userSignup", authenticate, (req, res) => {
    // console.log(req.body)
    addNewuser(req.body)
        .then((msg) => {
            //problem: cannot read the response if failed
            if (msg == "duplicate") {
                res.status(400).send(`Sign up failed, username duplicated.`)
            } else if (msg == "success") { res.status(200).send(`Sign up a new account successfully!`) }
            else if (msg == "nopsw") { res.status(400).send(`Sign up failed, please set the password.`) }
        }
        )
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Error: Could not sign up` });
        })
})

///HT61: THIS SECTION IS FOR LOGIN A NEW USER ACCOUNT///
//basic-express-auth authenticate 
async function authenticate(username, password, callback) {
    try {
        const match = await collectionUsers.findOne({ _id: username, password: password });
        if (match) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    } catch (error) {
        callback(null, false);
    }
}

const authorise = expressBasicAuth({
    authorizer: authenticate,
    challenge: true,	//make the browser ask for credentials if none/wrong are provided
    authorizeAsync: true
})

//add authorise to login
app.get('/login', authorise, (req, res) => {
    res.status(200).json({ msg: req.auth.user })
})

//bsj5
// Node.js functionality for Events data//
//Fetching all holiday Events.. Attractions
app.get('/holidayEvents/', function (req, res, next) {
    collectionHolidays.find({}).toArray()
        .then(docs => {
            res.status(200).json(docs);
            //res.sendFile(__dirname + '/content/index.html');
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get holiday events` });
        })
});

//Fetching Holdiay Event by specific type (i.e. Beach)

// 1. Beach
app.get('/holidayEvents/Beach', function (req, res, next) {
    var query = { type: "Beach" }
    collectionHolidays.find(query).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
});

// 2. Museum 
app.get('/holidayEvents/Musem', function (req, res, next) {
    var query = { type: "Museum" }
    collectionHolidays.find(query).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
});

// 3. Sport
app.get('/holidayEvents/Sport', function (req, res, next) {
    var query = { type: "Sport" }
    collectionHolidays.find(query).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
});

// 4. Food 
app.get('/holidayEvents/Food', function (req, res, next) {
    var query = { type: "Food" }
    collectionHolidays.find(query).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
});

// Filtering Events by date & rating: 
//Filtering by rating bsj5
// Filtering by date bsj5 & kpf1
//Function to reduce repetitive code
function queryFunction(query, res) {
    collectionHolidays.find(query).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
}

//1. Beach 
//References for $in 
//https://www.mongodb.com/docs/manual/tutorial/query-documents/
//https://www.w3schools.com/nodejs/nodejs_mongodb_query.asp

app.get('/holidayEvents/Beach/:RATING/:DATE', function (req, res, next) {
    filRating = req.params.RATING
    filDate = req.params.DATE
    console.log(filDate)
    //let query = {}
    if (filRating == "1 Stars") {
        let query = { type: "Beach", rating: { $in: ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "2 Stars") {
        let query = { type: "Beach", rating: { $in: ["2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "3 Stars") {
        let query = { type: "Beach", rating: { $in: ["3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "4 Stars") {
        let query = { type: "Beach", rating: { $in: ["4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "5 Stars") {
        let query = { type: "Beach", rating: { $in: ["5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    }
});
// 2. Food
app.get('/holidayEvents/Food/:RATING/:DATE', function (req, res, next) {
    filRating = req.params.RATING
    filDate = req.params.DATE
    console.log(filRating)
    //let query = {}
    if (filRating == "1 Stars") {
        let query = { type: "Food", rating: { $in: ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "2 Stars") {
        let query = { type: "Food", rating: { $in: ["2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "3 Stars") {
        let query = { type: "Food", rating: { $in: ["3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "4 Stars") {
        let query = { type: "Food", rating: { $in: ["4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "5 Stars") {
        let query = { type: "Food", rating: { $in: ["5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    }
});

// 3. Museum
app.get('/holidayEvents/Museum/:RATING/:DATE', function (req, res, next) {
    filDate = req.params.DATE
    filRating = req.params.RATING
    console.log(filRating)
    //let query = {}
    if (filRating == "1 Stars") {
        let query = { type: "Museum", rating: { $in: ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "2 Stars") {
        let query = { type: "Museum", rating: { $in: ["2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "3 Stars") {
        let query = { type: "Museum", rating: { $in: ["3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "4 Stars") {
        let query = { type: "Museum", rating: { $in: ["4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "5 Stars") {
        let query = { type: "Museum", rating: { $in: ["5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    }
});

// 4. Sports
app.get('/holidayEvents/Sport/:RATING/:DATE', function (req, res, next) {
    filRating = req.params.RATING
    filDate = req.params.DATE
    console.log(filRating)
    //let query = {}
    if (filRating == "1 Stars") {
        let query = { type: "Sport", rating: { $in: ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "2 Stars") {
        let query = { type: "Sport", rating: { $in: ["2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "3 Stars") {
        let query = { type: "Sport", rating: { $in: ["3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "4 Stars") {
        let query = { type: "Sport", rating: { $in: ["4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "5 Stars") {
        let query = { type: "Sport", rating: { $in: ["5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    }
});

// 5. All
app.get('/holidayEvents/:RATING/:DATE', function (req, res, next) {
    filRating = req.params.RATING
    filDate = req.params.DATE
    console.log(filRating)
    //let query = {}
    if (filRating == "1 Stars") {
        let query = { rating: { $in: ["1 Stars", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "2 Stars") {
        let query = { rating: { $in: ["2 Stars", "3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "3 Stars") {
        let query = { rating: { $in: ["3 Stars", "4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "4 Stars") {
        let query = { rating: { $in: ["4 Stars", "5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    } else if (filRating == "5 Stars") {
        let query = { rating: { $in: ["5 Stars"] }, date: { $gte: filDate } }
        queryFunction(query, res)
    }
});

//Filtering by most recent date for Index Page

app.get('/holidayEvents/recentDate', function (req, res, next) {
    //var query = { date: { $gte: filDate } }
    collectionHolidays.find().sort({ "datetime": -1 }).limit(5).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get Holidays in '${type}' category` });
        });
})
// Referene: https://stackoverflow.com/questions/21971710/get-latest-mongodb-record-by-field-of-datetime

// Adding Get function to diplsay 5 random events to index page
app.get('/5randomEvents/', function (req, res, next) {

    collectionHolidays.aggregate([{ $sample: { size: 5 } }])
        .toArray().then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get itinery events` });
        })
});

//Reference: https://www.mongodb.com/docs/manual/reference/operator/aggregation/sample/

//Itinery server
// Adding POST & GET functions for personal Itinery 
app.get('/itineryEvents/', function (req, res, next) {
    collectionItinery.find({}).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not get itinery events` });
        })
});


///UPLOAD POST///
/*upload a post
problem still need to be solve: no feedback when success;
not upload img
*/
//check post content before insert
const checkPost = function (json) {
    if (!json.hasOwnProperty('name') || json.name == "") {
        return false
    }
    if (!json.hasOwnProperty('type') || json.type == "") {
        return false
    }
    if (!json.hasOwnProperty('location') || json.location == "") {
        return false
    }
    if (!json.hasOwnProperty('transportation') || json.transportation == "") {
        return false
    }
    if (!json.hasOwnProperty('rating') || json.rating == "") {
        return false
    }
    if (!json.hasOwnProperty('comment') || json.comment == "") {
        return false
    } if (!json.hasOwnProperty('date') || json.date == "") {
        return false
    } if (!json.hasOwnProperty('src') || json.src == "") {
        return false
    } else { return true }
    // if (!json.hasOwnProperty('src')) {
    //     throw new Error("Missing src");
    // }
    // return { name: json.name, type: json.type, location: json.location};
}

app.post('/uploadPost', authorise, function (req, res, next) {
    let body = req.body
    let checkResult = checkPost(req.body);
    console.log(checkResult)
    checkResult ?
        (collectionHolidays.insertOne(body)
            .then(res.status(200).send(`added new post '${body.name}'`)
                //'${body.username}
            )
            .catch(err => {
                console.log(`Could not add post '${body.name}'`, err);
                res.status(400).send(`Could not add post '${body.name}'`);
            })) : res.status(400).send(`Could not upload, Please check whether fill in each part.`)
})


//use express' static middleware
app.use(express.static('content'));

///HT61: COMMENT FUNCTION///
//get specific post
app.get('/holidayPost/:POSTID', authorise, function (req, res, next) {
    let postId = req.params.POSTID;
    console.log(postId)
    collectionHolidays.find({ _id: new ObjectId(postId) }).toArray()
        .then(docs => {
            // console.log(docs)
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not find postid category` });
        });
});

//get comment of specific post on the specific post webpage
app.get('/holidayComments/:POSTID', authorise, function (req, res, next) {
    let postId = req.params.POSTID;
    collectionComments.find({ postid: postId }).toArray()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ msg: `Could not find postid category` });
        });
});

const checkComment = function (json) {
    if (!json.hasOwnProperty('postid') || json.postid == "") {
        console.log("1")
        return false
    }
    if (!json.hasOwnProperty('comdate') || json.comdate == "") {
        console.log("2")
        return false
    }
    if (!json.hasOwnProperty('usefulmark') || json.usefulmark == "") {
        console.log("3")
        return false
    }
    if (!json.hasOwnProperty('comment') || json.comment == "") {
        console.log("4")
        return false
    }
    if (!json.hasOwnProperty('username') || json.username == "") {
        console.log("5")
        return false
    } else { return true }

}


//add comment to one post on the specific post webpage
app.post('/addcomments', authorise, function (req, res, next) {
    let body = req.body
    let checkCom = checkComment(body)
    console.log(body)
    checkCom ? (collectionComments.insertOne(body)
        .then(res.status(200).send(`comment success!`))
        .catch(err => {
            console.log(`Could not add comment for id '${body.postid}`, err);
            res.status(400).send(`comment failed`);
        })) : res.status(400).send(`Could not send comment, please fill in each part.`)
})


//bsj5 code//
//insert data into our Beach collection (TEST)
//Events Collection
const insertManyStarterData1 = async function () {
    await collectionHolidays.deleteMany()
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
    await collectionUsers.deleteMany({})
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
    await collectionItinery.deleteMany({})
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
    // .then(() => collectionHolidays.deleteMany({}))
    // .then(() => collectionUsers.deleteMany({}))
    .then(() => insertManyStarterData3())
    // .then(() => insertManyStarterData4())
    //exit gracefully from any errors
    .then(() => app.listen(API_PORT, () => console.log(`Listening on localhost: ${API_PORT}`)))
    .catch(err => console.log(`Could not start server`, err))

// command node server.js

//This next function is the updated version and will involve checks
/*
//Function to validate user input - make sure the event has a name, type, and location
const makeHolidayEvent = function(json) {
    if (!json.hasOwnProperty('name')) {
        throw new Error("Missing name");
    }
    if (!json.hasOwnProperty('type')) {
        throw new Error("Missing type");
    }
    if (!json.hasOwnProperty('location')) {
          throw new Error("Missing location");
    }
    return {name: json.name, type: json.type, location: json.location};
}

//Setting up the route:
app.post('/holidayEvents/', function(req,res,next) {
    let body = req.body;
    let holidayEvent = makeHolidayEvent(body); // this will do all the validation for us!
    collection.insertOne(holidayEvent)
    .then( holidayEvent_jsn => {
        res.status(200).json({msg : `Added film '${body.name}' with id ${holidayEvent_jsn.insertedId}`});
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({msg: `Could not add film '${body.name}`});
    });
});
*/
//////* SD302: LOGIN REGISTRATION *//////
// in-memory databse stores user data
/*const users = [];

// user registration
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // does the user already exist?
    const existingUser = users.some((user) => user.username === username);
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
    }

    // add new user to user array
    users.push({ username, password });
    res.status(200).json({ message: 'User created successfully' });

});

// user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // find user in database
    const user = users.find((user) => user.username === username);
    if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
    }
    else if (user.password !== password) { // is the password correct?
        res.status(401).json({ message: 'Invalid username or password' });
    }
    else {
        res.status(200).json({ message: 'Login successful!' });
    }
});
*/

////* SD302: COMMENT SECTION *////

// array to store comments
/*let comments = [];

// post route to handle comment submissions
app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.send('Comment added successfully!')
});

// get route to return all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});*/

////* END OF: COMMENT SECTION *////


////* SD302: COMMENT SECTION *////

// array to store comments
/*let comments = [];

// post route to handle comment submissions
app.post('/comments', (req, res) => {
    const comment = req.body.comment;
    comments.push(comment);
    res.send('Comment added successfully!')
});

// get route to return all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});*/

////* END OF: COMMENT SECTION *////
