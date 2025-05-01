import React, { forwardRef } from 'react';

const HowItWorks = (props, ref) => {
  return (
    <section ref={ref} className="w-full py-8 px-2 sm:px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-brand-purple">How It Works</h1>
      <p className="text-lg text-gray-200 mb-8 text-center max-w-2xl mx-auto">
        Build your onchain credit score and unlock financial opportunities. Our platform helps you establish a verifiable credit history on the blockchain—safely, transparently, and on your own terms.
      </p>
      <ol className="space-y-8 max-w-2xl mx-auto">
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">1. Sign Up &amp; Connect</h2>
          <p className="text-gray-300">Start by connecting your crypto wallet and completing a quick identity check (KYC). Once verified, you can begin your credit-building journey.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">2. Deposit Collateral</h2>
          <p className="text-gray-300">Deposit a fixed amount (e.g., $100 in stablecoins) into a smart contract. This acts as security for your credit builder loan and is fully refundable once the loan is completed.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">3. Receive Your Loan</h2>
          <p className="text-gray-300">A smart contract automatically creates a credit builder loan equal to your deposit. For example, a $100 loan is issued at a low interest rate over 12 months. You'll see your payment plan upfront—no surprises.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">4. Make Monthly Payments</h2>
          <p className="text-gray-300">Each month, you pay a small amount (e.g., $8.67) directly from your wallet. Payments are split between the loan principal and interest. All activity is recorded on-chain to create a transparent and tamper-proof credit history.</p>
          <ul className="list-disc list-inside text-gray-400 mt-2 ml-4">
            <li>On-time payments improve your score</li>
            <li>Missed payments may lower it and include penalties</li>
          </ul>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">5. Complete the Loan &amp; Get Rewarded</h2>
          <p className="text-gray-300 mb-2">After 12 months of on-time payments:</p>
          <ul className="list-disc list-inside text-gray-400 ml-4">
            <li>Your original $100 deposit is returned</li>
            <li>You receive a blockchain-based Credit History NFT</li>
            <li>Your onchain credit score is updated and displayed in your dashboard</li>
          </ul>
          <p className="text-gray-300 mt-2">This score helps unlock better financial products and opportunities on our platform and across DeFi.</p>
        </li>
        <li>
          <h2 className="text-xl font-semibold text-white mb-1">6. Track &amp; Grow Your Score</h2>
          <p className="text-gray-300 mb-2">Use your personal dashboard to:</p>
          <ul className="list-disc list-inside text-gray-400 ml-4">
            <li>View your current credit score and payment history</li>
            <li>Track your loan progress and next payment due</li>
            <li>Access new financial offers based on your score</li>
          </ul>
          <p className="text-gray-300 mt-2">As your credit grows, so do your options.</p>
        </li>
      </ol>
      <div className="mt-10 text-center">
        <h3 className="text-2xl font-bold text-brand-purple mb-2">Ready to build your credit the smart way?</h3>
        <p className="text-lg text-gray-200 mb-4">Start today and take control of your financial future—onchain.</p>
      </div>
    </section>
  );
};

export default forwardRef(HowItWorks); 