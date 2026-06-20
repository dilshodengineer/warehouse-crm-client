import React, {useEffect, useState} from 'react';
import PageWindow from "../../components/layout/PageWindow";
import ReceiptTable from "../../components/layout/sales/ReceiptTable";
import {useParams} from "react-router-dom";
import {getSale} from "../../services/SaleService";
import PaymentStatus from "../../components/ui/payment-status/PaymentStatus";

function CustomerReceipt() {

  const [sale, setSale] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const {id} = useParams();

  useEffect(() => {

    const fetchSoldReceipt = async () => {
      try {
        setIsLoading(true);
        const response = await getSale(id);

        setSale(response);

        console.log(response);

      } catch (err) {
        setErrors(err.response?.data?.errors || "Sotilgan mollarni yuklash bilan muammo.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSoldReceipt();
  }, [])


  return (
    <PageWindow>
      <h3>Sotib olingan mollar.</h3>
      <div className="border-bottom mb-4 mt-2"></div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-5">
            <table className="table table-striped">
              <tbody>
              <tr>
                <td>Ismi:</td>
                <td>{sale.customer}</td>
              </tr>
              <tr>
                <td>To'lov:</td>
                <td><PaymentStatus status={sale.payment_status}/></td>
              </tr>
              <tr>
                <td>Telefon:</td>
                <td><a href={`tel:998${sale.phone}`} className="text-secondary">{sale.phone}</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border-bottom mb-2"></div>
      <p className="fs-5 mt-3 mb-2 fw-semibold">Sotib olingan maxsulotlar</p>
      <ReceiptTable data={sale.items}/>
    </PageWindow>
  );
}

export default CustomerReceipt;