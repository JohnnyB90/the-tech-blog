const router = require('express').Router();
const apiRoutes = require('./api');
const homeroutes = require('./homeRoutes')
const dashboard = require('./dashBoardRoute')

router.use('/api', apiRoutes);
router.use('/home', homeroutes)
router.use('/dashboard', dashboard)
module.exports = router;
