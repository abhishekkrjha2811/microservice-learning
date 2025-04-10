import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateComment = ({ snippet }) => {
  const [text, setText] = useState("");
 
  const handleComment = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await axios.post(
        `http://localhost:8002/api/v1/snippets/${snippet.id}/comments`,
        { text }
      );
      // console.log("Comment posted successfully:", res.data);
      setText(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };


  return (
    <div>
      <ul>
        {snippet.comments.map((comment,index) => (
          <li key={index} className="pl-3 text-sm">{`${index+1}. ${comment.content}`}</li>
        ))}
      </ul>
      <form
        className="flex items-center justify-between mt-2"
        onSubmit={handleComment}
      >
        <input
          placeholder="Post comment..."
          className="border rounded px-2 py-1 outline-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded bg-black cursor-pointer text-white"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
