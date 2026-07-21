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

      setError(e.data);
      console.log(e.data);

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

      {error && <Message type='danger' message={error.data.message}/>}

      {!loading && !error && (
        <EmployeesTable employees={data} />
      )}

    </PageWindow>
  )
};

export default Employees;