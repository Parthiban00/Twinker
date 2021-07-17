const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    Code: {

        type: String,

    },

    CodeDescription : {
        type: String,

    },
    ValidFrom : {
        type: String,

    },
    ValidTo : {
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



});

const Coupons = mongoose.model('Coupons', TaskSchema);

module.exports=Coupons;
