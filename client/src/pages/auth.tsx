import "@/app/globals.css";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'


const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window === 'object') {
            if (sessionStorage.getItem('isAuthenticated')) {
                setUsername(JSON.parse(sessionStorage.getItem('isAuthenticated'))?.username);
                setIsLoggedIn(true);
            }
            if (sessionStorage.getItem('isDarkMode')) {
                setIsDarkMode(true);
            }
        }
    }, [])
  
    const handleChange = (event, type) => {
        if (type === 'username') {
            setUsername(event.target.value);
        } else if (type === 'password') {
            setPassword(event.target.value);
        }
    };
  
    const handleLogin = (event) => {
        event.preventDefault();
  
        if (username === 'foo' && password === 'bar') {
            sessionStorage.setItem('isAuthenticated', JSON.stringify({ username }));
            setIsLoggedIn(true);
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid username and/or password.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    return (
        <>
            <div className={isDarkMode ? 'dark' : ''}>
                <div className='px-8 md:px-12 pt-6 sm:pt-10 md:pt-12 dark:bg-gray-900 dark:text-white bg-white text-black'>
                    <h1 className='text-4xl pb-4 md:pb-6 font-extrabold'>Login</h1>
                    <hr className='pb-4 md:pb-6'/>
                    {
                        isLoggedIn ? (
                            <>
                                <p className='text-2xl mb-4'>Hello, {username}!</p>
                                <button className='p-2 border bg-red-500 text-white mt-4 mb-4' onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <form onSubmit={handleLogin}>
                                <div className='mb-4'>
                                    <label htmlFor='username'>Username:</label>
                                    <input
                                        className='border ml-2 p-1 dark:text-black'
                                        type='text'
                                        value={username}
                                        onChange={(e) => handleChange(e, 'username')}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label htmlFor='password'>Password:</label>
                                    <input
                                        className='border ml-3 p-1 dark:text-black'
                                        type='password'
                                        value={password}
                                        onChange={(e) => handleChange(e, 'password')}
                                    />
                                </div>
                                { errorMsg && <p className='text-red-500 max-md:mb-2'>{errorMsg}</p> }
                                <button className='p-2 border dark:border-black bg-green-500 text-white mt:2 md:mt-4 mb-4' type='submit'>Login</button>
                            </form>
                        )
                    }
                    <div className='mt-4 md:mt-8'>
                        <Link className='p-2 border dark:border-black bg-blue-500 text-white mb-4' href='/'>Return to homepage</Link>
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
    );
}

export default Auth;
