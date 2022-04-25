const mongoose = require('mongoose');

const RolesSchema = mongoose.Schema({
    value :  {
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('role', RolesSchema);