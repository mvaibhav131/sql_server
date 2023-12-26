const express = require("express");
const dotenv=require("dotenv");
const cors= require("cors");
const connection = require("./db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const meterRoutes = require('./routes/meterRoutes');
// setup the server

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
// set up the body parser for handling form data
// submitted by the user
app.use(bodyParser.urlencoded({ extended: false }));
// set up the session

app.get("/",(req,res) => {
    res.send("Hellow Welcome to Express!");
});
app.use("/api",meterRoutes);

// setup config path
// dotenv.config({path:"config/config.env"}); // for env but path is inside the config env
dotenv.config(); // for single env files in env path

// start the server and listen the request

app.listen(process.env.PORT,async() => {
    try{
      await connection();
      console.log(`Server is started ${process.env.PORT}`);
    }
    catch(e){
    console.log("error",e);
    }
});