import express from "express"
import { createComment, getCommentsBySnippetId } from "../controllers/comment.controller.js";
 
const router = express.Router();

router.route("/:id/comments").post(createComment);
router.route("/:id/comments").get(getCommentsBySnippetId);

export default router;