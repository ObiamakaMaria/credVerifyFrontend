import React from 'react';
import { FaChartLine, FaListAlt, FaIdCard, FaCheckCircle, FaLayerGroup, FaArrowRight } from 'react-icons/fa';

const features = [
  {
    title: 'REAL-TIME SCORING',
    desc: 'Your score updates live with every payment. See progress instantly.',
    icon: <FaChartLine size={28} className="text-purple-400" />,
  },
  {
    title: 'TRANSPARENT BREAKDOWN',
    desc: 'Factors: 60% payment history, 15% duration, 15% consistency, 10% amount.',
    icon: <FaListAlt size={28} className="text-purple-400" />,
  },
  {
    title: 'YOUR ONCHAIN CREDIT ID',
    desc: 'A soulbound NFT that grows with your financial trust. No banks. No middlemen. Just you and the chain.',
    center: true,
    image: true,
  },
  {
    title: 'SCORE RANGES',
    desc: '300–549: High Risk\n550–649: Medium\n650–749: Low\n750–850: Prime',
    icon: <FaLayerGroup size={28} className="text-purple-400" />,
  },
  {
    title: 'VERIFIABLE NFT',
    desc: 'Completed loans mint an NFT with full on-chain history and final score.',
    icon: <FaCheckCircle size={28} className="text-purple-400" />,
  },
];

const marketplaceFeatures = [
  'DeFi loans with lower APR',
  'Token airdrops for responsible behavior',
  'Access to exclusive Web3 job boards',
  'Partners like Aave, Compound, Goldfinch (future integrations)',
];

const CreditScoreEngineSection = () => (
  <section className="bg-gradient-to-b from-[#12081f] to-[#1a093a] py-20 px-4 text-white">
    {/* Simulate Button */}
    <div className="flex justify-center mb-8">
      {/* <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-6 py-2 hover:opacity-90 transition">
        Simulate Credit Building
      </button> */}
    </div>
    {/* Credit Score Engine */}
    <div className="max-w-5xl mx-auto text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-2">Credit Score Engine</h2>
      <p className="text-gray-300 mb-8">Your Credit Score, Powered by Smart Contracts.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {features.slice(0,2).map((f, i) => (
            <div key={i} className="bg-[#23104a] rounded-2xl p-6 flex flex-col items-center text-center min-h-[140px]">
              {f.icon}
              <div className="mt-3 font-bold text-base">{f.title}</div>
              <div className="text-gray-300 text-sm mt-1 whitespace-pre-line">{f.desc}</div>
            </div>
          ))}
        </div>
        {/* Center card */}
        <div className="bg-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div className="font-bold text-base mb-2">YOUR ONCHAIN CREDIT ID</div>
          <div className="text-gray-100 text-sm mb-4 text-center">A soulbound NFT that grows with your financial trust. No banks. No middlemen. Just you and the chain.</div>
          <div className="w-32 h-40 flex items-center justify-center mb-2">
            {/* Placeholder for card image */}
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80" alt="credit card" className="rounded-xl shadow-lg object-cover w-full h-full" />
          </div>
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-6">
          {features.slice(3).map((f, i) => (
            <div key={i} className="bg-[#23104a] rounded-2xl p-6 flex flex-col items-center text-center min-h-[140px]">
              {f.icon}
              <div className="mt-3 font-bold text-base">{f.title}</div>
              <div className="text-gray-300 text-sm mt-1 whitespace-pre-line">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* Marketplace Section */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mt-16">
      {/* Left: Text and features */}
      <div className="flex-1 mb-10 md:mb-0">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Explore Our Marketplace</h3>
        <p className="text-gray-300 mb-6">As your score improves, unlock new financial products</p>
        <ul className="space-y-4 mb-6">
          {marketplaceFeatures.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-700 text-white font-bold text-lg">•</span>
              <span className="text-gray-100 text-base">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-6 py-2 hover:opacity-90 transition">
            Discover Lending Partners
          </button>
          <button className="bg-black border border-white text-white font-semibold rounded-lg px-6 py-2 hover:bg-white hover:text-black transition">
            Share My Credit NFT
          </button>
        </div>
      </div>
      {/* Right: NFT/Marketplace illustration placeholder */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-xs md:max-w-md">
          {/* Placeholder for NFT/marketplace illustration */}
          <img src="https://cdn.pixabay.com/photo/2022/01/15/12/26/nft-6939440_1280.png" alt="NFT Marketplace" className="rounded-2xl shadow-lg w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  </section>
);

export default CreditScoreEngineSection; 