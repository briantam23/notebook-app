'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import io from 'socket.io-client';
import axios from 'axios';
import Canvas from '@/components/Canvas';
import NoteBook from '@/components/Notebook';
import ExportButton from '@/components/ExportButton';


const App = ({ data }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notebooks, setNotebooks] = useState(data?.notebooks || [])

    const toggleTheme = () => {
        if (isDarkMode) {
            sessionStorage.removeItem('isDarkMode');
            setIsDarkMode(false);
        } else {
            sessionStorage.setItem('isDarkMode', 'true');
            setIsDarkMode(true);
        }
    };


    const socket = io('http://localhost:5000');

    useEffect(() => {

        socket.on('notebookCreated', (notebook) => {
            setNotebooks([...notebooks, notebook]);
        });

        socket.on('notebookUpdated', (notebook) => {
            const _notebooks = notebooks.map((_notebook) => (
                _notebook.id === notebook.id ? notebook : _notebook
            ))
            setNotebooks(_notebooks);
        });

        return () => {
            socket.off('notebookCreated');
            socket.off('notebookUpdated');
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'object') {
            if (sessionStorage.getItem('isAuthenticated')) {
                setIsLoggedIn(true);
            }
            if (sessionStorage.getItem('isDarkMode')) {
                setIsDarkMode(true);
            }
        }
    }, [])

    const createNotebook = async (title: string) => {
        const response = await axios.post(
            'http://localhost:5000/notebooks',
            { title }
        );
        socket.emit('createNotebook', response.data);
    };

    const updateNotebook = async (notebook) => {
        const response = await axios.put(
            `http://localhost:5000/notebooks/${notebook.id}`,
            { title: notebook.title }
        );
        socket.emit('updateNotebook', response.data);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
    };

    return (
        <>
            <div className={isDarkMode ? 'dark' : ''}>
                <div className='pb-12 px-8 md:px-12 pt-8 sm:pt-10 md:pt-12 dark:bg-gray-900 dark:text-white bg-white text-black'>
                    <div className='md:flex sm:pb-3 navbar-container'>
                        <h1 className='text-3xl md:text-4xl font-extrabold title'>Notebook App</h1>
                        <div>
                            <button className='p-4 toggle-theme-button'onClick={toggleTheme}>Toggle Theme</button>
                            <ExportButton />
                            {
                                isLoggedIn
                                    ? <Link className='p-4 pr-0' href="#" onClick={handleLogout}>Logout</Link>
                                    : <Link className='p-4 pr-0' href="/auth">Login</Link>
                            }
                        </div>
                    </div>
                    <hr className='pb-7 sm:pb-10' />
                    <div className='md:flex justify-normal'>
                        <NoteBook
                            notebooks={notebooks}
                            createNotebook={createNotebook}
                            updateNotebook={updateNotebook}
                        />
                        <Canvas />
                    </div>
                </div>
            </div>
            <style jsx global>{`
                html {
                    background-color: ${isDarkMode ? 'rgb(17 24 39 / var(--tw-bg-opacity, 1))' : 'white'};
                }
                .navbar-container {
                    justify-content: space-between;
                }
                .title {
                    align-content: center;
                }
                .toggle-theme-button {
                    margin-left: -14px;
                }
            `}
            </style>
        </>
    )
};


export async function getServerSideProps() {
    const res = await fetch('/notebooks');
    const data = await res.json();

    return {
        props: {
            data
        }
    }
}


export default App;
