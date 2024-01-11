const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
// This section will help you get a list of all the records.
recordRoutes.route("/record/:minLat/:maxLat/:minLng/:maxLng").get(async function (req, response) {
    let db_connect = dbo.getDb();
    let boundingBox = {minLat: parseFloat(req.params.minLat), maxLat: parseFloat(req.params.maxLat), minLng: parseFloat(req.params.minLng), maxLng: parseFloat(req.params.maxLng)}
    console.log(boundingBox)
    db_connect
      .collection("earlyons")
      .find({lat: {$gt: boundingBox.minLat, $lt: boundingBox.maxLat}, lng: {$gt: boundingBox.minLng, $lt: boundingBox.maxLng}})
      .toArray()
      .then((data) => {
        console.log(data);
        response.json(data);
      }).catch((err) => {console.log(err)});
  
  });
 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 console.log(req.params.id)
 db_connect
   .collection("earlyons")
   .findOne({_id: new ObjectId(req.params.id)})
   .then((data) => {
     console.log(data);
     res.json(data);
   }).catch((err) => {console.log(err)});

});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   addr: req.body.addr,
   tel: req.body.tel,
   lat: req.body.lat,
   lng: req.body.lng,
   url: req.body.url,
 };
 db_connect.collection("earlyons").insertOne(myobj).then((data) => {response.json(data)}).catch((err) => {console.log(err)});
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    name: req.body.name,
    addr: req.body.addr,
    tel: req.body.tel,
    lat: req.body.lat,
    lng: req.body.lng,
    url: req.body.url,
   },
 };
 db_connect
   .collection("earlyons")
   .updateOne(myquery, newvalues)
   .then((data) => {
    console.log("1 document updated");
    response.json(data)})
    .catch((err) => {console.log(err)});
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: new ObjectId(req.params.id) };
 db_connect.collection("earlyons").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;