import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    fullName: {
        type: String
    }
}, {
    timestamps: true,
})

export default mongoose.model('Appointment', AppointmentSchema);
