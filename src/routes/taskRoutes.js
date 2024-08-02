const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskcontroller');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/:id',taskController.getTaskById);
router.get('/filter/:priority/:status',taskController.getFilteredTasks);
router.get('/search',taskController.searchTasks);

module.exports = router;
