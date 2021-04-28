const { Router } = require('express');
const router = Router();
const { getUsers, createUser, getUsersById, updatedUser,  deleteUser, getUsersByUsername} = require('../controllers/controller')

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.put('/users/:id', updatedUser);
router.delete('/users/:id', deleteUser);

router.post('/sign-up', createUser);
router.get('/sign-in/:username', getUsersByUsername);

module.exports = router;
