const { Router } = require('express');
const router = Router();
const { getUsers, createUser, getUsersById, updatedUser,  deleteUser} = require('../controllers/controller')

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.put('/users/:id', updatedUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
