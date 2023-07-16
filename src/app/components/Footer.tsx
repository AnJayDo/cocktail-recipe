import Link from "next/link";
import Logo from "./Logo";
import {FaFacebookSquare, FaInstagram, FaGithub, FaLinkedin, FaTiktok} from 'react-icons/fa'
import {SiDuolingo} from 'react-icons/si'

const links = {
    github: 'https://github.com/AnJayDo',
    fb: 'https://www.facebook.com/dovanminhan',
    ig: 'https://www.instagram.com/jayan610',
    duolingo: 'https://www.duolingo.com/profile/jayan610',
    tiktok: 'https://www.tiktok.com/@dovanminhan',
    linkedin: 'https://www.linkedin.com/in/an-do-3821b316a/',
    project: 'https://github.com/AnJayDo/cocktail-recipe'
}

const iconSize = 30;

export default function Footer() {
    return <footer className="flex flex-col justify-center items-center py-4 bg-gradient-to-t from-black to-transparent">
        <Logo color="white" />
        <p className='text-center mx-auto my-3 opacity-80'>
            Build by Jay An with 💔 a broken heart.
        </p>
        <div className="flex mx-auto mb-3"><span>© {(new Date()).getFullYear()} An Do </span><Link className="ml-3 underline" href={links.project} target="blank">View Source</Link></div>
        <div className="flex justify-center mt-3 mb-8 mx-auto">
            <Link className="flex justify-center items-center mx-2" href={links.fb}>
                <FaFacebookSquare size={iconSize} color="white"/>
            </Link>
            <Link className="flex justify-center items-center mx-2" href={links.ig}>
                <FaInstagram size={iconSize} color="white"/>
            </Link>
            <Link className="flex justify-center items-center mx-2" href={links.github}>
                <FaGithub size={iconSize} color="white"/>
            </Link>
            <Link className="flex justify-center items-center mx-2" href={links.linkedin}>
                <FaLinkedin size={iconSize} color="white"/>
            </Link>
            <Link className="flex justify-center items-center mx-2" href={links.tiktok}>
                <FaTiktok size={iconSize} color="white"/>
            </Link>
            <Link className="flex justify-center items-center mx-2" href={links.duolingo}>
                <SiDuolingo size={iconSize} color="white"/>
            </Link>
        </div>
    </footer>
}