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


client.connect().then(() => {async () => {console.log("Connected to the database");}})

app.use(cors()); // enable cors
app.use(morgan("dev")); // enable morgan
app.use(express.json()); // enable json
app.use(express.urlencoded({ extended: true })); // enable urlencoded


const app = express(); // create express instance
const port = 3000; // port number  