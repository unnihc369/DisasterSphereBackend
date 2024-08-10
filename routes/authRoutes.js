import express from 'express';
import {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    verifyToken,
    getUsers,
    updateUser,
    sendAlertsToUsers,
} from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/users', getUsers)
router.post('/alert', sendAlertsToUsers);
router.put('/:id', updateUser);
router.get('/verify-token', verifyToken);

export default router;
