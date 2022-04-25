const express = require("express");
const router = express.Router();
const TodoList = require('../models/todoList.model');
const ToDoListController = require('../controllers/todoList.controller')

/**
 * @swagger
 * /api/todo:
 *  get:
 *      description: Use a request to get list of tasks
 *      tags:
 *          - Tasks
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/", async (req, res) => {
    try {
        const tasks = await ToDoListController.getTasks();
        res.status(200).json({message : 'List of tasks:',tasks});
    } catch (err) {
        console.log({ message: err })
    }
});

/**
 * @swagger
 * /api/todo/byName/{name}:
 *  get:
 *      description: Use a request to get task by name
 *      tags:
 *        - Tasks
 *      parameters:
 *        - in: path
 *          name: name
 *          requered: true
 *          scheme: 
 *              type: string
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/byName/:name", async (req, res) => {
    try {
        const task = await ToDoListController.getTaskByName(req.params.name);
        res.status(200).json({message: `Task of ${req.params.name}`,task});
    } catch (err) {
        console.log({ message: err })
    }
})

/**
 * @swagger
 * /api/todo/create:
 *  post:
 *      description: Add task to list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: Task
 *          required: true
 *          description: Add object with properties
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response               
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - author
 *          - text
 *      properties:
 *          author: 
 *              type: string
 *          text: 
 *              type: string
 */
router.post("/create", async (req, res) => {
    try {
        const savedTasks = await ToDoListController.addTask(req.body.author, req.body.text);
        res.status(200).json({message : 'Task added!',savedTasks});

    } catch (err) {
        console.log({ message: err })
    }
})

/**
 * @swagger
 * /api/todo/edit/{name}:
 *  put:
 *      description: Edit task in the list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: author
 *          requered: true
 *          scheme: 
 *              type: string
 *          description: write name of author of task need to change
 *        - in: body
 *          name: Task
 *          requered: true
 *          description: Object to change 
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - text
 *      properties:
 *          text: 
 *              type: string
 */ 
router.patch("/edit/:name", async (req, res) => {
    try {
        const task = await ToDoListController.editTask(req.params.name, req.body.text)
        res.status(200).json({message : `Task of ${req.params.name} edited`,task});
    } catch (err) {
        console.log({ message: err });
    }

})

/**
 * @swagger
 * /api/todo/deleteByName/{name}:
 *  delete:
 *      description: Delete task from list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
*        - in: path
 *          name: name
 *          requered: true
 *          scheme: 
 *              type: string
 *          description: put name of person task need to delete
 *      responses:
 *          '200':
 *              description: A succesful response
 */ 
router.delete("/deleteByName/:name", async (req, res) => {
    try {
        const task = await ToDoListController.deleteTask(req.params.name)
        res.status(200).json({message : `Task of ${req.params.name} deleted!`,task});
    } catch (err) {
        console.log({ message: err })
    }
})

module.exports = router;