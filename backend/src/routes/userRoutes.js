import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/user', authenticateUser, getUserProfile);
router.put('/user', authenticateUser, upload.single('avatar'), updateUserProfile);

export default router;

// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const { name, email, bio } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (req.file) {
      // Handle file upload and update avatarUrl
      // You might want to use a cloud storage service like AWS S3 for production
      user.avatarUrl = `/uploads/${req.file.filename}`;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};