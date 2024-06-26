import React from 'react'
import {  Col, Card, Button } from 'react-bootstrap';
import StarRating from '../../utils/StartRating';
import { Link } from 'react-router-dom';

const Product = ({product, lg}) => {
  return (
     <Col key={product.id} xs={12} sm={6} md={6} lg={lg} className="my-3 d-flex">
            

    <Card className="p-3 h-100 w-100">
        <Card.Img variant="top" src={product?.images[0]?.image} className="mx-auto" />
        <Card.Body className="d-flex flex-column px-0 mx-0">
            <Card.Title>
                <h5 className="card-title">
                <Link style={{textDecoration:'none'}} to={`/product/${product._id}`}>{product.name} </Link> 
                </h5>
            </Card.Title>
            <div className="mt-auto">
                <div className='d-flex align-items-center justify-content-start'>
                {product.reviews.length > 0 && <>  <StarRating rating={product.ratings} />
                    <span id="no_of_reviews">({product.reviews.length} Reviews)</span> </> }
                </div>
                
                <Card.Text>₹{product.price}</Card.Text>
                <Link style={{textDecoration:'none', color:'unset'}} to={`/product/${product._id}`}> 
                 <Button  id="view_btn" className="btn btn-block">View Details</Button></Link> 
            </div>
        </Card.Body>
    </Card>
   
</Col>
  )
}

export default React.memo(Product)