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
   
    
});

const Products = mongoose.model('Products', TaskSchema);

module.exports=Products;