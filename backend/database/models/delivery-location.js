const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    UserId: {

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
    ActiveYn : {
        type: Boolean,
       
    },
    DeleteYn : {
        type: Boolean,
       
    },
    Recent : {
        type: String,
       
    },
    UserType : {
        type: String,
       
    },
    
    
});

const DeliveryLocation = mongoose.model('DeliveryLocation', TaskSchema);

module.exports=DeliveryLocation;