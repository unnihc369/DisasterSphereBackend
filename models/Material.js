import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
    disasterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Disaster', required: true },
    itemName: { type: String, required: true },
    quantityNeeded: { type: Number, required: true },
    volunteer: { type: String, default: null }, 
    fulfilled: { type: Boolean, default: false }
}, { timestamps: true });

const Material = mongoose.model('Material', MaterialSchema);

export default Material;
