import React from 'react'
import PageWindow from '../../components/layout/PageWindow'
import PaymentForm from '../../components/forms/PaymentForm'
import { formatPrice } from '../../utils/formatPrice'

const MakePayment = () => {
  return (
    <PageWindow>
        <h3>To'lovni amalga oshirish</h3>
        <div className="border-bottom"></div>
        <div className="row">
            <div className="col-md-5 mt-3">
                <PaymentForm/>
            </div>
            <div className="col-md-7">
                <h4>Salim aka</h4>
                <div className="border rounded-3 bg-light p-3">
                    <div className="d-flex gap-2">
                    <p className='fw-semibold m-0'>Qarzdorlik :</p>
                    <p className='text-danger m-0'>
                        {formatPrice(5000)} so'm
                    </p>
                </div>

                <div className="d-flex gap-2">
                    <p className='fw-semibold m-0'>Umumiy hisob :</p>
                    <p className='text-success m-0'>
                        {formatPrice(15000)} so'm
                    </p>
                </div>

                <div className="d-flex gap-2">
                    <p className='fw-semibold m-0'>To'langan :</p>
                    <p className='text-success m-0'>
                        {formatPrice(10000)} - so'm
                    </p>
                </div>  
                </div>

            </div>
        </div>
    </PageWindow>
  )
}

export default MakePayment