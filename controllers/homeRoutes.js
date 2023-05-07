
const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');

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
  

  module.exports = router;
