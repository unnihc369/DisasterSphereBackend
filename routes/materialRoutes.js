import express from 'express';
import {
    addMaterial,
    getMaterialsByDisaster,
    acceptMaterial,
    deleteMaterial,
} from '../controllers/materialController.js';

const router = express.Router();

router.post('/add', addMaterial);
router.get('/:disasterId', getMaterialsByDisaster);
router.post('/accept/:materialId', acceptMaterial);
router.delete('/:materialId', deleteMaterial);

export default router;
