import Disaster from '../models/Disaster.js';
import Users from '../models/Users.js';

export const addDisaster = async (req, res) => {
    const { name, state, city, disc, Place,userId,isVerified  } = req.body; 

    try {
        const newDisaster = new Disaster({
            name,
            state,
            city,
            disc,
            Place,
            userId,
            isVerified
        });

        const savedDisaster = await newDisaster.save();
        res.status(201).json(savedDisaster);
    } catch (error) {
        res.status(400).json({ error: 'Failed to add disaster' });
    }
};

export const updateDisaster = async (req, res) => {
    const { id } = req.params;
    const { name, state, city, disc, Place,isVerified } = req.body;

    try {
        const updatedDisaster = await Disaster.findByIdAndUpdate(id, {
            name,
            state,
            city,
            disc,
            Place,
            isVerified
        }, { new: true });

        if (!updatedDisaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        res.json(updatedDisaster);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update disaster' });
    }
};

export const deleteDisaster = async (req, res) => {
    const { id } = req.params;

    try {

        await User.updateMany(
            { volunteeredDisasters: id },
            { $pull: { volunteeredDisasters: id } }
        );
        
        const deletedDisaster = await Disaster.findByIdAndDelete(id);

        if (!deletedDisaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        res.json({ message: 'Disaster deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete disaster' });
    }
};

export const getDisaster = async (req, res) => {
    const { id } = req.params;

    try {
        const disaster = await Disaster.findById(id);

        if (!disaster) {
            return res.status(404).json({ error: 'Disaster not found' });
        }

        res.json(disaster);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch disaster' });
    }
};

export const getAllDisasters = async (req, res) => {
    try {
        const disasters = await Disaster.find();
        res.json(disasters);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch disasters' });
    }
};

export const volunteerForDisaster = async (req, res) => {
    const { userId, disasterId } = req.body;

    try {
        const user = await Users.findById(userId);
        if (!user) {
            console.log(`User not found. User ID: ${userId}`);
            return res.status(404).json({ error: 'User not found' });
        }

        const disasterExists = user.volunteeredDisasters.some(id => id.toString() === disasterId);
        if (disasterExists) {
            return res.status(400).json({ error: 'User is already a volunteer for this disaster' });
        }

        user.volunteeredDisasters.push(disasterId);

        await user.save();

        return res.status(200).json({ message: 'User successfully volunteered for the disaster', user });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to volunteer for the disaster' });
    }
};

export const paymentSuccess = async (req, res) => {
    const { disasterId } = req.body;

    try {
        const disaster = await Disaster.findById(disasterId);
        if (!disaster) return res.status(404).send('Disaster not found');

        disaster.amount += 850;
        await disaster.save();

        res.status(200).send('Amount updated successfully');
    } catch (error) {
        console.error('Failed to update amount:', error);
        res.status(500).send('Error updating amount');
    }
}