import React from 'react'

const UsersTable = () => {
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
            <tr>
                <td>1</td>
                <td>
                    <p className='my-0'>Komiljon</p>
                    <p className='my-0 mb-1 small text-secondary'>super_admin</p>
                </td>
                <td>
                    <b>Super admin</b>
                </td>
                <td>
                    <div className="d-flex gap-2">
                        <button className="btn btn-secondary btn-sm">
                            <i className="bi bi-three-dots"></i> <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-dark btn-sm">
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  )
}

export default UsersTable