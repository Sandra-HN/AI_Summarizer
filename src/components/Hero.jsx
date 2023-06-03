import React, { useState } from "react";
import {XMarkIcon , Bars3Icon} from "@heroicons/react/24/solid"
import { logo } from "../assets";
import { navLinks } from "../constants";

const Hero = ({active, setActive}) => {
  const [toggle, setToggle] = useState(false)
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-black" : "text-gray-300"
              } hover:text-black text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.id)}
            >
              {nav.title}
            </li>
          ))}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          {/* <img
            src={toggle ?  : }
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          /> */}
{toggle?<XMarkIcon 
            className='w-[28px] h-[28px] '
            onClick={() => setToggle(!toggle)} />:<Bars3Icon 
            className='w-[28px] h-[28px] '
            onClick={() => setToggle(!toggle)}/>}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-white absolute top-10 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-black" : "text-gray-300"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.id);
                  }}
                >
                  {nav.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <button
          type='button'
          onClick={() =>
            window.open("https://github.com/Sandra-HN/AI_Summarizer", "_blank")
          }
          className='black_btn'
        >
          GitHub
        </button> */}
      </nav>

      <h1 className='head_text'>
        Summarize {active==='articles'?"Articles":"Your Text"} with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        Simplify your reading with Summize, an open-source articles and texts summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
