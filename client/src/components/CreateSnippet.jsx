import React, { Suspense, use, useOptimistic } from "react";
import { useActionState } from "react";
import CreateComment from "./CreateComment";

const formAction = async (prevState, formData) => {
  const title = formData.get("title");
  const code = formData.get("code");

  try {
    const res = await fetch("http://localhost:8001/api/v1/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, code }),
    });

    if (!res.ok) {
      throw new Error("Failed to create snippet");
    }

    const resData = await res.json();

    return { data: resData };
  } catch (error) {
    return { data: { error: error.message } };
  }
};

// // Cache the promise returned by fetchTodos
let snippetsPromise;

function fetchSnippets() {
  if (!snippetsPromise) {
    snippetsPromise = fetch("http://localhost:8003/snippets").then(
      (res) => res.json()
    );
  }
  return snippetsPromise;
}

const CreateSnippet = () => {
  const [formState, action, isPending] = useActionState(formAction, {
    data: {},
  });

  return (
    <div>
      <form action={action} className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-fit bg-gray-100 border border-gray-100 p-2 outline-none"
        />
        <textarea
          className="bg-gray-100 rounded p-2 outline-none"
          placeholder="Write code..."
          name="code"
        />
        <button
          disabled={isPending}
          type="submit"
          className="px-4 py-2 rounded bg-sky-600 text-white cursor-pointer"
        >
          {isPending ? "Loading..." : "Create"}
        </button>
      </form>
      <div className="my-10">
        <h1 className="font-bold text-xl">Posts</h1>
        <div className="grid md:grid-cols-4 gap-3">
          <Suspense fallback={<h1>Loading Snippets...</h1>}>
            <SnippetsSuspense />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;

const SnippetsSuspense = () => {
  const snippets = use(fetchSnippets());
  return (
    <>
      {Object.values(snippets).map((snippet, index) => (
        <div key={index} className="p-2 border rounded">
          <h1 className="font-bold text-xl mb-4">{snippet.title}</h1>
          <CreateComment snippet={snippet}/>
        </div>
      ))}
    </>
  );
};
