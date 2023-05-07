const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );

    res.render('homepage', { blogPosts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single blog post by id
router.get('/blog/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['username'] }],
        },
        { model: User, attributes: ['username'] },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render('blog', { ...blogPost, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET create new blog post page
router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

// GET update blog post page
router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render('edit-post', { ...blogPost, loggedIn: req.session.loggedIn });
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