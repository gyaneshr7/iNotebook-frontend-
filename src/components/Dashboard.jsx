import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [editingNoteId, setEditingNoteId] = useState(null);

  window.history.pushState(null, null, location.href);
  window.onpopstate = function (event) {
    window.history.go(1);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == "null" || !token) {
      navigate("/");
    }
  }, []);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add logic to add the note to the database
    const data = await fetch("http://localhost:8000/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note)
    });
    const user = await data.json();

    if (user) {
      Swal.fire({ title: "Success",
      text: 'Note added successfully',
      icon: 'success'
    });
    }

    else{
      Swal.fire({ title: "Error",
      text: 'Something went wrong',
      icon: 'error'
    });
  }
  setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="w-[75%] mx-auto mt-20 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
