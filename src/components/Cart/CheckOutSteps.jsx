import React from 'react'
import { Link } from 'react-router-dom'

const CheckOutSteps = ({shipping, payment, confirmOrder }) => {
    return (

        <div className="checkout-progress d-flex justify-content-center mt-5">
        {shipping ?
                <Link to="/shipping">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Shipping</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/shipping">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Shipping</div>
                    <div className="triangle-incomplete"></div> </Link>
            }

            {confirmOrder ?
                <Link to="/confirmOrder">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">confirmOrder</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/confirmOrder">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">confirmOrder</div>
                    <div className="triangle-incomplete"></div> </Link>
            }

            {payment ?
                <Link to="/payment">
                    <div className="triangle2-active"></div>
                    <div className="step active-step">Payment</div>
                    <div className="triangle-active"></div> </Link> :
                <Link to="/payment">
                    <div className="triangle2-incomplete"></div>
                    <div className="step incomplete">Payment</div>
                    <div className="triangle-incomplete"></div> </Link>
            }
        </div>
    )
}

export default React.memo(CheckOutSteps)