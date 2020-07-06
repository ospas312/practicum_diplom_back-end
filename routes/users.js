const router = require('express').Router();
const { getUserById } = require('../controllers/users');
const { cookieDelete } = require('../controllers/users');


router.get('/users/me', getUserById);
router.delete('/logout', cookieDelete);

module.exports = router;
