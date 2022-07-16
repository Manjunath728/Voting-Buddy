require("dotenv").config({ path: "./config.env" });

const express = require("express");
const connectDB = require("./config/db");

// conect db

connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));

const server = app.listen(PORT, () => {
  console.log(`server is running in http://localhost:${PORT}`);
});

process.on("unhandledRejection",(err,promise)=>{
    console.log(`logged error:${err}`);
    server.close(()=>process.exit(1));
})