import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PageWindow from '../../components/layout/PageWindow';
import ReceiptTable from '../../components/layout/sales/ReceiptTable';
import PaymentStatus from '../../components/ui/payment-status/PaymentStatus';
import { formatPrice } from "../../utils/formatPrice";

import { getSale } from '../../services/SaleService';
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";

function CustomerReceipt() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState({
    items: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNavigate = (sale, id) => {
    navigate('/receipt', {
      state: {
        sale,
        from: "/sales/history/" + id,
      }
    });
  }

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
        <Loader />
      </PageWindow>
    );
  }

  if (error) {
    return (
      <PageWindow>
        <Message message={error} type="danger" />
      </PageWindow>
    );
  }

  return (
    <PageWindow>
      <div className="d-flex justify-content-between align-items-end mb-3">
        <h4>Haridor ma'lumotlari</h4>
        <button
          onClick={() => handleNavigate(sale, sale.id)}
          className="btn btn-primary px-3 rounded-5 px-4"
        >
          chop etish <i class="bi bi-printer"></i>
        </button>
      </div>

      <div className="border-bottom border-secondary mb-4 mt-2">
      </div>

      <div className="row">
        <div className="col-md-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Haridorning ismi:</th>
                <td>{sale.customer}</td>
              </tr>

              <tr>
                <th>Aloqa uchun:</th>
                <td>
                  <a
                    href={`tel:${sale.phone}`}
                    className="text-secondary"
                  >
                    {sale.phone}
                  </a>
                </td>
              </tr>

              <tr>
                <th>Status:</th>
                <td><PaymentStatus status={sale.payment_status} /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="col-md-6">
          <table className="table table-striped">

            <tbody>
              <tr>
                <th>Umumiy hisob:</th>
                <td>
                  <b className="text-success">
                    {formatPrice(sale.total_amount)}
                  </b> - so'm
                </td>
              </tr>

              <tr>
                <th>To'langan:</th>
                <td>
                  <b className="text-success">
                    {formatPrice(sale.paid_amount)}
                  </b> - so'm
                </td>
              </tr>

              <tr>
                <th>Qarzdorlik:</th>
                <td>
                  <div className="mb-1">
                    <b className='text-danger'>
                      {formatPrice(sale.total_amount - sale.paid_amount)}
                    </b> - so'm
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-bottom border-secondary my-2">
      </div>

      <h4 className="mt-4">Sotilgan mahsulotlar</h4>

      <div className="border-bottom border-secondary my-2">
      </div>

      <ReceiptTable items={sale.items} />
    </PageWindow>
  );
}

export default CustomerReceipt;