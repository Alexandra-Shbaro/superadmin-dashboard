'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from 'react'

export default function Home() {
  const searchParams = useSearchParams()

  const router = useRouter()
  const callbackURL = searchParams.get("callbackUrl");
  const { data: session, status } = useSession();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Retry mechanism to check session status
    if (status === "loading" && retryCount < 5) {
      const timer = setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, 1000); // Retry every 1 second

      return () => clearTimeout(timer);
    }

    // Redirect if user is authenticated
    if (status === "authenticated" && session) {
      router.replace("/dashboard");
    }
  }, [status, session, router, callbackURL, retryCount]);

  const [isActive, setIsActive] = useState(false);



  const [formValues, setFormValues] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const allFieldsFilled =
    Object.values(formValues).every((value) => value.trim() !== '') && passwordsMatch;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(
        name === 'password'
          ? value === formValues.confirmPassword
          : value === formValues.password
      );
    }
  };

  const [loginValues, setLoginValues] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const areLoginFieldsFilled = Object.values(loginValues).every((value) => value.trim() !== '');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {


    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      email: loginValues.loginEmail,
      password: loginValues.loginPassword,
    });

    if (result?.error) {

    } else {
      router.push('/dashboard'); // Redirect to dashboard on success
    }
  };


  return (
    <main className="h-screen w-screen relative overflow-hidden">
      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full opacity-100 z-10' : 'translate-x-0 opacity-100 z-5'} left-0 w-1/2`}>
        <form className="bg-white flex flex-col items-center justify-center h-full px-10">
          <h1 className="text-3xl font-bold mb-4">Create Account</h1>
          <span className="text-base mb-4">Let's organize your next big project</span>
          <span className="text-base mb-4">
            First, the <b>basics</b>
          </span>

          <input
            type="text"
            name="companyName"
            placeholder="Company's Name"
            className="signup-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={formValues.companyName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Company's E-mail"
            className="signup-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={formValues.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="signup-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={formValues.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="signup-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {!passwordsMatch && (
            <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
          )}
         
            <button
              className={`bg-gradient-to-r from-[#FF8A00] to-[#FFD700] text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer ${allFieldsFilled ? '' : 'opacity-50 cursor-not-allowed'
                }`}
              disabled={!allFieldsFilled}
            >
              Sign Up
            </button>
       
        </form>
      </div>

      <div className={`absolute top-0 h-full transition-all duration-600 ease-in-out ${isActive ? 'translate-x-full opacity-0 z-0' : 'translate-x-0 opacity-100 z-2'} left-0 w-1/2`}>
        <form className="bg-white flex flex-col items-center justify-center h-full px-10">
          <h1 className="text-3xl font-bold mb-4">Log In</h1>
          <span className="text-base mb-4">Login With Email & Password</span>
          <input
            type="email"
            name="loginEmail"
            placeholder="Enter E-mail"
            className="login-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={loginValues.loginEmail}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="loginPassword"
            placeholder="Enter Password"
            className="login-input w-3/4 bg-gray-100 border-none rounded-lg px-4 py-2 text-base mb-3 outline-none"
            value={loginValues.loginPassword}
            onChange={handleLoginChange}
          />
          <a href="#" className="text-sm font-bold text-gray-800 underline mt-4 mb-3">
            Forget Password?
          </a>
          <button
            type="button"
            onClick={handleLoginSubmit}
            className={`bg-gradient-to-r from-[#FF8A00] to-[#FFD700] text-white text-sm px-12 py-3 rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer ${areLoginFieldsFilled ? '' : 'opacity-50 cursor-not-allowed'
              }`}
            disabled={!areLoginFieldsFilled}
          >
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
              Log In
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

      <style jsx>{`
        .signup-input, .login-input {
          background-color: #f7fafc !important; /* Lighter background */
          border: 1px solid #d1d5db !important; /* Gray border */
          color: #333 !important; /* Dark text */
          position: relative; /* Added to ensure proper stacking */
          z-index: 10 !important; /* Ensures inputs are on top of other elements */
          pointer-events: auto !important; /* Ensures inputs are clickable */
        }

        .signup-input:focus, .login-input:focus {
          outline: none !important; /* Removes outline on focus */
          border-color: #FF8A00 !important; /* Add a custom border color on focus */
        }
      `}</style>
    </main>
  );
}
