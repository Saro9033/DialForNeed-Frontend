import React, { useContext, useEffect } from 'react'
import CheckOutSteps from './CheckOutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, loginAuthUser } from '../../slices/authSlice'
import { cartItems } from '../../slices/CartSlice'
import { useNavigate } from 'react-router-dom'
import { SidebarContext } from '../../context/SidebarContext'
import API from '../../API'

const ConfirmOrder = () => {
    

    const LoginAuthUser = useSelector(loginAuthUser)
    const CartItems = useSelector(cartItems);
  const navigate = useNavigate()

    //Shipping price

    const calculateSubtotal = () => {
        let grandTotal = 0;
        const itemsDetail = CartItems.map(item => {
            const itemTotal = item.price * item.quantity;
            grandTotal += itemTotal;
            return {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image:item.image,
                itemTotal
            };
        });
        return { itemsDetail, grandTotal };
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const processPayment = () =>{
        const data = {
            itemsPrice:formatCurrency(calculateSubtotal().grandTotal),
            totalPrice: formatCurrency(calculateSubtotal().grandTotal)
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
       navigate('/payment')
    }
    return (
        <>

            <div className='container' style={{ marginTop: '130px', minHeight: '100vh' }}>
                <CheckOutSteps confirmOrder={true} />
                <div className="row mt-5 d-flex justify-content-between mb-5">
                    <div className="col-12 col-lg-8 mb-4 order-confirm">
                        <div id="order_summary" class="table-responsive mb-4">
                            <h4 className="mb-3">Shipping Info</h4>
                            <hr />
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td><b>Name</b></td>
                                        <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.name}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.email}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Phone Number</b></td>
                                        <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Address</b></td>
                                        <td>:&nbsp;&nbsp;&nbsp;&nbsp;{LoginAuthUser?.address}, {LoginAuthUser?.city}, {LoginAuthUser?.country}, {LoginAuthUser?.postalCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>

                    <div className='row m-0 mb-4'>
                        <div id="order_summary">
                            <h4>Your Cart Items</h4>
                            <hr />
                            {calculateSubtotal().itemsDetail.map((item, index) => (
                                <div key={index} className="m-3 d-flex justify-content-between align-items-center">
                                    <img src={item.image} alt={item.image} width="100" className='border rounded-3' style={{objectFit:'cover'}} />
                                    <p className='m-0'>{`${item.name} (${item.quantity}x)`}</p>
                                    <p className='m-0'>{formatCurrency(item.itemTotal)}</p>
                                </div>
                            ))}
                            <hr />
                            <div className="m-3 d-flex justify-content-between align-items-center">
                                <p className='m-0 order-summary-values'>Total:</p>
                                <p className='m-0  order-summary-values'>{formatCurrency(calculateSubtotal().grandTotal)}</p>
                            </div>  
                        </div>
                    </div>

                    </div>
                    <div className="col-12 col-lg-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{formatCurrency(calculateSubtotal().grandTotal)}</span></p>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='m-0 order-summary-values'>Total:</p>
                                <p className='m-0  order-summary-values'>{formatCurrency(calculateSubtotal().grandTotal )}</p>
                            </div>                            <hr />
                            <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                        </div>
                    </div>


                </div>
            </div></>
    )
}

export default ConfirmOrder