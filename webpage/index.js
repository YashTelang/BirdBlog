var express = require('express');
var app = express();
const port = 3000
const router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const fs = require('fs');

// Load secrets
const secrets = JSON.parse(require('child_process').execSync('node doppler-secrets.js'));


// MongoDB Atlas Connection Code
const { MongoClient, ServerApiVersion } = require('mongodb');
const dbPass = secrets.MONGO_DB_PASS;
const uri = "mongodb+srv://hackbird23:" + dbPass + "@birdcluster0.ttenopu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Test DB connection
client.connect(err => {
  const collection = client.db("sample_mflix").collection("comments");
  // perform actions on the collection object
  client.close();
});

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
        var tweet = "Birds on the Grind."
        //res.render('../index.ejs')
        
        res.render('../index.ejs', {
                tweet : tweet
        });
        
        
});


app.post('/', (request, response) => {
        console.log(request.body);
        
        var jsonRequest = request.body;
        var name = jsonRequest.name;
        mainDiction[name] = jsonRequest;
        var jsonResponse = jsonRequest.name;
        response.send(jsonResponse);
        
});

app.use('/', router);
console.log('Operating on Port: '+port);
app.listen(process.env.port || port);
