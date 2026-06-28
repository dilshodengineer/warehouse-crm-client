import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import PageWindow from '../../components/layout/PageWindow';
import ReceiptTable from '../../components/layout/sales/ReceiptTable';
import PaymentStatus from '../../components/ui/payment-status/PaymentStatus';
import {formatPrice} from "../../utils/formatPrice";

import {getSale} from '../../services/SaleService';
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";

function CustomerReceipt() {
  const {id} = useParams();

  const [sale, setSale] = useState({
    items: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      try {
        setError(null);

        const response = await getSale(id);

        setSale({
          items: [],
          ...response,
        });
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          "Sotuv ma'lumotlarini yuklashda xatolik yuz berdi."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  if (isLoading) {
    return (
      <PageWindow>
        <Loader/>
      </PageWindow>
    );
  }

  if (error) {
    return (
      <PageWindow>
        <Message message={error} type="danger"/>
      </PageWindow>
    );
  }

  return (
    <PageWindow>
      <h3>Savdo ma'lumotlari</h3>

      <div className="border-bottom border-secondary mb-4 mt-2">
      </div>

      <div className="row">
        <div className="col-md-5">
          <table className="table table-bordered">
            <tbody>
            <tr>
              <td>Haridor</td>
              <td>{sale.customer}</td>
            </tr>

            <tr>
              <td>To'lov</td>
              <td>
                <div className="d-flex gap-2 align-items-center">
                  <PaymentStatus status={sale.payment_status}/>
                  <span>{formatPrice(sale.paid_amount)} so'm</span>
                </div>
              </td>
            </tr>

            <tr>
              <td>Telefon</td>
              <td>
                <a
                  href={`tel:${sale.phone}`}
                  className="text-secondary"
                >
                  {sale.phone}
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-bottom border-secondary my-2">
      </div>

      <h5 className="mt-4">Sotib olingan mahsulotlar</h5>

      <div className="border-bottom border-secondary my-2">
      </div>

      <ReceiptTable items={sale.items}/>
    </PageWindow>
  );
}

export default CustomerReceipt;