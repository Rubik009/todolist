const { default: mongoose } = require('mongoose');
const TodoList = require('../models/todoList.model');
class ToDoListController {
    async getTasks() {
        const tasks = await TodoList.find();
        return tasks;
    }
    async getTaskById(id) {
        const task = await TodoList.find({ user_id: id });
        return task;
    }
    async addTask(id, title, isCompleted) {
        const task = new TodoList({
            user_id: id,
            title: title,
            isCompleted: isCompleted,
        })
        const savedTasks = task.save();
        return savedTasks;
    }
    async deleteTask(id, title) {
        const task = await TodoList.deleteOne({ user_id: id, title: title });
        return task;
    }
    async editTask(id, title, isCompleted) {
        const task = await TodoList.updateOne({ user_id: id, title: title }, { $set: { isCompleted: isCompleted } });
        return task;
    }
}

module.exports = new ToDoListController();