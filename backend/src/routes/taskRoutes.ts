import express, { RequestHandler } from 'express';
import { Task, ITask } from '../models/Task';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

interface TaskParams {
  id: string;
}

interface AuthRequest extends express.Request {
  userId?: string;
}

const getTasks: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTask: RequestHandler<TaskParams> = async (req: AuthRequest, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createTask: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const newTask: ITask = new Task({
      ...req.body,
      user: req.userId
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

const updateTask: RequestHandler<TaskParams> = async (req: AuthRequest, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
};

const deleteTask: RequestHandler<TaskParams> = async (req: AuthRequest, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task' });
  }
};

// Apply auth middleware to all routes
router.use(authMiddleware);

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;