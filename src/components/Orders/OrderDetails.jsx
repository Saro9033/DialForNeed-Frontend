import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loginAuthUser } from '../../slices/authSlice';
import { getOrderDetail, orderDetail, orderStatus } from '../../slices/orderSlice';

const OrderDetails = () => {
    const { id } = useParams();
    const LoginAuthUser = useSelector(loginAuthUser);
    const OrderDetail = useSelector(orderDetail);
    const OrderStatus = useSelector(orderStatus);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrderDetail(id));
    }, [dispatch, id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className='container' style={{ minHeight: '100vh' }}>
            <div className="row mt-5 d-flex justify-content-between mb-5">
                <div className="col-12 col-lg-8 mb-4 order-confirm">
                    <div id="order_summary" className="table-responsive mb-4">
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
                            <h4>Ordered Items</h4>
                            <hr />
                            {OrderStatus === "loading" ? (
                                <div className="d-flex align-items-start justify-content-center">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                <>
                                   <div className="table-responsive mb-4">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {OrderDetail?.orderItems?.map((item, index) => (
                <tr key={index} className="align-middle">
                  <td style={{width:'fit-content'}}>
                    <Link to={`/product/${item.productId._id}`} style={{ color: 'unset', textDecoration: 'none' }}>
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={item.productId.images[0]?.image}
                          alt={item.productId.name}
                          width="50"
                          className="border rounded-3 me-3"
                          style={{ objectFit: 'cover' }}
                        /> 
                        <span>{`${item.productId.name} (${item.quantity}x)`}</span>
                      </div>
                    </Link>
                  </td>
                  <td>{formatCurrency(item.productId.price)}</td>
                  <td>{item.productId?.type}</td>
                  <td style={{ fontWeight: '700' }} className={item.status.toLowerCase().includes('pending') ? 'text-danger' : 'text-success'}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
                                </>
                            )}
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div id="order_summary">
                        <div className='d-flex align-items-center justify-content-between'>
                            <h4>Payment</h4>

                            <h5 className={`m-0 ${OrderDetail?.paymentInfo?.status?.includes("Success") || OrderDetail?.paymentInfo?.status?.includes("success") ? 'text-success' : 'text-danger'}`}>
                                {OrderDetail?.paymentInfo?.status}
                            </h5>
                        </div>
                        <hr />
                        <p>Total Amount: <span className="order-summary-values">{formatCurrency(OrderDetail?.totalPrice)}</span></p>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
