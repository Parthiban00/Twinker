const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    Category: {

        type: String,

    },

    ActiveYn : {
        type: String,

    },
    DeleteYn : {
        type: String,

    },
    Type:{
      type:String
    }



});

const ShopCategory = mongoose.model('shopCategories', TaskSchema);

module.exports=ShopCategory;
