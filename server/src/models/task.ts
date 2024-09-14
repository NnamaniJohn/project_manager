import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  projectId: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    required: true,
  },
  dueDate: { type: Date },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
