import React from 'react'
import { FaLink, FaLock, FaBrain, FaGlobe, FaBuilding } from 'react-icons/fa';

const WhySection = () => {
  return (
    <div>
        <div className="w-full max-w-6xl px-4 mt-auto"> {/* Use mt-auto to push to bottom in flex container */}
          <div className="flex justify-between items-center text-center text-white text-opacity-80 py-6">
              
              <div className="flex flex-col items-center gap-2">
                  <FaLink size={24} /> 
                  <span className="font-be-vietnam-pro text-sm">Wallet-Based Identity</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  <FaLock size={24} />
                  <span className="font-be-vietnam-pro text-sm">Non-custodial Funds</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  <FaBrain size={24} />
                  <span className="font-be-vietnam-pro text-sm">Onchain Credit Score</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  <FaGlobe size={24} />
                  <span className="font-be-vietnam-pro text-sm">NFT Loan Certificates (Soulbound)</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  <FaBuilding  size={24}/>
                  <span className="font-be-vietnam-pro text-sm">DAO-ready Governance</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default WhySection 