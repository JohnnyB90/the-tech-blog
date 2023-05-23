const router = require('express').Router();
const blogPostRoutes = require('./blogpost-route');
const commentsRoutes = require('./comments-route');
const userRoutes = require('./user-route');

router.use('/blogposts', blogPostRoutes);
router.use('/comments', commentsRoutes);
router.use('/users', userRoutes);

module.exports = router;
