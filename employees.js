var express = require("express");
var router = express.Router();

var app = express();
var MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const uri =  "mongodb+srv://samruddhi8407:sUMaaoEhdA3ciS8b@cluster0.ib2ebsk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const DB_NAME = "Employees";

const COLLECTION_USER = "data";

router.get("/", async function (req , res) {
    let dbo = await client.db(DB_NAME);
    let data = await dbo
    .collection(COLLECTION_USER)
    .find()
    .sort({ name : 1})
    .toArray();
    console.log("data >> ", data);
    res.json(data);
});

router.post("/", async function (req, res) {
    let dbo = await client.db(DB_NAME);
    var myobj = req.body;
    let data = await dbo.collection(COLLECTION_USER).insertOne(myobj);
    console.log(data);
    console.log(req.body);
    const user = req.body;
    res.json({ message: "1 record inserted" });
  });
  
  router.get("/:id", async function (req, res) {
    console.log("I am id= " + req.params.id);
  
    let dbo = await client.db(DB_NAME);
    let data = await dbo
      .collection(COLLECTION_USER)
      .find({ _id: new ObjectId("" + req.params.id + "") })
      .toArray();
    console.log("data >> ", data);
    res.json(data[0]);
  });
  
  router.put("/:id", async function (req, res) {
    console.log("I am id= " + req.params.id);
    console.log(req.body);
    const user = req.body;
  
    var myquery = { _id: new ObjectId(req.params.id) };
    var newvalues = { $set: req.body };
  
    let dbo = await client.db(DB_NAME);
    let data = await dbo
      .collection(COLLECTION_USER)
      .updateOne(myquery, newvalues);
  
    res.json({ message: "1 record inserted" });
  });
  
  router.delete("/:id", async function (req, res) {
    console.log("I am id= " + req.params.id);
  
    var query = { _id: new ObjectId(req.params.id) };
    const dbo = await client.db(DB_NAME);
  
    let data = await dbo.collection(COLLECTION_USER).deleteOne(query);
  
    console.log("1 document deleted");
    res.json({ message: "1 document deleted" });
  });

  
module.exports = router;