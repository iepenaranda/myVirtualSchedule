// Index.js: port connection (local, host), connection to MongoDB and calls to controllers (routes)

// import of the needed modules
const express = require("express");
const mongoose = require("mongoose");

// routes (controller) import
const User = require("./routes/user");
const Reminder = require("./routes/reminder");
const Auth = require("./routes/login");

// Express to initialize the server
const app = express();
// The app's uses
app.use(express.json());
app.use("/api/user/", User);
app.use("/api/reminder/", Reminder);
app.use("/api/auth/", Auth);


// 1. Connection to the port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port));
// http://localhost:3001/api/user/newUser
// http://localhost:3001/api/user/login


// 2. Connection to the DB
// mongoose.connect is a promise !
mongoose.connect("mongodb://localhost:27017/virtualschedule", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => console.log("Conexión con MongoDB: ON"))
.catch((err) => console.log("Error al conectar con MongoDB: " + err));