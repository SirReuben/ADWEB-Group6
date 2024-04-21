// import all packages installed
var Express = require('express');
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

//Create an instance of express app
var app=Express();

app.use(Express.json());
//Make use of the CORS module
app.use(cors());

//Indicate the connection string from mongodb
var CONNECTION_STRING = "mongodb+srv://kclacson:kclacson@cluster0.kikao7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

//Indicate the name of the database
var DATABASENAME = "Ourdb";

//instantiate the mongodbclient
var database;

//create a listener

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database = client.db(DATABASENAME);
        console.log("Connected to MongoDB successfully!");
    });
});

//ROUTES TO ALL ACTIONS

//get all dbase data
app.get('/api/pronouns/GetPronouns', (req, res) => {
    database.collection("pronouns").find({}).toArray((error, result) => {
        res.send(result);
    })
});

app.get('/api/pronouns/update-data/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const userData = await database.collection("pronouns").findOne({ id: id });
        if (!userData) {
            return res.status(404).json({ error: 'User data not found' });
        }
        // Send the response with user data
        res.json({ 
            id: userData.id,
            message: 'Data fetched successfully',
            fullName: userData.fullName,
            emailAddress: userData.emailAddress,
            contactDetails: userData.contactDetails,
            preferredPronoun: userData.preferredPronoun
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data. Check server logs for more details.' });
    }
});

app.post('/api/pronouns/AddPronoun', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("pronouns").countDocuments();
        await database.collection("pronouns").insertOne({
            id: (numOfDocs + 1).toString(),
            fullName: req.body.fullName,
            contactDetails: req.body.contactDetails,
            emailAddress: req.body.emailAddress,
            preferredPronoun: req.body.preferredPronoun
        });
        res.status(201).json("Pronoun Added Successfully");
    } catch (error) {
        console.error("Error adding pronoun:", error);
        res.status(500).json({ error: "Failed to add pronoun" });
    }
});

// app.put('/api/pronouns/update-data/:id', multer().none(), async (req, res) => {
//     try {
//         const id = req.params.id;
//         await database.collection("pronouns").updateOne({ id: id }, { 
//             $set: {
//                 fullName: req.body.fullName,
//                 contactDetails: req.body.contactDetails,
//                 emailAddress: req.body.emailAddress,
//                 preferredPronoun: req.body.preferredPronoun
//             }
//         });
//         res.json("Pronoun Updated Successfully");
//     } catch (error) {
//         console.error("Error updating pronoun:", error);
//         res.status(500).json({ error: "Failed to update pronoun" });
//     }
// });

// Update pronoun data
app.put('/api/pronouns/update-data/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const filter = { id: id };
        const update = {
            $set: {
                fullName: req.body.fullName,
                contactDetails: req.body.contactDetails,
                emailAddress: req.body.emailAddress,
                preferredPronoun: req.body.preferredPronoun
            }
        };

        // Log the received data
        console.log('Received update data:', req.body);

        const result = await database.collection("pronouns").updateOne(filter, update);

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No pronoun data updated' });
        }

        res.json({ message: 'Pronoun data updated successfully' });
    } catch (error) {
        console.error('Error updating pronoun data:', error);
        res.status(500).json({ error: 'Failed to update pronoun data' });
    }
});


app.delete('/api/pronouns/DeletePronoun', (req, res) => {
    database.collection("pronouns").deleteOne({
        id: req.query.id
    }, (error, result) => {
        if (error) {
            console.error("Error deleting pronoun:", error);
            res.status(500).json({ error: "Failed to delete pronoun" });
            return;
        }
        res.json("Pronoun Deleted successfully!");
    });
});
