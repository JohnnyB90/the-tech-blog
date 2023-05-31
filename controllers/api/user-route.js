const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// LOGIN a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again!' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password, userData.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// CREATE a new user
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    req.session.user_id = userData.id;
    req.session.loggedIn = true;
    req.session.save(() => {

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGOUT a user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;