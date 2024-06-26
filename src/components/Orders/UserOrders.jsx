import React, { useEffect } from 'react';
import MetaData from '../Layouts/MetaData';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder, orderStatus, userOrders } from '../../slices/orderSlice';
import { Link } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';

const UserOrders = () => {
    const UserOrdersDta = useSelector(userOrders);
    const dispatch = useDispatch();
    const OrderStatus = useSelector(orderStatus)

    useEffect(() => {
        dispatch(getUserOrder());
    }, [dispatch]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Number of Items",
                    field: "numOfItems",
                    sort: "asc"
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc"
                },
                {
                    label: "Ordered on",
                    field: "date",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                }
            ],
            rows: []
        };
        UserOrdersDta.forEach(userOrder => {
            data.rows.push({
                id: userOrder._id,
                numOfItems: userOrder.orderItems.length,
                amount: formatPrice(userOrder.totalPrice),
                date: new Date(userOrder.createdAt).toLocaleDateString(),
                actions: <Link to={`/order/${userOrder._id}`} className='btn btn-primary'><FaRegEye /></Link>
            });
        });
        return data;
    };

    return (
        <>
            <MetaData title="My Orders" />
            <Container style={{ minHeight: '100vh'}}>
                <> {OrderStatus === "loading"
                    ?
                    <div className="d-flex align-items-start justify-content-center"><div className="loader"></div> </div>
                    :
                   ( OrderStatus === "succeeded" && UserOrdersDta.length==0) ?
                   <h1>No Orders Placed</h1> :
                    <>  <Row className="mt-4">
                        <Col>
                            <h2>My Orders</h2>
                        </Col>
                    </Row>
                        <Row>
                            <Col>
                                <div className="table-responsive">
                                    <MDBDataTable
                                        className="px-3"
                                        bordered
                                        striped
                                        hover
                                        searching={false}

                                        responsive // This makes the table responsive
                                        data={setOrders()}
                                    />
                                </div>
                            </Col>
                        </Row></>
                }  </>
            </Container>
        </>
    );
};

export default UserOrders;
