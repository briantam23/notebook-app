import React, { useState } from 'react';


const Note = ({ notebook }) => {
    const [note, setNote] = useState('');

    const addNote = () => {
        notebook.notes.push(note);
        setNote('');
    };

    return (
        <div>
            <h3 className='text-xl'>Notes</h3>
            <textarea
                onChange={(e) => setNote(e.target.value)}
                value={note}
                className='border-2 w-full p-2 dark:text-black'
            />
            <button
                onClick={addNote}
                className='p-2 mb-4 border dark:border-black bg-blue-500 text-white'
                disabled={!note}
            >
                Add Note
            </button>
            <ul className='list-disc list-inside text-gray-600 dark:text-gray-200 pb-8'>
                {notebook.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                ))}
            </ul>
        </div>
    );
};

export default Note;
