const router = require('express').Router();
const {
  getReactions,
  getSingleReaction,
  createReaction,
} = require('../../controllers/reactionController');

// /api/reactions
router.route('/').get(getReactions).post(createReaction);

// /api/reactions/:reactionId
router.route('/:reactionId').get(getSingleReaction);

module.exports = router;
