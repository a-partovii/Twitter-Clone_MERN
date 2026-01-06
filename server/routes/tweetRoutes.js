import express from 'express';
import {
  getAllTweets,
  getTweetById,
  createTweet,
  deleteTweet,
  likeTweet,
  retweetTweet,
  bookmarkTweet
} from '../controllers/tweetController.js';

const router = express.Router();

// GET /api/tweets - Get all tweets
router.get('/', getAllTweets);

// GET /api/tweets/:id - Get tweet by ID
router.get('/:id', getTweetById);

// POST /api/tweets - Create new tweet
router.post('/', createTweet);

// DELETE /api/tweets/:id - Delete tweet
router.delete('/:id', deleteTweet);

// PUT /api/tweets/:id/like - Like/Unlike tweet
router.put('/:id/like', likeTweet);

// PUT /api/tweets/:id/retweet - Retweet/Unretweet
router.put('/:id/retweet', retweetTweet);

// PUT /api/tweets/:id/bookmark - Bookmark/Unbookmark
router.put('/:id/bookmark', bookmarkTweet);

export default router;
