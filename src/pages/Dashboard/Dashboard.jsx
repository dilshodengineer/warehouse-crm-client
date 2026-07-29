import React, { useEffect, useState } from 'react';
import PageWindow from "../../components/layout/PageWindow";
import StatisticsCard from '../../components/ui/StatisticsCard';
import { getCards } from "../../services/DashboardService";
import Cards from './Cards';
import { preconnect } from 'react-dom';

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dashboard, setDashboard] = useState({
        cards: [],
        salesChart: [],
        recentSales: [],
        topProducts: [],
        lowStock: [],
    });

    const fetchCards = async () => {

        try {
            setLoading(true);
            const response = await getCards();
            setDashboard(prev => ({
                ...prev,
                cards: response.cards
            }));
            
        }catch(e){

            setError(e.response.status || 'Xatolik yuz berdi.');

        }finally{
            setLoading(false);
        }
        
        
        
    }

    useEffect(() => {
        fetchCards();
    }, [])

    return (
        <PageWindow>

            <h3>Boshqaruv Paneli</h3>
            <div className="border-bottom mb-2"></div>
            <div className="container-fluid">
                <Cards cards={dashboard.cards} />
            </div>
        </PageWindow>
    )
};

export default Dashboard;