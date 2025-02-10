import React, { useState } from 'react';
import Note from './Note';


const Notebook = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [newNotebookName, setNewNotebookName] = useState('');
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const [selectedIdx, setSelectedIdx] = useState(null);

    const addNotebook = () => {
        setNotebooks(
            [
                ...notebooks,
                { name: newNotebookName, sketches: [], notes: [] }
            ]
        );
    };
    const selectNotebook = (notebook, idx) => {
        setSelectedNotebook(notebook);
        setSelectedIdx(idx);
    }

    return (
        <div className='pr-8'>
            <h2 className='text-2xl pb-4' style={{ minWidth: '190px' }}>My Notebooks</h2>
            <ul className='list-disc list-inside pb-8'>
                {notebooks.map((notebook, idx) => (
                    <li 
                        key={idx}
                        onClick={() => selectNotebook(notebook, idx)}
                        className={`cursor-pointer ${selectedIdx === idx ? 'text-black' : 'text-gray-600'}`}
                    >
                        {notebook.name}
                    </li>
                ))}
            </ul>
            <textarea
                onChange={(e) => setNewNotebookName(e.target.value)}
                value={newNotebookName}
                className="border-2 w-full p-2"
            />
            <button onClick={addNotebook} className='p-2 border bg-blue-500 text-white mb-4' disabled={!newNotebookName}>Add Notebook</button>
            {selectedNotebook && (
                <>
                    <hr className='pb-8' />
                    <Note notebook={selectedNotebook} />
                </>
            )}
        </div>
    );
};

export default Notebook;
