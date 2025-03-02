import { useEffect, useState } from "react";
import axios from "axios";
import CreateComment from "./CreateComment";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  // Fetch snippets
  const fetchSnippets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/snippet");
      setSnippets(res.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  // Fetch snippets on mount
  useEffect(() => {
    fetchSnippets();
  }, []);

  // Create snippet and update state
  const handleCreateSnippet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/snippet", {
        title,
        code,
      });

      // Add new snippet to state immediately
      setSnippets((prevSnippets) => ({
        ...prevSnippets,
        [res.data.id]: res.data, // Assuming API returns the new snippet object with `id`
      }));

      // Clear input fields
      

      alert(res.data.message);
    } catch (error) {
      console.error("There was an error creating the snippet:", error);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleCreateSnippet} className="flex flex-col space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border rounded px-2 py-1 w-fit"
        />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write a code snippet..."
          className="border rounded px-2 py-1"
        />
        <button className="w-fit bg-blue-200 px-6 py-2 rounded cursor-pointer">
          Add
        </button>
      </form>

      {/* Snippets List */}
      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
            <CreateComment snippetId={snippet.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateSnippet;
