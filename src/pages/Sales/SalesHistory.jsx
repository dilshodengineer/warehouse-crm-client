import React, {useEffect, useState} from 'react'
import {getSalesHistory} from "../../services/SaleService";

function SalesHistory() {
  const [isLoading, setIsloading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchSalesHistory = async () => {

      try{
        const response = getSalesHistory();
        setData(data);
      } catch (err){
        return err
      }
    }
  }, [])
  return (
    <div>SalesHistory</div>
  )
}

export default SalesHistory