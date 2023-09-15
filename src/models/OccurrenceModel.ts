import mongoose, { Schema, Document } from 'mongoose';

export interface Occurrence extends Document {
    date: Date;
    description: string;
    timelineId: mongoose.Types.ObjectId;
}

const occurrenceSchema: Schema<Occurrence> = new Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    timelineId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Timeline', required: true },
});

const OccurrenceModel = mongoose.model<Occurrence>('Occurrence', occurrenceSchema);

export default OccurrenceModel;
