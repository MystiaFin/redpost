"use client";

import { useState, useEffect, useRef } from 'react';
import WelcomeLogo from '@/components/WelcomeLogo';
import { gsap } from 'gsap';

function Register() {
  const [name, setUsername] = useState('');
  const [userTag, setUserTag] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message if registration is successful
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, userTag, password }),
    });

    if (response.ok) {
      setIsRegistered(true);
      setTimeout(() => {
        window.location.href = '/sign-in'; // Redirect to sign-in page after 3 seconds
      }, 3000);
    } else {
      const data = await response.json();
      if (response.status === 409) {
        setErrorMessage('User Tag alread taken!');
      } else {
        setErrorMessage('Please fill all the fields!');
      }
    }
  };

  useEffect(() => {
    if (isRegistered && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [isRegistered]);

  return (
    <div className="bg-black min-h-screen text-white flex justify-center items-center">
      <WelcomeLogo />
      <form onSubmit={handleSubmit}>
        <div className="w-96 flex flex-col pl-10 gap-4 border-l-2">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome back!
          </h1>
          <input
            type="text"
            placeholder="username"
            className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
            value={name}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="text"
            placeholder="user tag"
            className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
            value={userTag}
            onChange={(ev) => setUserTag(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="rounded-full bg-gray-900 p-4 py-2 focus:outline-none"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="bg-red-600 p-2 px-4 rounded-2xl">
            Register
          </button>
          <div>
            <p className="text-gray-400">
              already have an account? <u>sign in!</u>
            </p>
          </div>
          <div>
            <p className='text-red-600 text-center'>
              {errorMessage}
            </p>
          </div>
        </div>
      </form>
      
      {isRegistered && (
        <>
          <div 
            ref={overlayRef} 
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          ></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div 
              ref={modalRef}
              className="bg-black w-64 flex justify-center p-3 rounded-lg flex-col text-white text-center"
            >
              <span className="font-bold text-red-600">Successfully registered!</span>
              <span>You will be redirected to the login page</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
