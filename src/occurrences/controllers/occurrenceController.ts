import { Request, Response } from 'express';
import TimelineModel from '../../models/timelineModel';
import OccurrenceModel, { Occurrence } from '../../models/OccurrenceModel';

class OccurrenceController {
    // Cria uma nova ocorrência atrelada a uma timeline
    static async createOccurrence(req: Request, res: Response) {
        try {
            const { date, description } = req.body;
            const timelineId = req.params.timelineId; // ID da timeline à qual a ocorrência será atrelada

            // Verifica se a timeline existe
            const timeline = await TimelineModel.findById(timelineId);

            if (!timeline) {
                return res.status(404).json({ message: 'Timeline não encontrada.' });
            }

            // Cria uma nova ocorrência
            const newOccurrence: Occurrence = new OccurrenceModel({
                date,
                description,
                timelineId,
            });

            await newOccurrence.save();

            return res.status(201).json({ message: 'Ocorrência criada com sucesso.' });
        } catch (error) {
            console.error('Erro ao criar ocorrência:', error);
            return res.status(500).json({ message: 'Erro ao criar ocorrência.' });
        }
    }

    // Lista todas as ocorrências de uma timeline
    static async getAllOccurrencesByTimeline(req: Request, res: Response) {
        try {
            const timelineId = req.params.timelineId; // ID da timeline

            // Busca todas as ocorrências atreladas à timeline
            const occurrences = await OccurrenceModel.find({ timelineId });

            return res.status(200).json(occurrences);
        } catch (error) {
            console.error('Erro ao buscar ocorrências:', error);
            return res.status(500).json({ message: 'Erro ao buscar ocorrências.' });
        }
    }

    // Obtém informações de uma ocorrência pelo ID
    static async getOccurrenceById(req: Request, res: Response) {
        try {
            const timelineId = req.params.timelineId; // ID da timeline
            const occurrenceId = req.params.occurrenceId; // ID da ocorrência

            // Busca a ocorrência pelo ID e verifica se está atrelada à timeline
            const occurrence = await OccurrenceModel.findOne({ _id: occurrenceId, timelineId });

            if (!occurrence) {
                return res.status(404).json({ message: 'Ocorrência não encontrada.' });
            }

            return res.status(200).json(occurrence);
        } catch (error) {
            console.error('Erro ao buscar ocorrência:', error);
            return res.status(500).json({ message: 'Erro ao buscar ocorrência.' });
        }
    }

    // Atualiza as informações de uma ocorrência
    static async updateOccurrence(req: Request, res: Response) {
        try {
            const timelineId = req.params.timelineId; // ID da timeline
            const occurrenceId = req.params.occurrenceId; // ID da ocorrência
            const { date, description } = req.body;

            // Verifica se a ocorrência existe e está atrelada à timeline
            const occurrence = await OccurrenceModel.findOne({ _id: occurrenceId, timelineId });

            if (!occurrence) {
                return res.status(404).json({ message: 'Ocorrência não encontrada.' });
            }

            // Atualiza as informações da ocorrência
            occurrence.date = date;
            occurrence.description = description;

            await occurrence.save();

            return res.status(200).json({ message: 'Ocorrência atualizada com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar ocorrência:', error);
            return res.status(500).json({ message: 'Erro ao atualizar ocorrência.' });
        }
    }
}

export default OccurrenceController;
