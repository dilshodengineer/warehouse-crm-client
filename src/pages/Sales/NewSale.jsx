import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/ProductService'
import StockUnitBadges from '../../components/ui/StockUnitBadges';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';
import SaleTable from '../../components/layout/sales/SaleTable';
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/searchBar";

const NewSale = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts(currentPage);

        setData(response.data);
        setLastPage(response.last_page);
      } catch (err) {
        setErrors(err.response?.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage]);


  return (
    <div className="row">
      <div className="col-12">
        <div className="border rounded-3 shadow-sm p-3 bg-white">
          <h3>Sotuvdagi mahsulotlar</h3>

          <div className="border-top mt-2"></div>
          <div className="d-flex justify-content-between align-items-center py-2">
            <StockUnitBadges />
            <SearchBar />
          </div>
          <div className="border-top mb-3"></div>
          {
            isLoading ? (
              <Loader />
            ) : errors ? (
              <Message message={errors} type="danger" />
            ) : data.length === 0 ? (
              <Message message="Xozircha mahsulotlar yo'q" />
            ) : (
              <>
                <SaleTable data={data} />
                <Pagination currentPage={currentPage} lastPage={lastPage} onPageChange={setCurrentPage} />
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default NewSale