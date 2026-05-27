import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <table className="table table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>Ismi</th>
                <th>Status</th>
                <th>Boshqarish</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Vali Jumayev</td>
                <td><div className="border border-success bg-success bg-opacity-25 text-success">Ishchi</div></td>
                <td>
                    <button className="btn btn-warning text-white">Boshqarish</button>
                </td>
            </tr>
            <tr>
                <td>2</td>
                <td>John Doe</td>
                <td><div className="border border-success bg-success bg-opacity-25 text-success">Ishchi</div></td>
                <td>
                    <button className="btn btn-warning text-white">Boshqarish</button>
                </td>
            </tr>
            <tr>
                <td>3</td>
                <td>Ali Hayitov</td>
                <td><div className="border border-success bg-success bg-opacity-25 text-success">Ishchi</div></td>
                <td>
                    <button className="btn btn-warning text-white">Boshqarish</button>
                </td>
            </tr>
            <tr>
                <td>4</td>
                <td>Kimdir</td>
                <td><div className="border border-success bg-success bg-opacity-25 text-success">Ishchi</div></td>
                <td>
                    <button className="btn btn-warning text-white">Boshqarish</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Dashboard