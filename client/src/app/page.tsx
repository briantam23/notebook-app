'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Canvas from '@/components/Canvas';
import NoteBook from '@/components/Notebook';
import ExportButton from '@/components/ExportButton';


const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const toggleTheme = () => {
        if (isDarkMode) {
            sessionStorage.removeItem('isDarkMode');
            setIsDarkMode(false);
        } else {
            sessionStorage.setItem('isDarkMode', 'true');
            setIsDarkMode(true);
        }
    };

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

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
    };

    return (
        <>
            <div className={isDarkMode ? 'dark' : ''}>
                <div className='pb-12 px-8 md:px-12 pt-8 sm:pt-10 md:pt-12 dark:bg-gray-900 dark:text-white bg-white text-black'>
                    <div className='md:flex sm:pb-3' style={{ justifyContent: 'space-between' }}>
                        <h1 className='text-3xl md:text-4xl font-extrabold' style={{ alignContent: 'center' }}>Notebook App</h1>
                        <div>
                            <button className='p-4' style={{ marginLeft: '-14px' }} onClick={toggleTheme}>Toggle Theme</button>
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
                        <NoteBook />
                        <Canvas />
                    </div>
                </div>
            </div>
            <style jsx global>{`
                html {
                    background-color: ${isDarkMode ? 'rgb(17 24 39 / var(--tw-bg-opacity, 1))' : 'white'};
                }   
            `}
            </style>
        </>
    )
};

export default App;
