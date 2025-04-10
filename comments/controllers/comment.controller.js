import { randomBytes } from "crypto";
import { commentsDB } from "../db/index.js";
import axios from "axios";

export const createComment = async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { text } = req.body;
  const snippetId = req.params.id;
  const comments = commentsDB[snippetId] || [];
 
  comments.push({commentId, text});
  commentsDB[snippetId] = comments;

  // best place to emit an event
  await axios.post("http://localhost:8005/events", {
    type:"Comment_Created",
    data:{
      id:commentId,
      content:text,
      snippetId,
    }
  });

  return res.status(201).json({success:true, comment:{commentId, text}, message:"Comment created."})
};

export const getCommentsBySnippetId = (req, res) => {
 
    return res.status(200).json(commentsDB[req.params.id] || []);
};
