"use client";
import { useState, useEffect } from "react";

const StepOne = ({ onNext, setter }) => {
  const [companyTagline, setCompanyTagline] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [companySize, setCompanySize] = useState("");

  const isFormValid = companyTagline && businessCategory && companySize;

  // Save data to parent state when all fields are valid
  useEffect(() => {
    if (isFormValid) {
      setter({
        companyTagline,
        businessCategory,
        companySize,
      });
    }
  }, [companyTagline, businessCategory, companySize, isFormValid, setter]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite">
      <div className="text-center p-3">
        <img
          src="/resources/lumilogo.svg"
          alt="Lumi Logo"
          className="mx-auto w-42 h-20 mb-5"
        />
        <p className="text-mediumGrey mb-5">Finish setting up your profile</p>
      </div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">1</div>
        <div className="w-16 h-0.5 bg-lightGrey"></div>
        <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">2</div>
        <div className="w-16 h-0.5 bg-lightGrey"></div>
        <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">3</div>
      </div>
      <h1 className="font-bold text-lg mb-5">Company Core Details</h1>
      <div className="bg-white shadow-md rounded-lg p-8 w-[500px] mx-auto mb-5">
        <div className="mb-4">
          <label className="block text-mediumGrey font-medium">Company Tagline</label>
          <input
            type="text"
            value={companyTagline}
            onChange={(e) => setCompanyTagline(e.target.value)}
            className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
            placeholder="Enter your company tagline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-mediumGrey font-medium">Business Category</label>
          <select
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
          >
            <option value="">Select Category</option>
            <option value="Marketing and Advertising">Marketing and Advertising</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Online Advertising">Online Advertising</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Social Media Management">Social Media Management</option>
            <option value="Content Marketing">Content Marketing</option>
            <option value="SEO Services">SEO Services</option>
            <option value="Branding and Strategy">Branding and Strategy</option>
            <option value="Creative Services">Creative Services</option>
            <option value="Media Buying">Media Buying</option>
            <option value="Web Development and Design">Web Development and Design</option>
            <option value="E-commerce Solutions">E-commerce Solutions</option>
            <option value="Consulting and Analytics">Consulting and Analytics</option>
          </select>
        </div>
        <div className="mb-8">
          <label className="block text-mediumGrey font-medium">Company Size</label>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value)}
            className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
          >
            <option value="">Select Size</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>

        <button
          onClick={onNext}
          className={`w-full py-3 ${
            isFormValid ? "bg-logoOrange" : "bg-mediumGrey cursor-not-allowed"
          } text-offWhite rounded-md hover:${
            isFormValid ? "bg-logoYellow" : ""
          } transition-all`}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepOne;
