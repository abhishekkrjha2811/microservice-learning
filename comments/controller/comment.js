import { randomBytes } from "crypto";
import { commentsDB } from "../databases/index.js";

export const createComment = (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { text } = req.body;

  const snippetId = req.params.id;

  const comments = commentsDB[snippetId] || [];
  
  //create comments
  comments.push({ commentId, text });

  commentsDB[snippetId] = comments;

  return res.status(201).json({
    success: true,
    message: "comment added", 
    comment: { commentId, text },
  });
};
export const getCommentBySnippetId = (req, res) => {
    
  const snippetId=req.params.id;
  return res.status(200).json(commentsDB[snippetId] || []);

};
