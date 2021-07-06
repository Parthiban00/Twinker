const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://127.0.0.1:27017/twinkertest', {useNewUrlParser :true, useUnifiedTopology: true, useFindAndModify: false})
//mongoose.connect('mongodb+srv://Twinker-admin:Parthi12345@cluster0.y4zil.mongodb.net/twinkerprod', {useNewUrlParser :true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connnected"))
    .catch((error) => console.log(error));

module.exports = mongoose;
