const express = require('express');
const mongoose = require('mongoose');
const { UsersCollection } = require('./Collections/Users.Collection');
const app = express();
const PORT = 3000;
// data base connection
mongoose.connect('mongodb://localhost:27017/webclass')
    .then(console.log("Database connected successfully"))
    .catch((err) => console.log(err));

    // middle ware 
    app.use(express.json());
// app.get()  red
// app.post() create
// app.put()  update
// app.delete() delete

app.get('/getAllUsers', async (request, response) => {
    try {
        const getAllUsers = await UsersCollection.find();
        response.json(getAllUsers);
    } catch (error) {
        console.log(error);

    }
})
// http://localhost:3000/getAllUsers

app.post('/createUser', async (request, response) => {
    // console.log('Create user request received');
    // response.send('Create user');
    console.log(request.body);
    try {
        const newUserCreated = await UsersCollection.create({
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        });
        response.json(newUserCreated);
    } catch (error) {
        console.log(error);
    }
})
// http://localhost:3000/createUser

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));