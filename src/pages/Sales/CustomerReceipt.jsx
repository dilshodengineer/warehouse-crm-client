import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageWindow from '../../components/layout/PageWindow';
import ReceiptTable from '../../components/layout/sales/ReceiptTable';
import PaymentStatus from '../../components/ui/payment-status/PaymentStatus';

import { getSale } from '../../services/SaleService';
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";

function CustomerReceipt() {
  const { id } = useParams();

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
      <h3>Sotib olingan mollar</h3>

      <div className="border-bottom mb-4 mt-2" />

      <div className="row">
        <div className="col-md-5">
          <table className="table table-striped">
            <tbody>
            <tr>
              <td>Ismi</td>
              <td>{sale.customer}</td>
            </tr>

            <tr>
              <td>To'lov</td>
              <td>
                <PaymentStatus status={sale.payment_status} />
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

      <div className="border-bottom mb-3" />

      <h5>Sotib olingan mahsulotlar</h5>

      <ReceiptTable items={sale.items} />
    </PageWindow>
  );
}

export default CustomerReceipt;