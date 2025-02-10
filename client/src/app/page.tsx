'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Canvas from '@/components/Canvas';
import NoteBook from '@/components/Notebook';
import ExportButton from '@/components/ExportButton';


const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className='px-12 pt-16 pb-12 sm:px-12 lg:pt-24 dark:bg-gray-900 dark:text-white bg-white text-black'>
                <div className='flex pb-12' style={{ justifyContent: 'space-between' }}>
                    <h1 className='text-4xl font-extrabold' style={{ alignContent: 'center' }}>Notebook App</h1>
                    <div>
                        <button className='p-4' onClick={toggleTheme}>Toggle Theme</button>
                        <ExportButton />
                        <Link className='p-4' href="/auth">Account</Link>
                    </div>
                </div>
                <div className='flex' style={{ justifyContent: 'space-between' }}>
                    <NoteBook />
                    <Canvas />
                </div>
            </div>
        </div>
    )
};

export default App;
