import Material from '../models/Material.js';
import Disaster from '../models/Disaster.js';
import Users from '../models/Users.js';

export const addMaterial = async (req, res) => {
    const { disasterId, itemName, quantityNeeded } = req.body;

    try {
        const disaster = await Disaster.findById(disasterId);
        if (!disaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        const material = new Material({
            disasterId,
            itemName,
            quantityNeeded,
        });

        await material.save();

        res.status(201).json({ message: 'Material requirement added successfully', material });
    } catch (error) {
        console.error('Error adding material:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMaterialsByDisaster = async (req, res) => {
    const { disasterId } = req.params;

    try {
        const materials = await Material.find({ disasterId });
        res.status(200).json(materials);
    } catch (error) {
        console.error('Error fetching materials:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const acceptMaterial = async (req, res) => {
    const { materialId } = req.params;
    const { username } = req.body;

    try {
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        material.volunteer = username;
        material.fulfilled = true;
        await material.save();

        res.status(200).json({ message: 'Material accepted for donation', material });
    } catch (error) {
        console.error('Error accepting material:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteMaterial = async (req, res) => {
    const { materialId } = req.params;

    try {
        const material = await Material.findById(materialId);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }

        await material.remove();

        res.status(200).json({ message: 'Material deleted successfully' });
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
