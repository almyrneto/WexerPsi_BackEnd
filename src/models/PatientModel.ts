import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Patient extends Document {
    name: string;
    age: number;
    user: Types.ObjectId;
}

const patientSchema: Schema<Patient> = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
});

const PatientModel = mongoose.model<Patient>('Patient', patientSchema);

export default PatientModel;
