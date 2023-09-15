import express from 'express';
import UserController from '../user/controllers/userController';
import PatientController from '../patient/controllers/patientController';
import TimelineController from '../timeline/controller/timelineController';
import OccurrenceController from '../occurrences/controllers/occurrenceController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

// Middleware de autenticação para todas as rotas privadas
router.use(authMiddleware);

// Rotas para usuários
router.put('/users/:userId', UserController.updateUser);
router.delete('/users/:userId', UserController.deleteUser);

// Rotas para pacientes
router.post('/patients', PatientController.createPatient);
router.get('/patients/:userId', PatientController.getAllPatientsByUser);
router.get('/patients/:userId/:patientId', PatientController.getPatientById);
router.put('/patients/:userId/:patientId', PatientController.updatePatient);

// Rotas para timelines
router.post('/timelines', TimelineController.createTimeline);
router.get('/timelines/:patientId', TimelineController.getAllTimelinesByPatient);
router.get('/timelines/:patientId/:timelineId', TimelineController.getTimelineById);
router.put('/timelines/:patientId/:timelineId', TimelineController.updateTimeline);

// Rotas para ocorrências
router.post('/occurrences', OccurrenceController.createOccurrence);
router.get('/occurrences/:timelineId', OccurrenceController.getAllOccurrencesByTimeline);
router.get('/occurrences/:timelineId/:occurrenceId', OccurrenceController.getOccurrenceById);
router.put('/occurrences/:timelineId/:occurrenceId', OccurrenceController.updateOccurrence);

export default router;
