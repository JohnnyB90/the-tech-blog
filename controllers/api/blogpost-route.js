const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.userId,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a blog post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a blog post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
  const blogPostData = await BlogPost.destroy({
  where: {
  id: req.params.id,
  user_id: req.session.user_id,
  },
  });
  if (!blogPostData) {
    res.status(404).json({ message: 'No blog post found with this id!' });
    return;
  }
  
  res.status(200).json(blogPostData);
} catch (err) {
  res.status(500).json(err);
  }
  });
  
  module.exports = router;