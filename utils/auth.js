const withAuth = (req, res, next) => {
  if (req.path === '/' || req.path === '/home') {
    // Allow access to homepage without authentication
    next();
  } else if (!req.session.user_id) {
    // Redirect to login for other routes if not authenticated
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
