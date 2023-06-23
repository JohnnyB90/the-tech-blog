const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new comment
router.post('/newcomment', withAuth, async (req, res) => {
  console.log('req.body:', req.body);
  console.log('req.body.blogPost_id:', req.body.blogPost_id);

  try {
    const newComment = await Comments.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blogpost_id: req.body.blogPost_id
    });
    res.render('single-post', {
      comment: newComment,
      loggedIn: req.session.loggedIn,
    });  
  } catch (err) {
    res.status(400).json(err);
    console.log('Error:', err);
  }
});

// UPDATE a comment by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comments.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
