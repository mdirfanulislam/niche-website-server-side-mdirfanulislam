
const express = require('express')
const app = express()
const port =process.env.port || 4000;
const { MongoClient } = require('mongodb');
const cors=require('cors')
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config()


app.use(cors()) ;
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufugb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)
async function run() {

    try {
  
      await client.connect();
      const database = client.db("insertToCarHub");
      const carHub = database.collection("CarHub");
      const purchaser=database.collection('carOrderer');
      const reviews=database.collection('reviewHub')
      const totalUsers=database.collection('userhub')
      // create a document to insert
    //   const result = await carHub.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);

    app.get('/cars',async(req,res)=>{
        const query={}
        const movie =  carHub.find(query);
        const result =await movie.toArray();
        res.json(result);
    })
    app.post('/cars',async(req,res)=>{
        const doc =req.body;
        // console.log(doc)
        const result =await carHub.insertOne(doc);
        res.json(result);
        // console.log(result)
    })
    app.get('/explore',async(req,res)=>{
        const query={}
        const movie =  carHub.find(query);
        const result =await movie.toArray();
        res.json(result);
    })
    app.get('/allOrders',async(req,res)=>{
        const query={}
        const movie =  purchaser.find(query);
        const result =await movie.toArray();
        res.json(result);
    })
    // to update the status here 
    app.put('/allOrders/:id',async(req,res)=>{
      const id =req.params.id;
      console.log(id)
      const filter = { _id:ObjectId(id) };
      const updateDoc = {
        $set: {
          status:"Shipped "
        } };
        const result = await purchaser.updateOne(filter, updateDoc);
        res.json(result);
        console.log(result)
    })
    // deleteing by the admin 
    app.delete('/allOrders/:id',async(req,res)=>{

      const id =req.params.id;
      const query={_id:ObjectId(id)};
      console.log(query)
      const result = await purchaser.deleteOne(query);
      res.json(result)
      console.log(result)
    })

    app.get('/cars/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)}
        const movie = await carHub.findOne(query);
        res.json(movie);
    })
    app.post('/reviews', async(req,res)=>{
      const doc=req.body;
      // console.log(doc);
      const result = await reviews.insertOne(doc);
      res.json(result);
    })
    app.post('/registerUsers', async(req,res)=>{
      const doc=req.body;
      // console.log(doc);
      const result = await totalUsers.insertOne(doc);
      res.json(result);
    })
    app.put('/makeAdmin',async(req,res)=>{
      const user=req.body;
      // console.log(user);
      const filter = { email:user.email };
      // console.log(filter)
      const updateDoc = {   $set: {   role:"admin"  }  };
      const result = await totalUsers.updateOne(filter, updateDoc);
      console.log(result)
      res.json(result)
    })
    app.get('/myorders', async(req,res)=>{
      // console.log(req.query);
      const email=req.query.email
      const query={email:email};
      // console.log(query)
      const movie =  purchaser.find(query);
      const result =await movie.toArray()
      res.json(result);
    })

    // checking the admin 
   app.get('/admins/:adminemail',async(req,res)=>{
    const email=req.params.adminemail;
    const query={email:email};
    const result= await totalUsers.findOne(query);
    let isAdmin=false ;
    if(result.role=="admin"){
      isAdmin=true;
    }
    res.json({admin:isAdmin})
    console.log({admin:isAdmin})

   })

    app.get('/reviews', async(req,res)=>{
      const query={}
      const movie =  reviews.find(query);
      const result =await movie.toArray();
      res.json(result);

    })
    app.delete('/myorders/:id', async(req,res)=>{
      // console.log(req.query);
      // console.log(req.params.id)
      const id =req.params.id;
      const query={_id:ObjectId(id)};
      console.log(query)
      const result = await purchaser.deleteOne(query);
      res.json(result)
      console.log(result)
    })
    app.delete('/admindelete/:id', async(req,res)=>{
      // console.log(req.query);
      // console.log(req.params.id)
      const id =req.params.id;
      const query={_id:ObjectId(id)};
      console.log(query)
      const result = await carHub.deleteOne(query);
      res.json(result)
      console.log(result)
    })

    // taking the user data and storing them 
    app.post('/users', async(req,res)=>{
      const doc=req.body;
      const result = await purchaser.insertOne(doc);
      res.json(result);
  
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
