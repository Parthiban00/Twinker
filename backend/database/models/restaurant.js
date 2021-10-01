const { DH_NOT_SUITABLE_GENERATOR } = require('constants');
const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    RestaurantName: {

        type: String,

    },

    RestaurantNickName : {
        type: String,

    },
    Address : {
        type: String,

    },
    MobileNo : {
        type: String,

    },
    Password : {
        type: String,

    },
    Email : {
        type: String,

    },

    RestaurantType : {
        type: String,

    },
    RestaurantStatus : {
        type: String,

    },
    OrderStatus : {
        type: Boolean,

    },
    DineinStatus : {
        type: String,

    },
    AvailableDays : {
        type: String,

    },
    OpenTime : {
        type: String,

    },
    CloseTime : {
        type: String,

    },
    UserType : {
        type: String,

    },


    ActiveYn : {
        type: Boolean,

    },

    DeleteYn : {
        type: Boolean,

    },
    UserId:{
        type:mongoose.Types.ObjectId,
    },
    Offer:{
      type:Boolean
    },
    AvailableStatus:{
      type:Boolean
    },
    OfferDescription:{
      type:String
    },
    Latitude:{
      type:Number
    },

    Longitude:{
      type:Number
    },
    Sort:{
      type:Number
    },
    Type:{
      type:String
    },
    Charges:{
      type:Number
    },
    ImageUrl:{
type:String
    },
    Category:{
      type:String
    },
    CategoryId:{
      type:String
    }



});

const Restaurant = mongoose.model('Restaurant', TaskSchema);

module.exports=Restaurant;
