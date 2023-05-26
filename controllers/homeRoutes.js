const withAuth = require('../utils/auth');
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');


// GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// GET sign-up page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET logout
router.get('/logout', (req, res) => {
  // Clear the session and redirect to the homepage or any desired page
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User, attributes: ['email'] }],
    });
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    res.render('home', { blogPosts, loggedIn: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


// GET a single blog post by id
router.get('/blog/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['email'] }],
        },
        { model: User, attributes: ['email'] },
      ],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });

    res.render('blogpost.card', {
      ...blogPost,
      loggedIn: req.session.loggedIn,
    });
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
      include: [{ model: User, attributes: ['email'] }],
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

// GET Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

    res.render('dashboard', {
      blogPosts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
