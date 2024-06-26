import React from 'react';
import MetaData from '../Layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { cartItems, decreaseCartItemQty, increaseCartItemQty, removeCartItem } from '../../slices/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import cartEmpty from '../../assets/emptyCart.jpg';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const CartItems = useSelector(cartItems);
    const dispatch = useDispatch();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateSubtotal = () => {
        let grandTotal = 0;
        const itemsDetail = CartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                itemTotal
            };
        });
        return { itemsDetail, grandTotal };
    };

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseCartItemQty(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseCartItemQty(productId));
    };
  const navigate = useNavigate()
    const checkoutHandler = ()=>{
        navigate('/login?redirect=shipping')
    }
    return (
        <div className="container" style={{ minHeight: '100vh' }}>
            <MetaData title="Your Cart" />
            {CartItems.length === 0 ?
                <>
                    <div className='d-flex flex-column justify-content-center align-items-center w-100' style={{ height: '88vh' }}>
                        <img width='240px' src={cartEmpty} alt="" />
                        <h5>Your cart is empty</h5>
                        <p className='text-secondary' style={{ fontSize: '12px' }}>You can go to the home page to view more Products</p>
                        <Link to='/' className='btn border-0 text-white' style={{ background: 'rgb(252,128,25)', fontWeight: '500' }}>HOME PAGE</Link>
                    </div>
                </>
                :
                <>
                    <h2 className="mt-5">Your Cart: <b>{CartItems.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {CartItems && CartItems.map((item) => (
                                <div key={item.productId}>
                                    <hr />
                                    <div className="row m-0 w-100 align-items-center justify-content-center">
                                        <div className="col-3 justify-content-center col-lg-3 d-flex flex-column align-items-center">
                                            <img src={item.image} alt={item.name} style={{ objectFit: 'cover' }} height="auto" width={window.innerWidth < 850 ? '40' : '100'} />
                                            <Link style={{ textDecoration: 'underline', color: 'unset' }} className='mt-2' to={`/product/${item.productId}`}>{item.name}</Link>
                                        </div>
                                        <div className="col-3 d-flex justify-content-center col-lg-3 mt-4 mt-lg-0">
                                            <p id="card_item_price" style={{ color: '#F97B08' }} className='m-0'>{formatCurrency(item.price)}</p>
                                        </div>
                                        <div className={`col-5 p-1 d-flex align-items-center ${window.innerWidth < 850 ? 'justify-content-center' : 'justify-content-center'} col-lg-3 mt-4 mt-lg-0`}>
                                            <div className={`mx-2 d-flex ${window.innerWidth < 850 ? 'justify-content-between w-100' : 'w-100 justify-content-between'}`}>
                                                <button className="btn btn-danger minus"  onClick={() => handleDecreaseQuantity(item.productId)}>-</button>
                                                <span className="px-2 py-0 align-items-center justify-content-center mx-2 d-flex count d-inline border rounded-2 w-100 text-center">{item.quantity}</span>
                                                <button className="btn btn-primary plus" disabled={item.stock === item.quantity ? true : false} onClick={() => handleIncreaseQuantity(item.productId)}>+</button>
                                            </div>
                                        </div>
                                        <div className="col-1 d-flex justify-content-center col-lg-3 mt-4 mt-lg-0">
                                            <button className='border rounded-3 p-1' onClick={() => dispatch(removeCartItem(item.productId))}>
                                               <MdDelete fontSize='1.5rem' color='red' />
                                            </button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                {calculateSubtotal().itemsDetail.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-between">
                                        <p>{`${item.name} (${item.quantity}x)`}</p>
                                        <p>{formatCurrency(item.itemTotal)}</p>
                                    </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className='m-0 order-summary-values'>Total:</p>
                                    <p className='m-0  order-summary-values'>{formatCurrency(calculateSubtotal().grandTotal)}</p>
                                </div>
                                <hr />
                                <button id="checkout_btn" onClick={ checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Cart;
