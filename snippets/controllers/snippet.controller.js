import { snippets } from "../db/index.js";
import { randomBytes } from "crypto";
import axios from "axios";

export const createSnippet = async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title, code } = req.body;

  // create snippet
  snippets[id] = {
    id,
    title,
    code,
  };

  // best place to emit an event to message broker
  await axios.post("http://localhost:8005/events", {
    type: "Snippet_Created",
    data: {
      id,
      title,
    },
  });

  return res.status(201).json({
    success: true,
    snippet: snippets[id],
    message: "Snippet created successfully.",
  });
};

export const getSnippet = (_, res) => {
  return res.status(200).json(snippets);
};

export const getSnippetById = () => {};
