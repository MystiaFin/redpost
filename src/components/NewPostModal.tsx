import Image from 'next/image'
import React from 'react';
import avatarImage from '../assets/avatar.png';
import { useState, useEffect } from 'react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [content, setContent] = useState('');
  const maxCharacters = 600;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const inputValue = textarea.value.slice(0, maxCharacters);
    setContent(inputValue);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const remainingCharacters = maxCharacters - content.length;
  const progress = (content.length / maxCharacters) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-auto backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gray-900 p-8 py-4 rounded-lg w-full max-w-md">
        <h1 className="font-bold flex justify-center gap-1 text-2xl border-b-2 border-gray-600 pb-4 mb-4">
          <span className="text-red-600">New</span>Post
        </h1>
        <button
          type="button"
          className="absolute top-5 right-7 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <i className="ri-close-large-fill text-xl"></i>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex items-start gap-3">
            <Image src={avatarImage} alt="User Avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-grow">
              <label htmlFor="statusInput" className="sr-only">
                What's on your mind?
              </label>
              <textarea
                id="statusInput"
                className="w-full focus:outline-none p-2 rounded-md bg-transparent resize-none overflow-hidden"
                placeholder="What's on your mind?"
                value={content}
                onChange={handleTextareaChange}
                rows={1}
                style={{ minHeight: '2.5rem' }}
                maxLength={maxCharacters}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="relative w-5 h-5">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#444"
                      strokeWidth="5"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="red"
                      strokeWidth="5"
                      strokeDasharray={`${progress}, 100`}
                    />
                  </svg>
                </div>
                {remainingCharacters <= 10 && (
                  <div className="text-sm text-gray-400">{remainingCharacters} / 600 </div>
                )}
              </div>
            </div>
          </div>
        </form>
        <div>
            this is a content menu
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;
