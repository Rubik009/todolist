const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    _id: {
        type : Number,
        require : true
    },
    username :  {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
})

module.exports = mongoose.model('user', UsersSchema);