import mongoose, { Schema, Document } from 'mongoose';

export interface Timeline extends Document {
    date: Date;
    description: string;
    patientId: mongoose.Types.ObjectId;
}

const timelineSchema: Schema<Timeline> = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    patientId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Patient', required: true },
});

const TimelineModel = mongoose.model<Timeline>('Timeline', timelineSchema);

export default TimelineModel;
