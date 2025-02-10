import "@/app/globals.css";
import React, { useState } from 'react';
import Link from 'next/link'


const Auth = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
  
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
            setIsLoggedIn(true);
            setErrorMsg('');
        } else {
            setIsLoggedIn(false);
            setErrorMsg('Invalid username and/or password.');
        }
    };
  
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };
  
    return (
        <div className='px-12 pt-16 pb-12 sm:px-12 lg:pt-24 dark:bg-gray-900 dark:text-white bg-white text-black'>
            <h1 className='text-4xl pb-12 font-extrabold'>Login</h1>
            {
                isLoggedIn ? (
                    <>
                        <p className='text-2xl mb-8'>Hello, {username}!</p>
                        <button className='p-2 border bg-red-500 text-white mt-4 mb-4' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div className='mb-4'>
                            <label htmlFor='username'>Username:</label>
                            <input
                                className='border ml-2 p-1'
                                type='text'
                                value={username}
                                onChange={(e) => handleChange(e, 'username')}
                            />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor='password'>Password:</label>
                            <input
                                className='border ml-3 p-1'
                                type='password'
                                value={password}
                                onChange={(e) => handleChange(e, 'password')}
                            />
                        </div>
                        { errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p> }
                        <button className='p-2 border bg-green-500 text-white mt-4 mb-4' type='submit'>Login</button>
                    </form>
                )
            }
            <div className='mt-8'>
                <Link className='p-2 border bg-blue-500 text-white mb-4' href='/'>Return to homepage</Link>
            </div>
        </div>
    );
}

export default Auth;
