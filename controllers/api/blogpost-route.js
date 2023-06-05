const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET blog post by id to edit
router.get('/:id/edit', withAuth, async (req, res) => {
  try {
    console.log("Before findOne");
    const blogPostData = await BlogPost.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }
    const blogPost = blogPostData.get({ plain: true });
    res.render('editpost', { blogPost });
  } catch (err) {
    res.status(500).json(err);
  }
});



// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    // Fetch the created blog post with the generated ID
    const createdPost = await BlogPost.findOne({
      where: {
        id: newBlogPost.id,
      },
      include: [{ model: User, as: 'user', attributes: ['email'] }],
    });

    res.status(200).json(createdPost);
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
          user_id: req.session.user_id,
        },
      }
    );

    if (updatedBlogPost > 0) {
      res.status(200).json({ message: 'Blog post updated successfully.' });
    } else {
      res.status(404).json({ message: 'No blog post found with this id owned by the current user.' });
    }
  } catch (err) {
    res.status(500).json(err);
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