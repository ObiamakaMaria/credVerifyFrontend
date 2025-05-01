import React from 'react';
import { FaLock, FaChartLine, FaReceipt, FaCreditCard, FaIdBadge, FaChartBar, FaTools, FaBrain, FaStore } from 'react-icons/fa';

const features = [
  {
    icon: <FaLock className="text-blue-400 text-3xl mb-2" />,
    title: 'Smart Collateral System',
    desc: [
      'Secure your loan by depositing stablecoins into a smart contract.',
      'Collateral is safely locked and fully returned upon loan completion.',
      'No hidden fees or surprises.'
    ]
  },
  {
    icon: <FaChartLine className="text-green-400 text-3xl mb-2" />,
    title: 'Credit Builder Loans',
    desc: [
      'Borrow an amount equal to your deposit.',
      'Structured monthly payments with low, fixed interest.',
      'Payment plan is transparent and automated via smart contracts.'
    ]
  },
  {
    icon: <FaReceipt className="text-yellow-400 text-3xl mb-2" />,
    title: 'Onchain Payment Tracking',
    desc: [
      'Each payment is recorded on the blockchain.',
      'Verifiable, tamper-proof history that builds your credit.',
      'Pay manually or set up automatic payments from your wallet.'
    ]
  },
  {
    icon: <FaCreditCard className="text-purple-400 text-3xl mb-2" />,
    title: 'Real-Time Credit Score',
    desc: [
      'Your score updates with every payment.',
      'Key factors: payment history, consistency, loan duration, and amount.',
      'Easily monitor your score from your dashboard with visual insights.'
    ]
  },
  {
    icon: <FaIdBadge className="text-pink-400 text-3xl mb-2" />,
    title: 'Credit History NFT (Soulbound Token)',
    desc: [
      'Receive a Credit History NFT after completing each loan.',
      'Contains your full payment history and final credit score.',
      'Non-transferable and recognized across DeFi platforms.',
      'Selectively shareable with future lenders.'
    ]
  },
  {
    icon: <FaChartBar className="text-indigo-400 text-3xl mb-2" />,
    title: 'Personal Credit Dashboard',
    desc: [
      'View your credit score and history at a glance.',
      'Track payment due dates and loan progress.',
      'Get personalized tips for improving your score.',
      'Discover new financial opportunities as your score increases.'
    ]
  },
  {
    icon: <FaTools className="text-orange-400 text-3xl mb-2" />,
    title: 'Flexible Payment Tools',
    desc: [
      'Manual payments, automatic scheduling, and partial payment options.',
      'Real-time confirmation receipts.',
      'Reminders for upcoming due dates and alerts for late payments.'
    ]
  },
  {
    icon: <FaBrain className="text-cyan-400 text-3xl mb-2" />,
    title: 'Premium Credit Tools (Optional)',
    desc: [
      'Advanced credit analytics and trend breakdowns.',
      'Fast-track your credit growth with accelerated scoring.',
      'Request official credit score certificates for external use.',
      'Customize loan terms to fit your financial goals.'
    ]
  },
  {
    icon: <FaStore className="text-pink-500 text-3xl mb-2" />,
    title: 'Marketplace Access',
    desc: [
      'Discover loan products tailored to your credit score.',
      'Compare financial services and apply directly from the platform.',
      'See provider success rates and lending terms before committing.',
      'All powered by secure, audited smart contracts—giving you full control and transparency at every step.'
    ]
  },
];

const Features = () => {
  return (
    <section className="w-full py-12 px-2 sm:px-4 md:px-8 bg-[#12081f] text-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-brand-purple">Features</h1>
        <p className="text-lg text-gray-200 mb-10 text-center max-w-2xl mx-auto">
          Everything you need to build your credit—onchain, transparent, and secure. Explore the key features designed to help you take control of your financial reputation and unlock future opportunities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-[#1a093a] rounded-2xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow">
              {feature.icon}
              <h2 className="text-xl font-semibold text-white mb-2 text-center">{feature.title}</h2>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 text-left">
                {feature.desc.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 