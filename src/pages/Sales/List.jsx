import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUnitBadge } from '../../utils/getUnitBadge';
import Input from "../../components/ui/Input";
import { formatPrice, formatPriceInput } from "../../utils/formatPrice";
import { useCartStore } from '../../stores/cartStore';
import { createSale } from '../../services/SaleService';
import Message from '../../components/ui/Message';

const List = () => {

    const navigate = useNavigate();

    const [disable, setDisable] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState('+998');
    const [payment, setPayment] = useState('');

    const cart = useCartStore(state => state.cart);
    const totalAmount = useCartStore(state => state.getTotalAmount());

    const updateQuantity = useCartStore(state => state.updateQuantity);
    const increaseQuantity = useCartStore(state => state.increaseQuantity);
    const decreaseQuantity = useCartStore(state => state.decreaseQuantity);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const clearCart = useCartStore(state => state.clearCart);


    const handlePriceChange = (e) => {
        setPayment(formatPriceInput(e.target.value));
    };

    const handleSell = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                items: cart.map(item => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    unit: item.unit,
                    price: Number(item.price),
                    quantity: Number(item.quantity),
                })),
                customer: customerName,
                phone,
                paid_amount: payment,
                payless: disable,
                discount: 0,
            }

            const response = await createSale(payload);

            if (response.data.success) {
                const sale = response.data.data;

                navigate('/receipt', {
                    state: {
                        sale,
                        from: "/sales/new"
                    }
                });

                clearCart();
            }

            console.log(response.data);

        } catch (err) {
            console.log(err);
        }

    }


    return (
        <div className="row">
            <div className="col-12">
                <div className="border rounded-3 shadow-sm p-3 bg-white">
                    <h4>Ro'yxat</h4>
                    <div className="border-top my-2"></div>
                    {
                        cart.length === 0
                            ?
                            <Message message={"Xozircha ro'yxat bo'sh."} type={"warning"} />
                            :
                            <>

                                <table className="table align-middle table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nomi</th>
                                            <th>Narxi</th>
                                            <th>Miqdor</th>
                                            <th>
                                                <i className="bi bi-three-dots"></i>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => {
                                                const unitBadge = getUnitBadge(item.unit);
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>

                                                        <td>{item.product_name}</td>

                                                        <td>
                                                            <div className="d-flex gap-1">
                                                                <span className='text-success'>{formatPrice(item.price)}</span>
                                                                <span>so'm</span>
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="d-flex align-items-center gap-1">
                                                                <button
                                                                    className="btn btn-warning px-2 py-0 text-white btn-sm"
                                                                    onClick={() => decreaseQuantity(item.product_id)}
                                                                >
                                                                    <span className="fs-5">-</span>
                                                                </button>

                                                                <input
                                                                    type="number"
                                                                    className="quantity-input"
                                                                    value={item.quantity}
                                                                    onChange={
                                                                        (e) =>
                                                                            updateQuantity(item.product_id, e.target.value)}
                                                                />

                                                                <button
                                                                    className="btn btn-warning text-white btn-sm"
                                                                    onClick={() => increaseQuantity(item.product_id)}
                                                                >
                                                                    +
                                                                </button>
                                                                <b>:</b>
                                                                <small
                                                                    className={`px-2 py-0 bg-opacity-25 rounded-4 ${unitBadge.status}`}>
                                                                    {unitBadge.content}
                                                                </small>

                                                            </div>
                                                        </td>

                                                        <td>
                                                            <button className="btn btn-danger btn-sm"
                                                                onClick={() => removeFromCart(item.product_id)}>
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>

                                <div className="border-top my-2"></div>

                                <div className="d-flex justify-content-end gap-1 fs-5">
                                    <span>Umumiy hisob:</span>
                                    <span className="text-success fw-semibold">
                                        {formatPrice(totalAmount)}
                                    </span>
                                    <span>so'm</span>
                                </div>

                                <div className="border-top my-2"></div>

                                <form onSubmit={handleSell}>
                                    <div className="d-flex gap-3">
                                        <Input type='text'
                                            placeholder="Pul..."
                                            label="To'lanayotgan pul"
                                            id='money'
                                            className={`mt-1 mb-3 py-2 ${disable ? 'bg-light border' : ''}`}
                                            value={payment}
                                            onChange={handlePriceChange}
                                            disabled={disable}
                                        />

                                        <div className="d-flex flex-column">
                                            <label>To'lov yo'q</label>
                                            <input
                                                type="checkbox"
                                                className='form-check-input mt-2'
                                                onChange={(e) => setDisable(e.target.checked)}
                                            />
                                        </div>

                                    </div>
                                    <div className="d-flex gap-3">
                                        <Input
                                            type='text'
                                            placeholder="Ism Familiya..."
                                            label="Haridorning to'liq ismi"
                                            id="fullname"
                                            className="mt-1 mb-3 py-2"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                        />
                                        <Input
                                            type="text"
                                            placeholder="Telefon raqam..."
                                            label='Telefon raqami'
                                            id='call'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)} />

                                    </div>
                                    <div className="text-end">
                                        <button className="btn btn-primary">Sotishni Tasdiqlash</button>
                                    </div>
                                </form>

                            </>
                    }
                    <div className="border-top my-2"></div>
                </div>
            </div>
        </div>
    )
}

export default List