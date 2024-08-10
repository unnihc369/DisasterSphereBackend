import mongoose from 'mongoose';

const DisasterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    disc: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    Place: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, { timestamps: true });

const Disaster = mongoose.model('Disaster', DisasterSchema);

export default Disaster;
