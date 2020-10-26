require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const route = require("./routers/");
const cloudinary = require("cloudinary");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Http logger
//app.use(morgan("combined"));

app.use(
    session({
        secret: "somesecret",
        resave: false,
        saveUninitialized: false,
    })
);
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});
app.use(express.static(path.join(__dirname, "public")));

//app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));

route(app);
