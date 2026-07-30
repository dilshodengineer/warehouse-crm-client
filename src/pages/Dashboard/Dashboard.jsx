import React, { useEffect, useState } from 'react';
import PageWindow from "../../components/layout/PageWindow";
import StatisticsCard from '../../components/ui/StatisticsCard';
import { getDashboard } from "../../services/DashboardService";
import Cards from './Cards';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import SalesChart from './SalesChart';

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dashboard, setDashboard] = useState({
        cards: [],
        sales_chart: [],
        recent_sales: [],
        top_products: [],
        low_stock: [],
    });

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const response = await getDashboard();

            setDashboard(response);

            console.log(
                response
            );


        } catch (e) {
            setError(
                e.response?.data?.message ??
                e.response?.status ??
                'Xatolik yuz berdi.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [])

    return (
        <PageWindow>

            <h3>Boshqaruv Paneli</h3>
            <div className="border-bottom mb-2"></div>

            {loading && <Loader />}

            {error && <Message type="danger" message={error} />}

            {!loading && !error && dashboard && (
                <div className="container-fluid">
                    <Cards cards={dashboard.cards} />

                    <SalesChart data={dashboard.sales_chart} />
                </div>
            )}

        </PageWindow>
    )
};

export default Dashboard;