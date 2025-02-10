import React, { useState } from 'react';


const Note = ({ notebook }) => {
    const [note, setNote] = useState('');

    const addNote = () => {
        notebook.notes.push(note);
        setNote('');
    };

    return (
        <div>
            <h3 className="text-xl">Notes</h3>
            <textarea
                onChange={(e) => setNote(e.target.value)}
                value={note}
                className="border-2 w-full p-2"
            />
            <button onClick={addNote} className="p-2 mb-4 border bg-blue-500 text-white">Add Note</button>
            <ul className='list-disc list-inside text-gray-600 pb-8'>
                {notebook.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Note;
