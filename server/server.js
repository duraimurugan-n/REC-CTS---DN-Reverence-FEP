const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.route.js");
const logoutRouter = require("./routes/logout.route.js");
const preference = require("./routes/preference.route.js");
const task = require("./routes/task.route.js");
const helmet = require("helmet");

dotenv.config();

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT;

//Adding Middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    credentials: true, 
    origin: [process.env.CORS_ACCEPTED_ORIGIN_1]
}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

//Connecting Database 
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.once('open', () => {
    console.log("Connection Established Successfully");
});

//Setting Port Number
const appServer = app.listen(port, () => {
    console.log(`Server is active on port : ${port}`);
});


app.get('/', (req, res) => {
    res.send("Test");
});

//Setting Routers
app.use("/user", userRouter);
app.use("/logout", logoutRouter);
app.use('/preference',preference);
app.use('/task',task);

module.exports = {server: app, appServer};