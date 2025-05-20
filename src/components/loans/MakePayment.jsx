import React, { useState } from 'react';
import { useContract } from '../../utils/ContractContext';

const MakePayment = ({ loanDetails, onPaymentSuccess }) => {
  const { makePayment } = useContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleMakePayment = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await makePayment();
      
      if (result.success) {
        setSuccess(`Payment successful! Transaction hash: ${result.txHash.substring(0, 6)}...${result.txHash.substring(result.txHash.length - 4)}`);
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      } else {
        setError(result.error || 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Error making payment:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 p-2 rounded-md mb-4">
          {success}
        </div>
      )}
      
      <button
        onClick={handleMakePayment}
        disabled={isLoading || !loanDetails || !loanDetails.active}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isLoading || !loanDetails || !loanDetails.active
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white font-medium`}
      >
        {isLoading ? 'Processing...' : 'Make Payment'}
      </button>
      
      {!loanDetails?.active && (
        <p className="text-yellow-500 text-sm mt-2">
          No active loan found or loan is already completed.
        </p>
      )}
    </div>
  );
};

export default MakePayment;
