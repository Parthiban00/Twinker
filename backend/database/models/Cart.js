const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    CartItemId: {

        type: mongoose.Types.ObjectId,

    },

    RestaurantId: {

        type: mongoose.Types.ObjectId,

    },

    RestaurantName : {
        type: String,

    },
    MenuId : {
        type: mongoose.Types.ObjectId,

    },
    MenuName : {
        type: String,

    },
    ProductId : {
        type: mongoose.Types.ObjectId,

    },
    ProductName : {
        type: String,

    },
    Price : {
        type: Number,

    },
    ItemCount : {
        type: Number,

    },
    Amount : {
        type: Number,

    },
    UserId : {
        type: String,

    },
    UserName : {
        type: String,

    },
    MobileNo : {
        type: String,

    },
    Address : {
        type: String,

    },
    CreatedDate : {
        type: Date,

    },
    CreatedBy : {
        type: mongoose.Types.ObjectId,

    },
    Status : {
        type: String,

    },
    ActiveYn : {
        type: Boolean,

    },
    DeleteYn : {
        type: Boolean,

    },
    ActualPrice:{
      type:Number,
    },
    Offer:{
      type:Number
    },
    OfferDescription:{
      type:String
    },
      Commission:{
      type:Number
    },


  ActualAmount:{
    type:Number
  },
  Description:{
    type:String
  }

});

const Cart = mongoose.model('Cart', TaskSchema,'carts');

module.exports=Cart;
