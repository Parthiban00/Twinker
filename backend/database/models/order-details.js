const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    OrderId: {

        type: String,

    },

    UserId: {

        type: mongoose.Types.ObjectId,

    },

    UserName : {
        type: String,

    },
    RestaurantId : {
        type: mongoose.Types.ObjectId,

    },
    RestaurantName : {
        type: String,

    },
    ItemTotal : {
        type: Number,

    },
    DeliveryPartnerFee : {
        type: Number,

    },
    TaxesAndCharges : {
        type: Number,

    },
    TotalAmount : {
        type: Number,

    },
    ActiveYn : {
        type: Boolean,

    },
    DeleteYn : {
        type: Boolean,

    },
    Status : {
        type: String,

    },
    CreatedDate : {
        type: Object,

    },
    CreatedBy : {
        type: String,

    },
    ItemCount : {
        type: Number,

    },
    MobileNo : {
        type: String,

    },
    Address : {
        type: String,

    },
    ItemDetails : {
        type: Array,

    },
    DeliveryPartnerDetails:{
        type:Object,

    },
    ModifiedBy:{
        type:Array
    },
    ModifiedDate:{
        type:Date
    },
    CreatedBy:{
type:Array
    },
    CreatedDate:{
        type:String
    },
    DeliveryPartnerStatus:{
      type:String
    },
    ActualAmount:{
      type:Number
    },
    CreatedTime:{
      type:String
    },
    Discount:{
      type:Number
    },
    DiscountDescritpion:{
      type:String
    },
    DiscountCode:{
      type:String
    },
    Latitude:{
      type:Number
    },
    Longitude:{
      type:Number
    }





});

const OrderDetails = mongoose.model('OrderDetails', TaskSchema,'orderdetails');

module.exports=OrderDetails;
