import { Request, Response } from 'express';
import UserModel from '../../models/userModel';
import PatientModel from '../../models/PatientModel';
import TimelineModel, { Timeline } from '../../models/timelineModel';

class TimelineController {
    // Cria uma nova timeline atrelada a um paciente
    static async createTimeline(req: Request, res: Response) {
        try {
            const { date, description } = req.body;
            const patientId = req.params.patientId; // ID do paciente ao qual a timeline será atrelada

            // Verifica se o paciente existe
            const patient = await PatientModel.findById(patientId);

            if (!patient) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            // Cria uma nova timeline
            const newTimeline: Timeline = new TimelineModel({
                date,
                description,
                patientId,
            });

            await newTimeline.save();

            return res.status(201).json({ message: 'Timeline criada com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar timeline:', error);
            return res.status(500).json({ message: 'Erro ao criar timeline.' });
        }
    }

    // Lista todas as timelines de um paciente
    static async getAllTimelinesByPatient(req: Request, res: Response) {
        try {
            const patientId = req.params.patientId; // ID do paciente

            // Busca todas as timelines atreladas ao paciente
            const timelines = await TimelineModel.find({ patientId });

            return res.status(200).json(timelines);
        } catch (error) {
            console.error('Erro ao buscar timelines:', error);
            return res.status(500).json({ message: 'Erro ao buscar timelines.' });
        }
    }

    // Obtém informações de uma timeline pelo ID
    static async getTimelineById(req: Request, res: Response) {
        try {
            const patientId = req.params.patientId; // ID do paciente
            const timelineId = req.params.timelineId; // ID da timeline

            // Busca a timeline pelo ID e verifica se está atrelada ao paciente
            const timeline = await TimelineModel.findOne({ _id: timelineId, patientId });

            if (!timeline) {
                return res.status(404).json({ message: 'Timeline não encontrada.' });
            }

            return res.status(200).json(timeline);
        } catch (error) {
            console.error('Erro ao buscar timeline:', error);
            return res.status(500).json({ message: 'Erro ao buscar timeline.' });
        }
    }

    // Atualiza as informações de uma timeline
    static async updateTimeline(req: Request, res: Response) {
        try {
            const patientId = req.params.patientId; // ID do paciente
            const timelineId = req.params.timelineId; // ID da timeline
            const { date, description } = req.body;

            // Verifica se a timeline existe e está atrelada ao paciente
            const timeline = await TimelineModel.findOne({ _id: timelineId, patientId });

            if (!timeline) {
                return res.status(404).json({ message: 'Timeline não encontrada.' });
            }

            // Atualiza as informações da timeline
            timeline.date = date;
            timeline.description = description;

            await timeline.save();

            return res.status(200).json({ message: 'Timeline atualizada com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar timeline:', error);
            return res.status(500).json({ message: 'Erro ao atualizar timeline.' });
        }
    }
}

export default TimelineController;
