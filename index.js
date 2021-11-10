
const express = require('express')
const app = express()
const port = 4000;
const { MongoClient } = require('mongodb');
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufugb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)
async function run() {

    try {
  
      await client.connect();
      const database = client.db("insertToCarHub");
      const carHub = database.collection("CarHub");
  
      // create a document to insert
    //   const result = await carHub.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);

    app.post('/cars',async(req,res)=>{

    })

    } finally {
  
    //   await client.close();
    }
  }
  
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World! this is mahlil mohammed  here ')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
