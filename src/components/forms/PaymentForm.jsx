import React, { useState } from 'react'
import Input from '../ui/Input'
import { useLocation } from 'react-router-dom'
import { formatPriceInput, parsePrice } from '../../utils/formatPrice';
import { payForDebt } from '../../services/DebtService';

const PaymentForm = ({ debtId }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState();

  const handleAmountChange = (e) => {
    setAmount(formatPriceInput(e.target.value));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError({});
    setMessage('');

    try {
      setLoading(true);

      const payload = {amount: amount};
      
      await payForDebt(debtId, payload);

    } catch (e) {

      if (e.response.status === 422 && e.response.data.errors.amount) {
        setError(e.response.data.errors);
      }else{
        setMessage("To'lov qilishda xatolik yuz berdi.");
      }

    } finally {
      setLoading(false);
    };

  }
  

  return (
    <form onSubmit={handleSubmit} className='row'>
      <div>
        <Input
          type='text'
          label="To'lov miqdorini kiriting"
          id='payment'
          placeholder="To'lov miqdori"
          value={amount}
          onChange={handleAmountChange}
          className='text-end'
        />

        {error.amount && ( 
          <small className='text-danger mt-2 d-block'>
            {error.amount[0]}
          </small>
        )}

        {message && (
          <small className='text-danger mt-2 d-block'>
            {message}
          </small>
        )}
        
        <div className="my-2 border-bottom"></div>
        <button type='submit' className="my-btn-success rounded-2 w-100 py-2">
          {loading ? "Kuting..." : "Amalga oshirish"}
        </button>

      </div>
    </form>
  )
}

export default PaymentForm;