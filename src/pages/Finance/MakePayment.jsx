import React, { useEffect, useState } from 'react';
import PageWindow from '../../components/layout/PageWindow';
import PaymentForm from '../../components/forms/PaymentForm';
import { formatPrice } from '../../utils/formatPrice';
import { getSale } from '../../services/SaleService';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';

const MakePayment = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [forbidden, setForbidden] = useState(false);
    const [error, setError] = useState(null);
    const [sale, setSale] = useState({ items: [], });

    const fetchSale = async () => {
        try {
            setLoading(true)
            const response = await getSale(id);

            setSale({
                items: [],
                ...response,
            });

            if (response.payment_status === 'paid'){
                navigate('/sales/history');
            }

        } catch (e) {

            if (error.status.code === 403) {
                setForbidden(true);
            } else { setError('xatolik yuz berdi.'); }

        } finally {
            setLoading(false);
        };
    }
    useEffect(() => {
        fetchSale();
    }, []);

    return (
        <PageWindow>
            <h3>To'lovni amalga oshirish</h3>
            <div className="border-bottom"></div>

            {loading && <Loader />}

            {error && <Message message={error} type="danger" />}

            {forbidden && <Message message='Bu sahifadan faqat "Ega" foydalana oladi' type="danger" />}

            {!loading && !error && !forbidden && sale && (
                <div className="row mt-3">
                    <div className="col-md-5 mt-3">
                        <PaymentForm saleId={sale.id}/>
                    </div>
                    <div className="col-md-7">
                        <h4>Salim aka</h4>
                        <div className="border rounded-3 bg-light p-3">
                            <div className="d-flex gap-2">
                                <p className='fw-semibold m-0'>Qarzdorlik :</p>
                                <p className='text-danger m-0'>
                                    {formatPrice(sale.total_amount - sale.paid_amount)}
                                </p> - so'm
                            </div>

                            <div className="d-flex gap-2">
                                <p className='fw-semibold m-0'>Umumiy hisob :</p>
                                <p className='text-success m-0'>
                                    {formatPrice(sale.total_amount)}
                                </p> - so'm
                            </div>

                            <div className="d-flex gap-2">
                                <p className='fw-semibold m-0'>To'langan :</p>
                                <p className='text-success m-0'>
                                    {formatPrice(sale.paid_amount)} - so'm
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            <div className="border-bottom mt-4 mb-2"></div>

        </PageWindow>
    )
}

export default MakePayment