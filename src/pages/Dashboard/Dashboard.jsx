import React, { useEffect, useState } from 'react';
import PageWindow from "../../components/layout/PageWindow";
import StatisticsCard from '../../components/ui/StatisticsCard';
import { getDashboard } from "../../services/DashboardService";
import Cards from './Cards';
import Message from '../../components/ui/Message';
import Loader from '../../components/ui/Loader';
import SalesChart from './SalesChart';
import RecentSales from './RecentSales';
import TopProducts from './TopProducts';
import LowStock from './LowStock';
import { Link } from 'react-router-dom';

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
            <div className="border-bottom border-top mb-2">
                <div className="py-2 btn-group">
                    <a href="#total" className='btn btn-outline-primary'>Umumiy korsatgichlar</a>
                    <a href="#monthly" className='btn btn-outline-primary'>30 kunlik savdo</a>
                    <a href="#recently" className='btn btn-outline-primary'>Oxirgi 10 ta savdo</a>
                    <a href="#top" className='btn btn-outline-primary'>Top sotilgan mahsulotlar</a>
                    <a href="#low-stock" className='btn btn-outline-primary'>Kam Qolgan Mahsulotlar</a>
                    <Link to="/reports" className='btn btn-outline-primary'>Ma'lum vaqt xisoboti <i className="bi bi-calendar-month"></i> <i className="bi bi-search"></i></Link>
                </div>
            </div>


            {loading && <Loader />}

            {error && <Message type="danger" message={error} />}

            {!loading && !error && dashboard && (
                <div className="container-fluid pb-3">
                    <Cards cards={dashboard.cards} />

                    <SalesChart chartData={dashboard.sales_chart} />

                    <RecentSales recentSales={dashboard.recent_sales} />

                    <TopProducts products={dashboard.top_products}/>

                    <LowStock products={dashboard.low_stock}/>
                </div>
            )}

        </PageWindow>
    )
};

export default Dashboard;