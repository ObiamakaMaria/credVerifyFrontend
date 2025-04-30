import React from 'react';
import { FaHistory, FaGlobe, FaUserShield, FaUserCheck } from 'react-icons/fa';

const features = [
  {
    icon: <FaHistory size={40} className="mx-auto text-yellow-400" />,
    label: 'Transparent Credit History',
  },
  {
    icon: <FaGlobe size={40} className="mx-auto text-blue-400" />,
    label: 'Global Financial Access',
  },
  {
    icon: <FaUserShield size={40} className="mx-auto text-pink-400" />,
    label: 'User-Owned Data',
  },
  {
    icon: <FaUserCheck size={40} className="mx-auto text-purple-400" />,
    label: 'Reputation That Grows With You',
  },
];

const steps = [
  {
    label: 'Deposit Collateral',
    desc: 'Lock stablecoins in a smart contract.',
  },
  {
    label: 'Get a Credit Builder Loan',
    desc: 'Receive a loan with fixed terms.',
  },
  {
    label: 'Make Monthly Payments',
    desc: 'Pay on time directly from your wallet.',
  },
  {
    label: 'Build Verifiable Credit',
    desc: 'Score grows, history is stored onchain.',
  },
  {
    label: 'Get Collateral Back',
    desc: 'After completion, funds return to your wallet.',
  },
  {
    label: 'Earn a Soulbound NFT',
    desc: 'Proof of your financial reputation.',
  },
];

const OnchainCreditSection = () => (
  <section className="bg-gradient-to-b from-[#1a093a] to-[#12081f] py-20 px-4 text-white">
    {/* Why Onchain Credit Matters */}
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Why Onchain <span className="text-brand-purple">Credit</span> Matters
      </h2>
      <p className="text-gray-300 mb-10">
        1.7 billion people are invisible to traditional finance. We flip the script with a fully transparent credit system onchain – no gatekeepers, no credit bureaus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col items-center">
            {f.icon}
            <span className="mt-4 text-base font-medium text-gray-100 text-center">
              {f.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Simple. Secure. Structured. */}
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-[#1a093a] rounded-3xl p-10 shadow-lg">
      {/* Illustration Placeholder */}
      <div className="flex-1 flex justify-center mb-8 md:mb-0">
        <div className="w-64 h-64 bg-gradient-to-br from-purple-700 to-blue-500 rounded-2xl flex items-center justify-center">
          {/* Replace with actual illustration if available */}
          <span className="text-6xl">🏦</span>
        </div>
      </div>
      {/* Steps */}
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Simple. Secure. Structured.</h3>
        <p className="text-gray-300 mb-6">Step-by-Step Interactive Flow.</p>
        <ul className="space-y-4 mb-6">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-700 text-white font-bold text-lg">
                {i + 1}
              </span>
              <div>
                <span className="font-semibold text-white">{step.label}</span>
                <div className="text-gray-400 text-sm">{step.desc}</div>
              </div>
            </li>
          ))}
        </ul>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg px-6 py-3 mt-2 hover:opacity-90 transition">
          Simulate Credit Building
        </button>
      </div>
    </div>
  </section>
);

export default OnchainCreditSection; 