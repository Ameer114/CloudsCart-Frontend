import React from 'react'
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialTwitter, TiSocialLinkedin } from "react-icons/ti";

const Footer = () => {
  return (
     <div className="footer bg-gray-900 text-white p-6 md:p-10 flex flex-col md:items-start items-center text-center md:text-left gap-4">
  {/* Logo */}
  <div className="logo text-blue-700 text-2xl font-bold">CloudsCart</div>

  {/* Links */}
  <div className="link">
    <ul className="flex flex-wrap gap-4 font-bold text-sm md:text-base justify-center md:justify-start cursor-pointer">
      <li>Terms</li>
      <li>Licence</li>
      <li>Cookies</li>
      <li>Help Center</li>
      <li>Community</li>
    </ul>
  </div>

  {/* Disclaimer */}
  <h1 className="text-sm md:text-base">
    Price is in US dollars and excludes tax and handling fees
  </h1>
  <p className="text-xs md:text-sm mt-2">
    © 2025 Cloudscart Trademarks and brands are the property of their respective owners.
  </p>

  {/* Social icons */}
  <ul className="flex gap-4 text-xl md:text-2xl mt-4 cursor-pointer justify-center md:justify-start">
    <li className="scale-[0.9]">
      <a
        href="https://www.instagram.com/ambivert_114/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SlSocialInstagram />
      </a>
    </li>
    <li>
      <a
        href="https://x.com/AmeerNagar76085"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TiSocialTwitter />
      </a>
    </li>
    <li className="scale-[1.1]">
      <a
        href="https://www.linkedin.com/in/ameer-nagarasi/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <TiSocialLinkedin />
      </a>
    </li>
  </ul>
</div>
  )
}

export default Footer
