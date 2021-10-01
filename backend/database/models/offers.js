const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    Code: {

        type: String,

    },

    CodeDescription : {
        type: String,

    },
    ActiveYn : {
        type: Boolean,

    },
    DeleteYn : {
        type: Boolean,

    },
    Discount : {
      type: Number,

  },
  RestaurantId:{
    type:String,
  },
  RestaurantName:{
    type:String,
  },
  MinimumAmount:{
    type:Number,
  },
  Discount:{
    type:Number
  },
  ShortDescription:{
    type:String
  },
  ImageUrl:{
    type:String
  }



});

const Offers = mongoose.model('offers', TaskSchema);

module.exports=Offers;
