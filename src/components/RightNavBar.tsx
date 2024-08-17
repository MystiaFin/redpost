import Image from 'next/image'
import groupImage from '../assets/groupImage1.png';
import groupImage2 from '../assets/groupImage2.jpg';
function RightNavbar() {
    return(
        <div className="sticky top-0 pt-10 text-white">
          <div className='font-bold text-xl mb-4'>
            Recent Groups
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className='flex items-center gap-3'>
              <Image src={groupImage} alt="group icon" className='lg:w-12 lg:h-12 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full' />
              <div className="hidden lg:block">
                  <p className="font-semibold text-sm">Kessoku Band</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Image src={groupImage2} alt="group icon" className='lg:w-12 lg:h-12 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full' />
              <div className="hidden lg:block">
                  <p className="font-semibold text-sm">Honkai: Star Rail</p>
              </div>
            </div>
         </div>
        </div>
        
    )
}

export default RightNavbar