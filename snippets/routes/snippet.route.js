import express from "express"
import { createSnippet, getSnippet } from "../controllers/snippet.controller.js";

const router = express.Router();

router.route("/").post(createSnippet);
router.route("/").get(getSnippet);

export default router;