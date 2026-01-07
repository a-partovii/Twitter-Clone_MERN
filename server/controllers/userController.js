import * as storage from '../utils/storage.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = storage.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = storage.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const user = storage.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = storage.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const targetUserId = req.params.id;

    const result = storage.followUser(currentUserId, targetUserId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const { currentUserId } = req.body;
    const targetUserId = req.params.id;

    const result = storage.unfollowUser(currentUserId, targetUserId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
