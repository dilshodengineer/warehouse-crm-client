import React from 'react';
import { Link } from 'react-router-dom';

const EmployeesTable = ({ employees }) => {
    return (
        <table className='table align-middle'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ismi / Logini</th>
                    <th>Roli</th>
                    <th>Boshqa</th>
                </tr>
            </thead>

            <tbody>

                {
                    employees.map((employee, index) => (

                        <tr key={index}>
                            
                            <td>{index + 1}</td>

                            <td>
                                <p className='my-0'>
                                    {employee.name}
                                </p>
                                <p className='my-0 mb-1 small text-secondary'>
                                    {employee.username}
                                </p>
                            </td>

                            <td>
                                <b className='text-success'>
                                    {employee.role === 'worker'? "Ishchi" : "Admin" }
                                </b>
                            </td>

                            <td>
                                <div className="d-flex gap-2">
                                    <Link to={`/employees/${employee.id}/edit`} className="btn btn-secondary btn-sm">
                                        <i className="bi bi-three-dots"></i> <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button className="btn btn-dark btn-sm">
                                        <i className="bi bi-trash3"></i>
                                    </button>
                                </div>
                            </td>

                        </tr>

                    ))
                }
            </tbody>
        </table>
    )
}

export default EmployeesTable;