import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const jwtSecret = 'secreto'; // Chave secreta para verificar o token JWT

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verifica se o token é válido
        const decoded = jwt.verify(token, jwtSecret) as CustomJwtPayload;

        // Adiciona o ID do usuário decodificado à solicitação
        req.userId = decoded.userId;

        // Avança para a próxima função de middleware ou rota
        next();
    } catch (error) {
        console.error('Erro na autenticação do token:', error);
        return res.status(401).json({ message: 'Token de autenticação inválido.' });
    }
}
