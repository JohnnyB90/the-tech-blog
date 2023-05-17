const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// LOGIN a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again!' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a new user
router.post('/signup', async (req, res) => {
  try {
    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });

    // Set the user ID on the session
    req.session.user_id = user.id;

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// LOGOUT a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.redirect('/home');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
