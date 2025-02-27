import express from "express";
import {CreateSnippet, getSnippet} from "../controllers/Snippet.js";

const route = express.Router();

route.route("/").post(CreateSnippet);
route.route("/").get(getSnippet);

export default route;