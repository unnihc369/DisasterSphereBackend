import express from 'express';
import {
    addDisaster,
    updateDisaster,
    deleteDisaster,
    getDisaster,
    getAllDisasters,
    volunteerForDisaster
} from '../controllers/disasterController.js';

const router = express.Router();

router.post('/', addDisaster);
router.put('/:id', updateDisaster);
router.delete('/:id', deleteDisaster);
router.get('/:id', getDisaster);
router.get('/', getAllDisasters);
router.post('/vol', volunteerForDisaster);

export default router;
