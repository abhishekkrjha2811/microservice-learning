import axios from "axios";
import { useEffect, useState } from "react";

const CreateComment = ({ snippetId }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // Function to fetch comments
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/api/v1/snippet/${snippetId}/comment`
      );
      setComments(res.data); // Ensure response is an array
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch comments when component mounts or snippetId changes
  useEffect(() => {
    fetchComments();
  }, [snippetId]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent adding empty comments

    try {
      const res = await axios.post(
        `http://localhost:9000/api/v1/snippet/${snippetId}/comment`,
        { text }
      );

      // Append new comment to state instead of re-fetching
      setComments((prevComments) => [...prevComments, res.data]);

      setText(""); // Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-3">
      <ul>
        {Array.isArray(comments) &&
          comments.map((comment, index) => (
            <li key={index} className="text-sm">
              {comment.content || comment.text}
            </li>
          ))}
      </ul>
      <form onSubmit={addComment} className="flex mt-3 items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Comment"
          className="border rounded px-2 text-sm py-1"
        />
        <button type="submit" className="bg-black rounded text-white px-2 py-1">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
