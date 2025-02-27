import { useEffect, useState } from "react";
import axios from "axios";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState({});

  const CreateSnippet = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/snippet", {
        title,
        code,
      });
      alert(res.data.message); 
    } catch (error) {
      console.error("There was an error creating the snippet:", error);
    }
  };

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/snippet");
        setSnippets(res.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div className="mt-10">
      <form onSubmit={CreateSnippet} className="flex flex-col space-y-4">
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
          placeholder="write a code snippets..."
          className="border rounded px-2 py-1"
        />
        <button className="w-fit bg-blue-200 px-6 py-2 rounded cursor-pointer">
          Add
        </button>
      </form>
      <div className="mt-5 grid md:grid-cols-3 gap-2">
        {Object.values(snippets).map((snippet) => (
          <div key={snippet.id} className="p-3 border rounded">
            <h1 className="font-bold text-xl">{snippet.title}</h1>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default CreateSnippet;
