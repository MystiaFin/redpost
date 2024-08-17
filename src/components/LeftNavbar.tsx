import Image from 'next/image'
import 'remixicon/fonts/remixicon.css'
import avatarImage from '../assets/avatar.png';
import redpostLogo from '../assets/redpost.svg';
import rLogo from '../assets/r-logo.svg';
import { useState } from 'react'
import NewPostModal from './NewPostModal';

export default function LeftNavBar() {

  const [modal, setModal] = useState(false)
  const toggleModal = ()  => {
    setModal(!modal)
  }

  return (
    <div className='hidden sm:block'>
    <nav className="text-white sticky top-0 h-screen flex flex-col justify-around w-24 lg:w-auto p-4 lg:p-5 lg:max-w-screen-xl md:max-w-16 sm:max-w-16 ">
      {/*Logo Section */}
      <div className='logo'>
        <Image src={redpostLogo} alt="RedPost Logo" className="hidden lg:block w-auto h-8" />
        <Image src={rLogo} alt="R Logo" className="block lg:hidden w-auto h-8" />
      </div>
      <button onClick={toggleModal} className="bg-red-600 rounded-full text-lg lg:py-2 md:py-0 sm:py-0 flex items-center justify-center">
          <i className="ri-add-line"></i> <span className="hidden lg:inline">New Post</span>
      </button>
      
      {/* Navigation Menu */}
      <div className='navigation'>
        <ul className="space-y-2 text-lg">
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl  cursor-pointer">
            <i className="ri-home-fill lg:mr-4"></i><span className="hidden lg:inline">Home</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl cursor-pointer">
            <i className="ri-chat-1-fill lg:mr-4"></i> <span className="hidden lg:inline">Chat</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl cursor-pointer">
            <i className="ri-search-fill lg:mr-4"></i> <span className="hidden lg:inline">Search</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl cursor-pointer">
            <i className="ri-notification-2-fill lg:mr-4"></i> <span className="hidden lg:inline">Notification</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl cursor-pointer">
            <i className="ri-heart-fill lg:mr-4"></i> <span className="hidden lg:inline">Liked Posts</span>
          </li>
          <li className="flex items-center justify-center lg:justify-start hover:bg-gray-900 p-2 rounded-2xl cursor-pointer">
            <i className="ri-bookmark-fill lg:mr-4"></i> <span className="hidden lg:inline">Saved</span>
          </li>
        </ul>
      </div>

      {/* Profile Section */}
      <div className='profile'>
        <button className="flex flex-col lg:flex-row items-center gap-3">
          <Image src={avatarImage} alt="avatarImage" className='lg:w-12 lg:h-12 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full' />
            <div className="hidden lg:flex lg:flex-col lg:items-start">
                <p className="font-semibold text-lg">stvnzey</p>
                <p className="text-sm text-gray-400">@tag</p>
              </div>
          <button className="hover:bg-gray-900 px-1 rounded-full mt-2 lg:mt-0">
            <i className="ri-settings-3-fill text-2xl"></i>
          </button>
        </button>
      </div>
    </nav>

    <NewPostModal isOpen={modal} onClose={toggleModal} />
    </div>
  );
};
