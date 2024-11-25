const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PropertiesReader = require("properties-reader");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

let propertiesPath = path.resolve(__dirname, "fetch-server", "config", "db.properties");
let properties = PropertiesReader(propertiesPath);
let dbPrefix = properties.get("db.prefix");
let dbUser = properties.get("db.user");
let dbPwd = properties.get("db.pwd");
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");

const uri = `${dbPrefix}${dbUser}:${dbPwd}${dbUrl}${dbParams}`; // create uri   // create uri
let client = new MongoClient(uri, { serverApi: ServerApiVersion.v1}); // create mongo client
let db = client.db(dbName); // create db

// Console log MongoDB connection status
client
  .connect()
  .then(async () => {
    console.log("MongoDB connected successfully");

    // Create text index on 'subject' and 'location etc'
    try {
      const lessons = db.collection("lessons");
      const indexResult = await lessons.createIndex({
        subject: "text",
        location: "text",
      });
    } catch (indexError) {
      console.error("Error creating index:", indexError);
    }
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Exit the process if the database connection fails
  });

app.set("json spaces", 3);

// Static file for lesson images with CORS headers
const imagePath = path.resolve(__dirname, "images");
app.use("/images", (req, res, next) => {
  const fileRequested = path.join(imagePath, req.path);
  // Check if the file exists
  fs.access(fileRequested, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, return error message
      res.status(404).json({ error: "Image not found" });
    } else {
      // File exists, serve it with CORS headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.sendFile(fileRequested);
    }
  });
});
// Middleware

app.use(cors()); // enable cors
app.use(morgan("dev")); // enable morgan
app.use(express.json()); // enable json
app.use(express.urlencoded({ extended: true })); // enable urlencoded


const app = express(); // create express instance
const port = 3000; // port number  