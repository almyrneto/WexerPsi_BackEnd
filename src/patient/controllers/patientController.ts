import { Request, Response } from 'express';
import UserModel from '../../models/userModel';
import PatientModel, { Patient } from '../../models/PatientModel';

class PatientController {
    // Cria um novo paciente atrelado a um usuário
    static async createPatient(req: Request, res: Response) {
        try {
            const { name, age } = req.body;
            const userId = req.params.userId; // ID do usuário ao qual o paciente será atrelado

            // Verifica se o usuário existe
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Cria um novo paciente
            const newPatient: Patient = new PatientModel({
                name,
                age,
                userId,
            });

            await newPatient.save();

            return res.status(201).json({ message: 'Paciente criado com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar paciente:', error);
            return res.status(500).json({ message: 'Erro ao criar paciente.' });
        }
    }

    // Lista todos os pacientes de um usuário
    static async getAllPatientsByUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId; // ID do usuário

            // Busca todos os pacientes atrelados ao usuário
            const patients = await PatientModel.find({ userId });

            return res.status(200).json(patients);
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error);
            return res.status(500).json({ message: 'Erro ao buscar pacientes.' });
        }
    }

    // Obtém informações de um paciente pelo ID
    static async getPatientById(req: Request, res: Response) {
        try {
            const userId = req.params.userId; // ID do usuário
            const patientId = req.params.patientId; // ID do paciente

            // Busca o paciente pelo ID e verifica se está atrelado ao usuário
            const patient = await PatientModel.findOne({ _id: patientId, userId });

            if (!patient) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            return res.status(200).json(patient);
        } catch (error) {
            console.error('Erro ao buscar paciente:', error);
            return res.status(500).json({ message: 'Erro ao buscar paciente.' });
        }
    }

    // Atualiza as informações de um paciente
    static async updatePatient(req: Request, res: Response) {
        try {
            const userId = req.params.userId; // ID do usuário
            const patientId = req.params.patientId; // ID do paciente
            const { name, age } = req.body;

            // Verifica se o paciente existe e está atrelado ao usuário
            const patient = await PatientModel.findOne({ _id: patientId, userId });

            if (!patient) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            // Atualiza as informações do paciente
            patient.name = name;
            patient.age = age;

            await patient.save();

            return res.status(200).json({ message: 'Paciente atualizado com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar paciente:', error);
            return res.status(500).json({ message: 'Erro ao atualizar paciente.' });
        }
    }
}

export default PatientController;
