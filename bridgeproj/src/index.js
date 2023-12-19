
const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const axios = require("axios")
const LogInCollection= require("./mongodb").LogInCollection;
const { MongoClient } = require("mongodb");
const session = require("express-session"); 
const SaveBuyDb = 'mongodb://127.0.0.1:27017/SaveBuy';
const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({ extended: false }))

const publicPath = path.join(__dirname, '../public')
console.log(publicPath);
app.use(express.static(publicPath))

app.use(session({
    secret: 'my-secret-key-7558747250', // Replace with a random secret key
    resave: false,
    saveUninitialized: true,
  }));

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/arbitragedata', async (req, res) => {
    const dbURIArbitrageData = 'mongodb://127.0.0.1:27017/ArbitrageData';
    try {
      const client = await MongoClient.connect(dbURIArbitrageData, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db();
      const ArbitrageDataCollection = db.collection("arbitragecollection");
  
      const data = await ArbitrageDataCollection.find({}).toArray();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from arbitragedata database:', error);
      res.status(500).send('An error occurred while fetching data from arbitragedata database.');
    }
  });


app.post('/signup', async (req, res) => {
    console.log("inside signup");

    const data = {
        name: req.body.name,
        password: req.body.password
    }


    const checking = await LogInCollection.findOne({ name: req.body.name })
    console.log(checking);

   try{
    if (checking!=null) {
      res.status(409).json({ message: "User already exists" });
    }
    else{
        await LogInCollection.insertMany([data])
        return res.status(200).json({
          message: "User registered successfully",
          redirectTo: "/"
      });
      }
   }
   catch(error){
    res.status(409).json({ message: "wrong-inputs" });
    console.log(error);
   }
   
    
})


app.post('/login', async (req, res) => {
    

    try {
        const abc=req.body.name;
        console.log(abc);
        const check = await LogInCollection.findOne({ name: req.body.name })
        console.log("login"+check);
        if (check.password === req.body.password) {
            
            req.session.user = {
                name: req.body.name,
                // Add other user information as needed
              };
              return res.status(200).json({
                message: "User logged in successfully",
                redirectTo: "/home.html"
            });
        }

        else {
          res.status(409).json({ message: "incorrect password" });
        }


    } 
    
    catch (e) {

      res.status(409).json({ message: "wrong details" });
        

    }


})
app.get('/checkLoggedIn', (req, res) => {
    if (req.session && req.session.user) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

app.get('/getLoggedInUser', (req, res) => {
    console.log("before"+req.session.user);
    if (req.session && req.session.user) {
      res.json(req.session.user);
    } else {
      res.json({});
    }
  });

app.post('/saveEntry', async (req, res) => {
    if (req.session && req.session.user) {
        const user = req.session.user.name;
        const savedate= new Date();
        const { symbol, nseprice, bseprice, difference, buyat } = req.body;
        const entry = {
            user,
            symbol,
            nseprice,
            bseprice,
            difference,
            buyat,
            savedate
        };

        try {
            const client = await MongoClient.connect(SaveBuyDb, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
              });
              const db = client.db();
            const saveBuyCollection = db.collection("saved");
            await saveBuyCollection.insertOne(entry);
            res.sendStatus(200); // Respond with success status code
        } catch (error) {
            console.error('Error saving entry to savebuy database:', error);
            res.sendStatus(500); // Respond with error status code
        }
    } else {
        res.sendStatus(403); // Respond with forbidden status code if user is not logged in
    }
});


app.get('/saveddata', async (req, res) => {
    if (req.session && req.session.user) {
        const user = req.session.user.name;
    try {
      const client = await MongoClient.connect(SaveBuyDb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = client.db();
      const savedcollection = db.collection("saved");
  
      const data = await savedcollection.find({user}).toArray();
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error('Error fetching data from save database:', error);
      res.status(500).send('An error occurred while fetching data from save database.');
    }
    }
    else {
        res.sendStatus(403); // Respond with forbidden status code if user is not logged in
    }
  });

  app.post('/updateBuyStatus', async (req, res) => {
    if (req.session && req.session.user) {
      const user = req.session.user.name;
      const { symbol, quantity, nseprice } = req.body;
  
      try {
        const client = await MongoClient.connect(SaveBuyDb, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        const db = client.db();
        const saveBuyCollection = db.collection("saved");
        
        // Find the document with the matching user and symbol
        const query = { user, symbol, nseprice };
        const existingDocument = await saveBuyCollection.findOne(query);
  
        if (existingDocument) {
          // Update the buy status to true
          const buyDate = new Date(); // Get the current date and time

          await saveBuyCollection.updateOne(query, { $set: { buy: true, quantity, buyDate } });
  
          res.sendStatus(200); // Respond with success status code
        } else {
          res.sendStatus(404); // Respond with not found status code if document not found
        }
      } catch (error) {
        console.error('Error updating buy status in savebuy database:', error);
        res.sendStatus(500); // Respond with error status code
      }
    } else {
      res.sendStatus(403); // Respond with forbidden status code if user is not logged in
    }
  });

  app.post('/unsaveStock', async (req, res) =>{
    if (req.session && req.session.user) {
        const user = req.session.user.name;
        const {symbol} = req.body;

        try {
            const client = await MongoClient.connect(SaveBuyDb, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            const db = client.db();
            const saveBuyCollection = db.collection("saved");
            
            // Find the document with the matching user and symbol
            const query = { user, symbol };
            console.log("query"+query);
            const existingDocument = await saveBuyCollection.findOne(query);
            console.log(existingDocument);
            if (existingDocument) {
              await saveBuyCollection.deleteOne(query);
      
              res.sendStatus(200); // Respond with success status code
            } else {
              res.sendStatus(404); // Respond with not found status code if document not found
            }
          } catch (error) {
            console.error('Error unsaving in savebuy database:', error);
            res.sendStatus(500); // Respond with error status code
          }
    }
    else{
        res.sendStatus(403);
    }
  });


  app.post('/sellStock', async (req, res) =>{
    if (req.session && req.session.user) {
        const user = req.session.user.name;
        const {symbol} = req.body;

        try {
            const client = await MongoClient.connect(SaveBuyDb, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            const db = client.db();
            const saveBuyCollection = db.collection("saved");
            
            // Find the document with the matching user and symbol
            const query = { user, symbol };
            console.log("query"+query);
            const existingDocument = await saveBuyCollection.findOne(query);
            console.log(existingDocument);
            if (existingDocument) {
              await saveBuyCollection.deleteOne(query);
      
              res.sendStatus(200); // Respond with success status code
            } else {
              res.sendStatus(404); // Respond with not found status code if document not found
            }
          } catch (error) {
            console.error('Error selling in savebuy database:', error);
            res.sendStatus(500); // Respond with error status code
          }
    }
    else{
        res.sendStatus(403);
    }
  });


app.listen(3000,()=>{
    console.log("port connected");
})
