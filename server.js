const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const port =process.env.PORT || 6565;//|| 

require('dotenv').config()

// mongo client

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// initialized app
const app = express()

//middle 
app.use(express.json());
app.use(cors());

 
    //root app
      app.get('/', (req, res) => {
         res.send("Welcome to Assignment 11 by Programming Hero");
         
    })


// laptop bazar app

client.connect(err => {
  const  serviceCollection = client.db("photography").collection("newServices");

    console.log(err);
    // const adminCollection = client.db("assignment-10").collection("adminCollection");
    
    // const  userCollection = client.db("assignment-10").collection("userCollection");


    
    console.log(`MongoDb connected for assignment 11 given by programming hero`.magenta);



    
        // admin:  add services :
    app.post('/addServices', (req, res) => {
        const newService = req.body;
        console.log(newService);
        serviceCollection.insertOne(newService)
            .then(result => {
                console.log(result.insertedCount>0);
                res.send(result.insertedCount>0)
            })
        
        // productCollection.insertOne(newProduct)
        //     .then(result => {
        //         console.log(result.insertedCount>0);
        //         res.send(result.insertedCount>0)
        // })
       
      
       
        
    })

    // load data from database and show home
    // app.get('/getProduct', (req, res) => {
    //     productCollection.find({})
    //         .toArray((err, docs) => {
    //         res.send(docs)
    //     })
               
    // })


    //  get  newest services :
 
    
       app.get('/getNewServices', (req, res) => {
        serviceCollection.find({})
        .toArray((err, docs) => {
            res.send(docs);
        })
    })

// delete data from admin and home page :
//   app.delete('/delete/:id', (req, res) => {
//         console.log(req.params.id)
//          productCollection.deleteOne({_id: ObjectId(req.params.id)})
//         .then(result => {
//           console.log(result);
//           res.send(result.deletedCount > 0);
//         })
//          adminCollection.deleteOne({_id: ObjectId(req.params.id)})
//         .then(result => {
//           console.log(result);
//           res.send(result.deletedCount > 0);
//         })
        
      
//     })


// users order & checkout:

//         app.post('/addOrderedProduct', (req, res) => {
//         const userProduct = req.body;

//         userCollection.insertOne(userProduct)
//             .then(result => {
//                 console.log(result.insertedCount>0);
//                 res.send(result.insertedCount>0)
//         })
//    })     

        
    // app.get('/checkout', (req, res) => {
    //     userCollection.find({})
    //     .toArray((err, docs) => {
    //         res.send(docs);
    //     })
    // })

    //  order delete
    //     app.delete('/userDelete/:id', (req, res) => {
    //     console.log(req.params.id)
        
    //      userCollection.deleteOne({key: ObjectId(req.params.id)})
    //     .then(result => {
    //       console.log(result);
    //       res.send(result.deletedCount > 0);
    //     })
      
    // })
    


});







// server port : 
app.listen(port, ( ) => {
    console.log(`Server is running on ${port} Successfully`.blue);
})
 