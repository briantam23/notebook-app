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
        setNewNotebookName('');
    };
    const selectNotebook = (notebook, idx) => {
        setSelectedNotebook(notebook);
        setSelectedIdx(idx);
    }

    return (
        <>
            <div className='pr-8'>
                <h2 className='text-2xl pb-4 notebook-title'>My Notebooks</h2>
                <ul className='list-disc list-inside pb-6'>
                    { 
                        notebooks.length > 0 ? (
                            notebooks.map((notebook, idx) => (
                                <li 
                                    key={idx}
                                    onClick={() => selectNotebook(notebook, idx)}
                                    className={`cursor-pointer ${selectedIdx === idx ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}
                                >
                                    {notebook.name}
                                </li>
                            ))
                        ) : (
                            '(Empty)'
                        )}
                </ul>
                <div className='flex flex-col'>
                    <textarea
                        onChange={(e) => setNewNotebookName(e.target.value)}
                        value={newNotebookName}
                        className='border-2 dark:text-black w-full p-2 mb-2 notebook-form'
                    />
                    <button 
                        onClick={addNotebook}
                        className='p-2 border dark:border-black bg-blue-500 text-white mb-12 md:mb-4 notebook-form'
                        disabled={!newNotebookName}
                    >
                        Add Notebook
                    </button>
                </div>
                {selectedNotebook && (
                    <>
                        <hr className='pb-8' />
                        <Note notebook={selectedNotebook} />
                    </>
                )}
            </div>
            <style jsx>{`
                .notebook-title {
                    min-width: 190px;
                }
                .notebook-form {
                    max-width: 175px;
                    max-height: 45px;
                }
            `}</style>
        </>
    );
};

export default Notebook;
