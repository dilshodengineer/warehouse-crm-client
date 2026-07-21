import React, { useEffect, useState } from 'react';
import PageWindow from '../../components/layout/PageWindow';
import { getEemployees } from '../../services/EmployeeService';
import EmployeesTable from '../../components/tables/EmployeesTable';
import Loader from '../../components/ui/Loader';
import Message from '../../components/ui/Message';

const Employees = () => {

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const fetchEmloyees = async () => {

    try {

      setLoading(true)

      const response = await getEemployees();
      setData(response);
      console.log(response);

    } catch (e) {

      setError(e.response.status);
      console.log(e.response);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchEmloyees();

  }, []);


  return (
    <PageWindow>
      <h4>Xodimlar</h4>
      <div className="border-bottom mb-2"></div>
      
      {loading && <Loader/>}

      {error === 403 && <Message type='danger' message='Bu sahifa faqat "Ega" uchun.'/> }

      {!loading && !error && (
        <EmployeesTable employees={data} />
      )}

    </PageWindow>
  )
};

export default Employees;