const router = require('express').Router();
const { getUserById } = require('../controllers/users');

router.get('/users/me', getUserById);


module.exports = router;
