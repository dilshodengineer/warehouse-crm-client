import React from 'react';
import PageWindow from "../../components/layout/PageWindow";
import StatisticsCard from '../../components/ui/StatisticsCard';

const Dashboard = () => {
    return (
        <PageWindow>
            <h3>Boshqaruv Paneli</h3>
            <div className="border-bottom mb-2"></div>
            <div className="container-fluid">
                <div className="row">
                    <StatisticsCard count={"10+"} text={"Xodimlar"}/>
                </div>
            </div>
        </PageWindow>
    )
};

export default Dashboard;