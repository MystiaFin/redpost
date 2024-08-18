"use client"

import { useState } from "react";
import WelcomeLogo from '@/components/WelcomeLogo';


function Register() {
    const [name, setName] = useState('');
    const [userTag, setUserTag] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, userTag, password }),
          });
          
          if (response.ok) {
            // Handle success (e.g., show a success message, redirect to login). will create modal form later
            console.log('Registration successful');
          } else {
            // Handle error
            const errorData = await response.json();
            console.error('Registration failed:', errorData.error);
            // Display error to user
          }
        } catch (error) {
          console.error('An error occurred:', error);
          // Display error to user
        }
      };
    

    return (
        <div className="bg-black min-h-screen text-white flex justify-center items-center">
            <WelcomeLogo/>
            <form onSubmit={handleSubmit}>
                <div className="w-96 flex flex-col pl-10 gap-4 border-l-2">
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Welcome back!
                    </h1>
                    <input
                        type="text"
                        placeholder="name"
                        className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="user tag"
                        className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
                        value={userTag}
                        onChange={ev => setUserTag(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                    />
                    <button className="bg-red-600 p-2 px-4 rounded-2xl">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;