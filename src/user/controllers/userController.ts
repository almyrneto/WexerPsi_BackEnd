import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, { User } from '../../models/userModel';

const saltRounds = 10; // Número de rounds para o salt do bcrypt
const jwtSecret = 'secreto'; // Chave secreta para assinar o token JWT

class UserController {
    static deleteUser(arg0: string, deleteUser: any) {
        throw new Error('Method not implemented.');
    }
    static updateUser(arg0: string, updateUser: any) {
        throw new Error('Method not implemented.');
    }
    static async createUser(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            // Verifica se o usuário já existe com base no email
            const existingUser = await UserModel.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe com este email.' });
            }

            // Hash da senha do usuário
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Cria um novo usuário
            const newUser: User = new UserModel({
                username,
                email,
                password: hashedPassword,
            });

            await newUser.save();

            return res.status(201).json({ message: 'Usuário criado com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ message: 'Erro ao criar usuário.' });
        }
    }

    // Função para autenticar um usuário
    static async authenticateUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Procura o usuário com base no email
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Verifica a senha usando bcrypt
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Senha incorreta.' });
            }

            // Cria um token JWT
            const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

            return res.status(200).json({ token });
        } catch (error) {
            console.error('Erro na autenticação:', error);
            return res.status(500).json({ message: 'Erro na autenticação.' });
        }
    }
}

export default UserController;
