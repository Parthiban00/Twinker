const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    Category: {

        type: String,

    },

    ImageUrl : {
        type: String,

    },
    Type : {
      type: String,

  },


    ActiveYn : {
        type: Boolean,

    },

    DeleteYn : {
        type: Boolean,

    },
    RestaurantId:{
      type:String
    },
    RestaurantName:{
      type:String
    },
    AvailableStatus:{
      type:Boolean
    }





});

const Category = mongoose.model('Category', TaskSchema);

module.exports=Category;
