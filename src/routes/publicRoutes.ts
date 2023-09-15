import express from 'express';
import UserController from '../user/controllers/userController';

const router = express.Router();

// Rota para criar um usuário
router.post('/signup', UserController.createUser);

// Rota para autenticação (login)
router.post('/login', UserController.authenticateUser);

export default router;
