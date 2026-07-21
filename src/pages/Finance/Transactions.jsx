import React, { useEffect, useState } from 'react'
import TransactionTable from '../../components/tables/TransactionTable'
import Pagination from '../../components/ui/Pagination'
import { getTransactions } from '../../services/TransactionService';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const Transactions = () => {

  const [forbidden, setForbidden] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);


  const fetchTransactions = async () => {

    try {

      setIsloading(true);

      const response = await getTransactions(currentPage);

      setData(response.data);
      setLastPage(response.last_page);
      setIsloading(false);

      console.log(response.data);


    } catch (e) {

      if (e.response.status === 403) {
        setForbidden(true);
      } else {
        setError("Xatolik yuz berdi");
      }

    } finally {
      setIsloading(false)
    }



  }

  useEffect(() => {

    fetchTransactions();

  }, [currentPage]);

  return (
    <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>
      <h3>Kirim va chiqim</h3>
      <div className="border-bottom mt-2 mb-4"></div>

      {isLoading && <Loader />}

      {forbidden && <Message type="danger" message='Bu sahifadan faqatgina "Ega" foydalana oladi.' type="danger" />}

      {error && <Message message={error} type="danger" />}

      {!isLoading && !error && !forbidden && (
        <>
          <TransactionTable transactions={data} />

          <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  )
}

export default Transactions