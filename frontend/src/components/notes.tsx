import React, { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { ...newNote, id: Date.now() }]);
      setNewNote({ title: '', content: '' });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Note Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            className="w-full border rounded px-2 py-1 mb-2"
          />
          <textarea
            placeholder="Note Content"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="w-full border rounded px-2 py-1 mb-2"
            rows={3}
          />
          <button onClick={addNote} className="bg-purple-600 text-white px-4 py-2 rounded">
            Add Note
          </button>
        </div>
        <div>
          {notes.map((note) => (
            <div key={note.id} className="border-b py-2 last:border-b-0">
              <h3 className="font-semibold">{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;