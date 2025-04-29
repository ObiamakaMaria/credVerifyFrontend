import React from "react";
import Navbar from "../../components/Navbar";
import { FcSearch } from "react-icons/fc";

const HeroSection = () => {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />
      <section className="min-h-screen text-white pb-12 px-4 flex flex-col bg-[#12081f] items-center justify-center text-center relative">
        {/* Top content container */}
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Label Element */}
          <div className="relative inline-flex items-center gap-2 rounded-[20px] p-[1px] mb-4 bg-button-gradient">
            <div className="flex items-center gap-2 bg-[#121212] rounded-[20px] px-3 py-1 w-full h-full">
              <FcSearch className="w-4 h-4 text-white opacity-80" />
              <span className="font-be-vietnam-pro font-thin text-xs leading-[170%] text-white text-opacity-80">
                Transparent, onchain scoring logic
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-space-grotesk font-bold text-6xl leading-tight tracking-[-2.5px] max-w-4xl mb-6">
            Build Your Credit.{" "}
            <span className="text-brand-purple">Onchain.</span>
          </h1>

          {/* Sub-headline */}
          <p className="font-be-vietnam-pro text-lg leading-relaxed text-white text-opacity-80 max-w-[825px] mb-10">
            A decentralized credit builder loan system designed to help the
            underbanked gain financial access and earn trust through
            transparent, blockchain-verified payments.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6 mb-10">
            <button className="bg-button-gradient text-white font-semibold rounded-lg px-6 py-3  h-[48px] flex items-center justify-center">
              Start Building Credit
            </button>
            <button className="border border-[#F0F0F0] text-white font-semibold rounded-lg px-6 py-3 w-[210px] h-[48px] flex items-center justify-center">
              Explore How It Works
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
