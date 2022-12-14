require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors=require("cors")


// conect db

connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/admin/", require("./routes/AdminRoutes"));
app.use("/api/userauth/", require("./routes/UserAuth"));
app.use("/api/administrator", require("./routes/AdministratorUser"));
app.use("/api/user", require("./routes/UserVote"));


// error handler should be last middleware
app.use(errorHandler)

const server = app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});

process.on("unhandledRejection",(err,promise)=>{
    console.log(`logged error:${err}`);
    server.close(()=>process.exit(1));
})