const express = require('express');
const cors = require('cors');
// require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000;

// dbuser12
// Q6FTZgg9SMbNmd6T


app.use(cors());
app.use(express.json());




const uri = "mongodb+srv://dbuser12:YBfYreuYxs9OdH9y@cluster0.ksusr45.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log('Database Connected')

        const photosCollection = client.db('candid_galaxy').collection('photos');


        app.post('/photo', async (req, res) => {
            const photos = req.body;
            const result = await photosCollection.insertOne(photos);
            res.send(result);
        })

        app.get('/photo', async (req, res) => {
            const photos = await photosCollection.find().toArray();
            res.send(photos);
        })

    }
    finally {

    }

}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Project X On your Way')
})

app.listen(port, () => {
    console.log(`Project X app listening on port ${port}`)
})