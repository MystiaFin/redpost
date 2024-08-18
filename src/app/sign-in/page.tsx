"use client"

import React, { useState } from 'react';
import WelcomeLogo from '@/components/WelcomeLogo';

function Login() {
    const [userTag, setUserTag] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userTag, password }),
        });
    
        if (response.ok) {
          // Handle success
        } else {
          const data = await response.json();
          setError(data.error);
        }
      };

    return (
        <div className="bg-black min-h-screen text-white flex justify-center items-center">
            <WelcomeLogo/>
            <div className="w-96 flex flex-col pl-10 gap-4 border-l-2">
                <h1 className="text-3xl font-bold mb-4 text-center">
                    Welcome back!
                </h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input 
                        type="text" 
                        placeholder="user tag" 
                        className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none" 
                        value={userTag}
                        onChange={(e) => setUserTag(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-red-600 p-2 px-4 rounded-2xl">Login</button>
                </form>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <p className="text-gray-400">
                    don't have an account? <u>sign up!</u>
                </p>
            </div>
        </div>
    );
}

export default Login;