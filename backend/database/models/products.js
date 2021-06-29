const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    RestaurantId: {

        type: mongoose.Types.ObjectId,
        required:true

    },

    MenuId: {

        type: mongoose.Types.ObjectId,
        required:true

    },

    ProductName : {
        type: String,

    },
    Description : {
        type: String,

    },
    Price : {
        type: Number,

    },
    Size : {
        type: String,

    },
    ItemCount : {
        type: Number,

    },
    Amount : {
        type: Number,

    },
    AvailableTime : {
        type: String,

    },
    AvailableStatus : {
        type: Boolean,

    },
    AvailableDays : {
        type: String,

    },
    ActiveYn : {
        type: Boolean,

    },

    DeleteYn : {
        type: Boolean,

    },
    Offer : {
      type: Number,

  },
  OfferPrice:{
    type:Number
  },
  OfferDescription:{
    type:String
  },
  Commission:{
    type:Number
  },
  Suggestion:{
    type:Boolean
  },
  Sort:{
    type:Number
  },

  ActualAmount:{
    type:Number
  }


});

const Products = mongoose.model('Products', TaskSchema);

module.exports=Products;
