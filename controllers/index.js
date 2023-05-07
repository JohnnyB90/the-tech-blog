const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const dashBoard = require('./dashBoardRoute');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/', dashBoard);

module.exports = router;
