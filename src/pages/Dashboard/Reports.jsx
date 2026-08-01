import { useState } from "react";
import PageWindow from "../../components/layout/PageWindow";
import { getReport } from "../../services/DashboardService";
import Loader from "../../components/ui/Loader";
import Message from "../../components/ui/Message";
import Cards from "./Cards";

const Reports = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [report, setReport] = useState({
        cards: [],
    });

    const [filter, setFilter] = useState({
        from: "",
        to: "",
    });

    const handleChange = (e) => {
        setFilter(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const response = await getReport(filter);

            setReport(response);

        } catch (e) {
            setError(
                e.response?.data?.message ??
                e.response?.status ??
                "Xatolik yuz berdi."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWindow>

            <h3>Hisobotlar</h3>
            <div className="border-bottom mb-4"></div>

            <div className="card shadow-sm border-0">

                <div className="card-header bg-white">
                    <h5 className="mb-0">
                        Hisobot filtri
                    </h5>
                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row align-items-end g-3">

                            <div className="col-md-4">
                                <label className="form-label">
                                    Boshlanish sanasi
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="from"
                                    value={filter.from}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">
                                    Tugash sanasi
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="to"
                                    value={filter.to}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-4">

                                <button
                                    className="btn btn-primary w-100 d-flex gap-2 justify-content-center"
                                    type="submit"
                                >
                                    Hisobotni ko'rish

                                    <i className="bi bi-graph-up-arrow me-2"></i>
                                </button>

                            </div>

                        </div>

                    </form>

                </div>

                {loading && <Loader />}

                {error && (
                    <Message
                        type="danger"
                        message={error}
                    />
                )}

                {!loading && !error && report.cards.length > 0 && (
                    <div className="container-fluid mt-4">
                        <Cards cards={report.cards} />
                    </div>
                )}


            </div>

        </PageWindow>
    );
};

export default Reports;