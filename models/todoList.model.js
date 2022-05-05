const mongoose = require('mongoose');

const todoListSchema = mongoose.Schema({
    user_id: {
        type: String,
        ref: 'user'
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('todoList', todoListSchema);