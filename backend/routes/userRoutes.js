const express = require('express');
const { registerUser, authUser, allUsers } = require('../controllers/userControllers.js');
const { protect } = require('../middlewares/authMiddleWare.js');

const router = express.Router();

router.post('/', registerUser)
router.post('/login', authUser);
router.get('/', protect, allUsers);

module.exports = router;