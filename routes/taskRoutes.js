const router = require('express').Router();
const { getAllTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const verifyToken=require('../middlewares/authMiddleware')


router.get('/all-tasks',verifyToken,getAllTasks);
router.post('/add-task',verifyToken,addTask);
router.put('/update-task/:id',verifyToken,updateTask);
router.delete('/delete-task/:id',verifyToken,deleteTask);

module.exports = router