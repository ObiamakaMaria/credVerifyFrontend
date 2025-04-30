import React, { useState } from 'react';

const CreateCreditBuilderLoan = () => {
  // Simple state for UI demonstration
  const [formData, setFormData] = useState({
    stablecoin: "0x123...",
    amount: 500,
    tokenURI: "ipfs://...",
  });
  
  const [amountInput, setAmountInput] = useState(formData.amount);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  
  // Mock data for UI demonstration
  const account = "0x123...";
  const error = "";
  const approvedStablecoins = ["0x123...", "0x456..."];
  const stablecoinNames = {
    "0x123...": "USDC",
    "0x456...": "DAI"
  };
  
  // Handle slider change
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Handle direct input change
  const handleInputChange = (e) => {
    setAmountInput(e.target.value);
  };
  
  // Apply input value to the form data
  const applyAmount = () => {
    const value = Math.min(5000, Math.max(50, parseInt(amountInput) || 50));
    setFormData({
      ...formData,
      amount: value
    });
    setAmountInput(value);
  };
  
  // Mock approval action
  const handleApprove = () => {
    setIsLoading(true);
    // Simulate approval process
    setTimeout(() => {
      setIsApproved(true);
      setIsLoading(false);
    }, 1000);
  };
  
  // Mock submission action
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate transaction
    setTimeout(() => {
      alert("Credit builder loan created successfully!");
      setIsLoading(false);
    }, 1500);
  };
  
  // Simple calculation for display
  const calculateMonthlyPayment = (amount) => {
    const principal = parseFloat(amount);
    const monthlyRate = 8 / (12 * 100); // 8% APR
    const term = 12; // 12 months
    const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / 
                   (Math.pow(1 + monthlyRate, term) - 1);
    return payment.toFixed(2);
  };
  
  const monthlyPayment = calculateMonthlyPayment(formData.amount);
  const totalRepayment = (parseFloat(monthlyPayment) * 12).toFixed(2);
  
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Create Credit Builder Loan</h1>
      
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {account ? (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Builder Loan Application</h2>
          
          <p className="text-gray-300 mb-6">
            Credit builder loans help establish or improve your credit score by demonstrating 
            your ability to make consistent, on-time payments. You'll deposit collateral 
            that will be held until the loan is repaid.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Select Stablecoin</label>
              <select
                name="stablecoin"
                value={formData.stablecoin}
                onChange={(e) => setFormData({...formData, stablecoin: e.target.value})}
                className="bg-gray-700 w-full p-2 rounded-md"
                disabled={isLoading}
              >
                {approvedStablecoins.length === 0 && (
                  <option value="">No approved stablecoins found</option>
                )}
                
                {approvedStablecoins.map((address) => (
                  <option key={address} value={address}>
                    {stablecoinNames[address] || address.substring(0, 8) + '...'}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Collateral Amount</label>
              <div className="flex items-center mb-2">
                <input
                  type="range"
                  name="amount"
                  min="50"
                  max="5000"
                  step="50"
                  value={formData.amount}
                  onChange={handleSliderChange}
                  className="w-full mr-4"
                  disabled={isLoading}
                />
                <span className="text-lg font-semibold">${formData.amount}</span>
              </div>
              <div className="flex items-center">
                <div className="relative flex-grow mr-2">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    name="amountInput"
                    min="50"
                    max="5000"
                    step="50"
                    value={amountInput}
                    onChange={handleInputChange}
                    onBlur={applyAmount}
                    className="bg-gray-700 w-full p-2 pl-7 rounded-md"
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="button"
                  onClick={applyAmount}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-2 rounded-md"
                  disabled={isLoading}
                >
                  Set
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Minimum deposit: $50 | Maximum: $5,000
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">NFT Metadata URI (optional)</label>
              <input
                type="text"
                name="tokenURI"
                value={formData.tokenURI}
                onChange={(e) => setFormData({...formData, tokenURI: e.target.value})}
                placeholder="ipfs://..."
                className="bg-gray-700 w-full p-2 rounded-md"
                disabled={isLoading}
              />
              <p className="text-sm text-gray-400 mt-1">
                IPFS URI for your NFT metadata (leave as is if unsure)
              </p>
            </div>
            
            <div className="p-4 bg-gray-700 rounded-md mb-6">
              <h3 className="font-semibold mb-2">Loan Summary</h3>
              <div className="flex justify-between mb-1">
                <span>Loan/Collateral Amount:</span>
                <span>${formData.amount}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Term:</span>
                <span>12 months (fixed)</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>APR:</span>
                <span>8%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Monthly Payment:</span>
                <span>${monthlyPayment}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total Repayment:</span>
                <span>${totalRepayment}</span>
              </div>
            </div>
            
            {!isApproved ? (
              <button
                type="button"
                onClick={handleApprove}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 mb-4"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Approve Stablecoin"}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Create Credit Builder Loan"}
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <p className="mb-4">Please connect your wallet to continue</p>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
            onClick={() => alert("Wallet connection would be triggered here")}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateCreditBuilderLoan;