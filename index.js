
const express = require("express")
const app = express();
const port = 8080;
const mongoose = require('mongoose')
const userRoutes = require('./views/userRoutes');

app.use(express.json());
app.use(userRoutes);

const uri = "mongodb+srv://ramkumar:334300@cluster0.ayyne.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("DB connection successful");
}).catch(()=>{
    console.log("DB Connection fails ")
})
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})