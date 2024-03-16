// NoteList.js

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Notes = ({}) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState("");
  const [currentNote, setCurrentNote] = useState({})
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [previousNote, setPreviousNote] = useState({ title: "", description: "", tag: "" });

  useEffect(() => {
    const fetchNotes = async () => {
      // Add logic to fetch all the note to the database
      const data = await fetch(
        "http://localhost:8000/api/notes/fetchallnotes",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const user = await data.json();
      console.log(user);

      setNotes(user);
    };

    fetchNotes();
  }, []);

  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setNote({ title: note.title, description: note.description, tag: note.tag });
    setPreviousNote({ title: note.title, description: note.description, tag: note.tag })
  };
  

  const handleCancelEdit = (note) => {
    setEditingNoteId("");
    // setNote(previousNote);

    // console.log(previousNote)

    const updatedNotes = notes.map((n) => {
      if (n._id === note._id) {
        n.title = previousNote.title;
        n.description = previousNote.description;
        n.tag = previousNote.tag;
      }
      return n;
    });
  
    setNotes([...updatedNotes]);
  }

  const handleSaveEdit = async (id) => {
    const data = await fetch(
      `http://localhost:8000/api/notes/updateNote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify(note)
      }
    );

    console.log(note)
    const userData = await data.json();
   
    const updatedNotes = notes.map((n) => {
      if (n._id === userData._id) {
        n.title = userData.title;
        n.description = userData.description;
        n.tag = userData.tag;
      }
      return n;
    });
  
    setNotes([...updatedNotes]);
    
    Swal.fire("Updated!", 'Updated the note successfully', "success");
    setEditingNoteId('')
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this resource?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await fetch(
          `http://localhost:8000/api/notes/deleteNote/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const user = await data.json();

        const updatedNotes = notes.filter((note) => {
          return note._id !== id;
        });

        setNotes(updatedNotes);
        Swal.fire("Deleted!", user, "success");
      }
    });
  };

  const onChange = (e) => {
    const { id, innerText } = e.target;
    console.log(e.target.id)
    setNote({ ...note, [id]: innerText });
    console.log(note)
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
        {notes.map((note) =>
          editingNoteId === note._id ? (
            <div key={note.id} className="bg-white p-4 shadow-md rounded-md">
              <h3
                className="text-lg font-bold mb-2"
                id="title"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={onChange}
              >
                {note.title}
              </h3>
              <p
                className="text-gray-600 mb-4"
                id="description"
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={onChange}
              >
                {note.description}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-sm text-gray-400"
                  id="tag"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={onChange}
                >
                  {note.tag}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(note._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-2"
                  >
                    Save
                  </button>
                  
                  <button
                    onClick={() => handleCancelEdit(note)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600 mr-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div key={note.id} className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-lg font-bold mb-2">{note.title}</h3>
              <p className="text-gray-600 mb-4">{note.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{note.tag}</span>
                <div className="flex gap-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(note)}
                    disabled={editingNoteId !== ""}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(note._id)}
                    disabled={editingNoteId !== ""}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Notes;
