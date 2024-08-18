import express from 'express';
import {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    getUsers,
    updateUser,
    sendAlertsToUsers,
    deleteUser,
    getUser,
} from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/users', getUsers)
router.get('/:id', getUser)
router.post('/alert', sendAlertsToUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
