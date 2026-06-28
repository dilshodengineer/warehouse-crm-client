import React, {useEffect, useState} from 'react';
import PageWindow from "../../components/layout/PageWindow";
import {getSalesHistory} from "../../services/SaleService";
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";
import Pagination from "../../components/ui/Pagination";
import {formatDate} from "../../utils/formatDate";
import SearchBar from "../../components/ui/searchBar";
import { Link } from "react-router-dom";
import PaymentStatus from "../../components/ui/payment-status/PaymentStatus";

function SalesHistory() {

  const [isLoading, setIsloading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {

    const fetchSalesHistory = async () => {

      try {
        setIsloading(true)
        const response = await getSalesHistory(currentPage);

        setData(response.data);
        setLastPage(response.last_page);

      } catch (err) {
        setErrors(err.response?.data?.errors || "Haatolik yuz berdi.");

      } finally {
        setIsloading(false);
      }
    }

    fetchSalesHistory();
  }, [currentPage]);


  return (
    isLoading ? (
      <PageWindow>
        <h3>Savdolar</h3>
        <Loader/>
      </PageWindow>
    ) : errors ? (
      <Message message={errors.message} type="danger"/>
    ) : data.length === 0 ? (
      <Message message="Hozircha savdo tarixi bo'sh."/>
    ) : (
      <PageWindow>

        <h3>Savdolar</h3>
        <div className="border-bottom my-2"></div>
        <div className="d-flex justify-content-center">
          <SearchBar/>
        </div>
        <div className="border-bottom my-2"></div>
        <table className="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th>Ismi</th>
            <th>Sana</th>
            <th>Aloqa</th>
            <th>Status</th>
            <th>Boshqa</th>
          </tr>
          </thead>
          <tbody>
          {
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.customer}</td>
                <td>
                  <small>
                    {formatDate(item.created_at)}
                  </small>
                </td>
                <td>{item.phone}</td>
                <td>
                  <PaymentStatus status={item.payment_status}/>
                </td>
                <td>
                  <div className="d-flex gap-4 align-items-center">
                    <small>
                      <Link to={`/sales/history/${item.id}`} className="text-secondary">
                        Batafsil <i className="bi bi-box-arrow-up-right"></i>
                      </Link>
                    </small>
                    <button className="btn btn-success btn-sm px-3 rounded-5">
                      To'lov
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage}/>
      </PageWindow>
    )
  )
}

export default SalesHistory