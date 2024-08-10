import express from 'express';
import {
    addMaterial,
    getMaterialsByDisaster,
    acceptMaterial,
    deleteMaterial,
    verifyMaterial,
} from '../controllers/materialController.js';

const router = express.Router();

router.post('/add', addMaterial);
router.get('/:disasterId', getMaterialsByDisaster);
router.post('/accept/:materialId', acceptMaterial);
router.delete('/:id', deleteMaterial);
router.put('/verify/:id',verifyMaterial)

export default router;
