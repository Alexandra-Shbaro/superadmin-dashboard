'use client';

import { useState } from 'react';

export default function Home() {
  const [isActive, setIsActive] = useState(false);
  return (
    <main className="h-screen w-screen relative overflow-hidden">
      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full opacity-100 z-5' : 'translate-x-0 opacity-100 z-5'} left-0 w-1/2`}>
        <form className="bg-white flex flex-col items-center justify-center h-full px-10">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <span className="text-base mb-4">Let's organize your next big project</span>
          <span className="text-base mb-4">First, the <b>basics</b></span>

          <input type="text" placeholder="Company's Name" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <input type="email" placeholder="Company's E-mail" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <input type="password" placeholder="Enter Password" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <input type="password" placeholder="Confirm Password" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <button className="bg-gradient-to-r from-[#FF8A00] to-[#FFD700] text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>

      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-2'} left-0 w-1/2`}>
        <form className="bg-white flex flex-col items-center justify-center h-full px-10">
          <h1 className="text-3xl font-bold mb-4">Log In</h1>
          <span className="text-base mb-4">Login With Email & Password</span>
          <input type="email" placeholder="Enter E-mail" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <input type="password" placeholder="Enter Password" className="w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none" />
          <a href="#" className="text-sm font-bold text-gray-800 underline mt-4 mb-3">Forget Password?</a>
          <button className="bg-gradient-to-r from-[#FF8A00] to-[#FFD700] text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer">
            Log In
          </button>
        </form>
      </div>

      <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out z-1000 ${isActive ? '-translate-x-full' : ''}`}>
        <div className={`bg-gradient-to-r from-logoOrange to-logoYellow h-full text-white relative -left-full w-[200%] ${isActive ? 'translate-x-1/2' : 'translate-x-0'} transition-all duration-600 ease-in-out`}>
          <div className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center ${isActive ? 'translate-x-0' : '-translate-x-[200%]'} transition-all duration-600 ease-in-out`}>
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-base mb-4">We're glad to see you again.</p>
            <p className="text-base mb-4">Log in and continue where you left off.</p>
            <button
              onClick={() => setIsActive(false)}
              className="bg-transparent border border-white text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer"
            >
              Sign In
            </button>
          </div>
          <div className={`absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-600 ease-in-out`}>
            <h1 className="text-3xl font-bold mb-4">Hello There!</h1>
            <p className="text-base mb-4">We see you've got an eye for greatness.</p>
            <p className="text-base mt-10 mb-4">Ready to bring your next masterpiece to life?</p>
            <p className="text-base mb-4">Let's build something amazing together!</p>
            <p className="text-base font-bold mb-4">Get Started</p>
            <button
              onClick={() => setIsActive(true)}
              className="bg-transparent border border-white text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
