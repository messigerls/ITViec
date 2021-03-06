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
// const now = new Date();
// const timeServing = `${now.getFullYear()}-${now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()} ${now.toTimeString().substring(0, 8)}`;
// console.log(timeServing)
// const arr1 = [1, 2, 3];
// const arr2 = [3, 4, 5, 6, 1];
// const arr3 = [5, 7, 8];
// console.log(Array.from(new Set(arr1.concat(arr2).concat(arr3))))