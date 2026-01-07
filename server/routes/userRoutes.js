import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  followUser,
  unfollowUser
} from '../controllers/userController.js';

const router = express.Router();

// GET /api/users - Get all users
router.get('/', getAllUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

// POST /api/users - Create new user
router.post('/', createUser);

// PUT /api/users/:id - Update user
router.put('/:id', updateUser);

// POST /api/users/:id/follow - Follow a user
router.post('/:id/follow', followUser);

// POST /api/users/:id/unfollow - Unfollow a user
router.post('/:id/unfollow', unfollowUser);

export default router;
