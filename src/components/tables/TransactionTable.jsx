import React from 'react'

const TransactionTable = () => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Kimga / Qayerga</th>
                    <th>Izoh</th>
                    <th>Status</th>
                    <th>Boshqa</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Ishchilar uchun</td>
                    <td>Yuk tushurilgan</td>
                    <td>
                        <span className="d-inline-block bg-danger border-danger border bg-opacity-25 rounded-4 py-1 px-3 text-danger small">
                            Chiqim <i className="bi bi-upload"></i>
                        </span>
                    </td>
                    <td>
                        <div className="d-flex gap-3">
                            <span>20.06.2026</span>
                            <a href="" className="text-secondary">
                                Batafsil <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>2</td>
                    <td>Qarzdorlik uchun</td>
                    <td>Savdodan</td>
                    <td>
                        <span className="d-inline-block bg-success border border-success bg-opacity-25 rounded-4 py-1 px-3 text-success small">
                            Tushum <i className="bi bi-download"></i>
                        </span>
                    </td>
                    <td>
                        <div className="d-flex gap-3">
                            <span>20.06.2026</span>
                            <a href="" className="text-secondary">
                                Batafsil <i class="bi bi-box-arrow-up-right"></i>
                            </a>
                        </div>
                    </td>
                </tr>

            </thead>
        </table>
    )
}

export default TransactionTable