const express = require("express");
const router = express.Router();
const authenticatToken = require('../middleware/auth');
const ToDoListController = require('../controllers/todoList.controller');


/**
 * @swagger
 * /api/todo/tasks:
 *  get:
 *      description: Use a request to get task of autorized user
 *      tags:
 *        - Tasks
 *      parameters:
 *      - name : authorization
 *        in : header
 *        type : string
 *        required : true 
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/tasks", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const task = await ToDoListController.getTaskById(decodedtoken.id);
        res.status(200).json({ message: `Tasks of ${decodedtoken.user}`, task });
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
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true 
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
 *          - title
 *          - isCompleted
 *      properties:
 *          title: 
 *              type: string
 *          isCompleted: 
 *              type: boolean
 */
router.post("/create", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const savedTasks = await ToDoListController.addTask(decodedtoken.id, req.body.title, req.body.isCompleted);
        res.status(200).json({ message: 'Task added!', savedTasks });

    } catch (err) {
        console.log({ message: err })
    }
})

/**
 * @swagger
 * /api/todo/edit/{title}:
 *  patch:
 *      description: Edit task in the list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true
 *        - in : path
 *          name : title
 *          required : true 
 *        - in: body
 *          name: Task
 *          required: true
 *          description: write title of task need to change anf content to put instead of previous one
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - isCompleted
 *      properties:
 *          isCompleted: 
 *              type: boolean
 */
router.patch("/edit/:title", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]));
        const task = await ToDoListController.editTask(decodedtoken.id,req.params.title, req.body.isCompleted)
        res.status(200).json({ message: `Task of ${decodedtoken.user} edited`, task });
    } catch (err) {
        console.log({ message: err });
    }

})

/**
 * @swagger
 * /api/todo/delete/{title}:
 *  delete:
 *      description: Delete task of the user
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true
 *        - in : path
 *          name : title
 *          required : true  
 *        - in: body
 *          name: Task
 *          required: true
 *          description: write title of task need to change anf content to put instead of previous one
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - title
 *      properties:
 *          title: 
 *              type: string
 */
router.delete("/delete/:title", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]));
        const task = await ToDoListController.deleteTask(decodedtoken.id,req.params.title)
        res.status(200).json({ message: `Task of ${decodedtoken.user} deleted!`, task });
    } catch (err) {
        console.log({ message: err })
    }
})

module.exports = router;