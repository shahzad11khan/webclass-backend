// import express from 'express'; // moduler syntax
const express = require('express'); // commonjs syntax
const mongoose = require('mongoose');
const {UserCollection} = require('./models/Users.Collection');
const app = express();
const PORT = 6166;
// express().get('path',()=>{})
// database connection
// mongoose.connect('url').then(message).catch(error)
app.use(express.json());
const url = "mongodb://localhost:27017";
const db_name = "webclass";

mongoose.connect(`${url}/${db_name}`).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("Error in database connection", err);
});

// get
// app.get('/',(req,res)=>{
//     console.log("Root Url Is Hit..!")
//     res.send('Hello from ExpressJS');
// })
app.get('/', async (req, res) => {
    try {
        const GetAllUsers = await UserCollection.find();
        res.status(200).json({ "Data:": GetAllUsers, "Message": "Data Fetched Successfully" });

    } catch (error) {
        console.log("Error in get /", error);
    }
})

// post
// app.post('/', (req, res) => {
//     console.log("Post Request Is Hit..!")
//     res.send("Hello from post")
// })
app.post('/',async (req, res) => {
try {
    console.log(req.body);
    const NewUserCreate = await UserCollection({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await NewUserCreate.save();
    res.status(201).json({ "Data:": NewUserCreate, "Message": "Data Inserted Successfully" });
} catch (error) {
    console.log("Error in post /", error);
}
})
// put
app.put('/', (req, res) => {
    console.log("Put Request Is Hit..!")
    res.send("Hello from put")
})
// delete
app.delete('/', (req, res) => {
    console.log("Delete Request Is Hit..!")
    res.send("Hello from delete")
})
// not found
app.use((req, res) => {
    res.status(404).send("404 Not Found")
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// express().listen(3000,()=>{
//     console.log('Server is running on port 3000');
// })