import React, { useEffect, useState } from 'react'
import PageWindow from '../../components/layout/PageWindow'
import DebtsTable from '../../components/tables/DebtsTable'
import { getDebts } from '../../services/DebtService'
import Loader from '../../components/ui/Loader'
import Message from '../../components/ui/Message'

const Debts = () => {

    const [forbidden, setForbidden] = useState(false);
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchDebts = async () => {
        try {
            setLoading(true);
            const response = await getDebts(currentPage);
            setLastPage(response.lastPage);
            setData(response.data);
            

        } catch (e) {
            if(e.response.status === 403){
                setForbidden(true);
            } else {
                setError('Xatolik yuz berdi');
            }

            console.log(e.response.status)

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDebts()
    }, [currentPage]);


    return (
        <PageWindow>
            <h3>Qarzdorlar</h3>
            <div className="border-bottom mb-2"></div>

            {loading && <Loader/>}
            
            {error && <Message message={error} type="danger"/>}

            {forbidden && <Message message='Bu sahifadan faqat "Ega" foydalana oladi' type="danger"/>}
            
            {!loading && !error && !forbidden && data && (
                <DebtsTable debts={data} />
            )}
            
        </PageWindow>
    )
}

export default Debts