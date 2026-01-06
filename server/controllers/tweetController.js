import * as storage from '../utils/storage.js';

// Get all tweets with author info
export const getAllTweets = async (req, res) => {
  try {
    const tweets = storage.getAllTweets();
    res.json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tweet by ID
export const getTweetById = async (req, res) => {
  try {
    const tweet = storage.getTweetById(req.params.id);
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new tweet
export const createTweet = async (req, res) => {
  try {
    const { text, image, authorId } = req.body;

    if (!text || !authorId) {
      return res.status(400).json({ error: 'Text and authorId are required' });
    }

    const tweet = storage.createTweet({ text, image, authorId });
    res.status(201).json(tweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete tweet
export const deleteTweet = async (req, res) => {
  try {
    const deleted = storage.deleteTweet(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Tweet not found' });
    }
    res.json({ message: 'Tweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like/Unlike tweet
export const likeTweet = async (req, res) => {
  try {
    const { userId } = req.body;
    const tweet = storage.likeTweet(req.params.id, userId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retweet/Unretweet
export const retweetTweet = async (req, res) => {
  try {
    const { userId } = req.body;
    const tweet = storage.retweetTweet(req.params.id, userId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bookmark/Unbookmark
export const bookmarkTweet = async (req, res) => {
  try {
    const { userId } = req.body;
    const tweet = storage.bookmarkTweet(req.params.id, userId);

    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
