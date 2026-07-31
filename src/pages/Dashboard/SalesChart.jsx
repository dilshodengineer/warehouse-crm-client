import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, } from "recharts";

const SalesChart = ({ chartData }) => {
    return (
        <div className='row mt-4'>
            <div className="col-lg-12">

                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className='mb-0 fw-semibold'>Oxirgi 30 kunlik savdo</h5>
                    </div>

                    <div className="card-body">
                        <ResponsiveContainer width="100%" height={350}>

                            <LineChart data={chartData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="sales"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SalesChart