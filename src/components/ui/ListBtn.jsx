import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'

const ListBtn = () => {
    const cart = useCartStore(state => state.cart);

    const badgeCount = cart.length;

    return (
        badgeCount === 0
            ?
            ""
            :
            <Link to="/sales/list" className="btn btn-dark px-3 btn-sm rounded-5 mx-1">
                <div className="d-flex align-items-center gap-1">
                    <i className="bi bi-list-task"></i>
                    <span className='mx-1'>Ro'yxat</span>
                    <span className="badge text-bg-danger rounded-4">{badgeCount}</span>
                </div>
            </Link>
    )
}

export default ListBtn