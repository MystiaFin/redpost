import Image from 'next/image'
import avatarImage from '../assets/avatar.png';
import postImage from '../assets/image.png';
import { useState, useRef } from 'react';
import gsap from 'gsap';

function PostCard() {
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const heartIconRef = useRef(null);

    const handleLike = () => {
        if (!isLiked) {
            gsap.to(heartIconRef.current, {
                scale: 0,
                duration: 0.2,
                ease: "elastic.out(1, 0.3)",
                onComplete: () => {
                    gsap.to(heartIconRef.current, {
                        scale: 1,
                        duration: 0.1
                    });
                }
            });
        }

        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    };

    return(
        <div className="bg-gray-900 p-4 rounded-xl mb-2">
            <div className='flex flex-row gap-4 text-white mb-4'>
                <Image src={avatarImage} alt="avatar" className='w-12 h-12 rounded-full'/>
                <div className='flex flex-col'>
                    <span className='font-semibold text-lg'>stvnzey</span>
                    <span className='text-xs text-gray-400'>28 July 2024</span>
                </div>
            </div>
            <div className='text-white text-xl'>
                <p className='mb-2'>This is a post card</p>
                <Image src={postImage} alt="post image" className='rounded-lg'/>
            </div>
            <div className='flex flex-row items-center justify-between mt-3'>
                <div className='container flex flex-row gap-4'>
                    <div className='flex flex-row gap-2 items-center text-2xl'>
                        <button className='flex items-center gap-2 text-white ' onClick={handleLike}>
                        <i 
                            ref={heartIconRef}
                            className={`${isLiked ? 'ri-heart-fill text-red-600' : 'ri-heart-line text-white hover:text-red-600'}`}
                        />                        
                        </button>
                        <span className='text-white text-lg'>{likeCount}</span>
                    </div>
                    <div className='flex flex-row gap-2 items-center text-2xl'>
                        <button className='flex items-center gap-2 text-white hover:text-red-600'>
                            <i className="ri-send-plane-line"></i>
                        </button>
                        <span className='text-white text-lg'>0</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PostCard