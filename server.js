require("dotenv").config({ path: "./config.env" });
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./server/middleware/error')
require('./server/config/mongoos.config'); 
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
require('./server/routes/community.route')(app);
require('./server/routes/private')(app);
// app.use("/api/private", require("./server/controllers/private"));

app.use(errorHandler);
const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

process.on("unhandledRejection",(err,promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})