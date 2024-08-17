import Image from 'next/image'
import Logo from '../assets/redpost.svg'

export default function WelcomeLogo() {
    return (
        <div className="pr-10">
            <Image src={Logo} alt="Logo" width={300} className="mb-4"/>
            <p className="text-right text-xl">
                A <span className="text-red-500 font-bold">Hybrid</span> of <br />
                Many <span className="underline underline-offset-4">Social Media</span>
            </p>
        </div>
    )
}