import React from 'react'
import successImg from '../../assets/success.png'
const PaymentSuccess = () => {
  return (
    <div className="container container-fluid d-flex align-itmes-center justify-content-center" style={{minHeight:'100vh'}} >
        <div className="row justify-content-center align-items-center">
            <div className="col-6 col-lg-8 mt-5 text-center ">
                <img className="mt-5 mb-3 img-fluid d-block mx-auto" src={successImg} alt="Order Success" width="200" height="200" />

                <h3 className='w-100'> Your Order has been placed successfully.</h3>

                <a href="/my-orders" className='btn btn-success'>Go to Orders</a>
            </div>
        </div>
    </div>
  )
}

export default PaymentSuccess