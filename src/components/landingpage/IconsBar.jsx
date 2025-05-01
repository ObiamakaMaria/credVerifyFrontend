import React from 'react'
import { FaLink, FaLock, FaBrain, FaGlobe, FaBuilding } from 'react-icons/fa';

const IconsBar = () => {
  return (
    <div>
        <div className="w-full px-4 mx-auto mt-auto bg-[#12081f]">
          <div className="text-center text-white font-thin mb-4 font-be-vietnam-pro text-sm leading-[170%]">
            DeFi-Ready, User-Owned, Future-Proof.
          </div>
          <div className="flex justify-between text-center text-white pt-10">
              
              <div className="flex flex-col items-center gap-2">
                  {/* <FaLink size={20} />  */}
                  🔗
                  <span className="font-be-vietnam-pro text-sm pt-2">Wallet-Based Identity</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  {/* <FaLock size={20} /> */}
                  🔒
                  <span className="font-be-vietnam-pro text-sm pt-2">Non-custodial Funds</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  {/* <FaBrain size={20} /> */}
                  🧠
                  <span className="font-be-vietnam-pro text-sm pt-2">Onchain Credit Score</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  {/* <FaGlobe size={20} /> */}
                  🪙
                  <span className="font-be-vietnam-pro text-sm pt-2">NFT Loan Certificates (Soulbound)</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                  {/* <FaBuilding  size={20}/> */}
                  🏛️
                  <span className="font-be-vietnam-pro text-sm pt-2">DAO-ready Governance</span>
              </div>
          </div>
      </div>
    </div>
  )
}

export default IconsBar