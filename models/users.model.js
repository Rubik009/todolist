const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username :  {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    roles : [{
        type : String,
        ref : 'Role'
    }]
})

module.exports = mongoose.model('user', UsersSchema);