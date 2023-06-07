const withAuth = require('../utils/auth');
const router = require('express').Router();
const { BlogPost, User, Comments } = require('../models');

// GET login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// GET sign-up page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
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
      include: [{ model: User, as: 'user', attributes: ['email'] }],
    });    
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    res.render('home', { blogPosts, loggedIn: req.session.loggedIn || false });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// GET a single blog post by id
router.get('/blogpost/:id', async (req, res) => {
  console.log("Inside blogpost route");
  console.log("req.params.id: ", req.params.id);
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          as: 'post_comments',
          include: [{ model: User, as: 'user', attributes: ['email'] }],
        },
        { 
          model: User, 
          as: 'user',
          attributes: ['email'] 
        },
      ],
    });
    
    
    console.log(blogPostData);
    if (!blogPostData) {
      res.status(404).json({ message: 'No blog post found with this id!' });
      return;
    }

    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);
    res.render('single-post', {
      ...blogPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).json(err);
  }
});


// GET create new blog post page
router.get('/dashboard/new', withAuth, (req, res) => {
  res.render('new-post', { loggedIn: req.session.loggedIn });
});

// GET Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session);
  try {
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: ['email'] }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));
    const isDashboard = true; // Define the isDashboard variable
    res.render('dashboard', { blogPosts, isDashboard, loggedIn: true });
    console.log(isDashboard); // Log the value of isDashboard
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
