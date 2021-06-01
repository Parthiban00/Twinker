const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Twinker-admin:Parthi12345@cluster0.y4zil.mongodb.net/twinkertest', {useNewUrlParser :true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connnected"))
    .catch((error) => console.log(error));

module.exports = mongoose;
