const TodoList = require('../models/todoList.model');

class ToDoListController {
    async getTasks() {
        const tasks = await TodoList.find();
        return tasks;
    }
    async getTaskByName(name) {
        const task = await TodoList.findOne({ author: name });
        return task;
    }
    async addTask(name, taskMessage) {
        const task = new TodoList({
            author: name,
            text: taskMessage,
        })
        const savedTasks = task.save();
        return savedTasks;
    }
    async deleteTask(name) {
        const task = await TodoList.deleteOne({ author: name });
        return task;
    }
    async editTask(name, taskMessage){
        const task = await TodoList.updateOne({ author: name }, { $set: { text: taskMessage } });
        return task;
    }
}

module.exports = new ToDoListController();