const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    RestaurantId: {

        type: mongoose.Types.ObjectId,
        required:true
        
    },
          
    MenuName : {
        type: String,
       
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

const MainMenu = mongoose.model('MainMenu', TaskSchema);

module.exports=MainMenu;