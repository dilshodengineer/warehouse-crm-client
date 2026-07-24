import React from 'react'
import Input from '../ui/Input'

const PaymentForm = () => {
  return (
    <form className='row'>
        <div>
            <Input
            type='text'
            label="To'lov miqdorini kiriting"
            id='payment'
            placeholder="To'lov miqdori"
            value={null}
            onChange={() => {}}
            />
            <div className="my-2 border-bottom"></div>
            <button className="my-btn-success rounded-2 w-100 py-2">Bajarish</button>
        </div>
    </form>
  )
}

export default PaymentForm