const mongoose = require('mongoose');

const todoListSchema = mongoose.Schema({
    author :  {
        type : String,
        require : true,
    },
    text : {
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('todoList', todoListSchema);