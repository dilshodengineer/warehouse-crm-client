import React, { useEffect, useState } from 'react';
import PageWindow from '../../components/layout/PageWindow';
import EmployeeForm from '../../components/forms/EmployeeForm';
import { getEmployee } from '../../services/EmployeeService';
import { useParams } from 'react-router-dom';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';

const EditEmployee = () => {

    const { id } = useParams();

    

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchEmployee = async () => {

        try {

            setLoading(true);

            const employee = await getEmployee(id);

            setData(employee);

        } catch (e) {

            setError('Xodimni topsih muvaffaqiyatsiz.');

            console.log(e.status);


        } finally {
            setLoading(false);
        };

    }

    useEffect(() => {
        fetchEmployee();
    }, [id]);
    return (
        <PageWindow>
            <h3>Xodimni Taxrirlash</h3>

            {loading && <Loader />}

            {error && <Message message={error} type="danger" />}

            {!loading && !error && (
                <EmployeeForm employee={data} />
            )}

        </PageWindow>
    )
}

export default EditEmployee