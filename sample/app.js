require("dotenv").config({ path: "./config.env" });
const mongoose=require("mongoose");
const Election = require("../models/Election");



mongoose.connect("mongodb://localhost:27017/votingBuddy",()=>{console.log("Db conected");}, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
async function dbdb(){
    try {
        const EleOne = await Election.findByIdAndUpdate("62d9821f6f198228068e9096",{
            voter: [
                {
                  voterName: "manju",
                  acessKey: "abc",
                  passKey: "abc",
                  email: "bmanjhnu@gmail.com",
                },
                {
                  voterName: "ullas",
                  acessKey: "abcd",
                  passKey: "abcd",
                  email: "bmanjhnu@gmail.com",
                },
              ]
          })
          console.log(EleOne);
          
    } catch (error) {
        console.log(error.message);
    }
    
}
dbdb()
    

