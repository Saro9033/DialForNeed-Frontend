import React, { Fragment, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Products, fetchProducts, productError, productStatus } from '../slices/ProductsSlice';
import MetaData from './Layouts/MetaData';
import { renderContent } from '../utils/getContent'; // Import the renderContent function
import Product from './Products/Product';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const data = useSelector(Products);
    const status = useSelector(productStatus);
    const error = useSelector(productError);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            const toastId = `login-error-${error}`;
            if (!toast.isActive(toastId)) {
                toast.error(error, {
                    position: 'top-center',
                    toastId: toastId,
                });
            }
            return
        }
        dispatch(fetchProducts({keyword:null,price:null,categoryId:null, type:null,ratings:null}));
    }, [error,dispatch]);


    const renderSuccess = (data) => (
        <Row className='d-flex align-items-center justify-content-center'>
            {data && data.map((product) => (
             <Product lg={3} key={product._id} product={product} /> 
            ))}
        </Row>
    );
    
    console.log(data);
    
    return (
        <Fragment >
            <MetaData title="Home" />
            <Container id="products" className="mt-2" style={{minHeight:'100vh'}}>
                <h3 id="products_heading">Latest Products</h3>
                {renderContent(status, data, error, renderSuccess)}
            </Container>
        </Fragment>
    );
};

export default Home;
