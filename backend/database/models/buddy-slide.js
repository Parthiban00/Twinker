const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({



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






});

const BuddySlide = mongoose.model('buddyslides', TaskSchema);

module.exports=BuddySlide;
