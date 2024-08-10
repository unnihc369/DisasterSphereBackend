import express from "express";
import { createPost, deletePost, getPostsByDisasterId } from "../controllers/postController.js";

const router = express.Router();

router.post('/', createPost);
router.delete('/:id', deletePost);
router.get('/disaster/:disasterId', getPostsByDisasterId);

export default router;
