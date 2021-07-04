
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    Token: {

        type: String,

    },





});

const Tokens = mongoose.model('Tokens', TaskSchema);

module.exports=Tokens;
