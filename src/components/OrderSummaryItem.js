import React from 'react'

const OrderSummaryItem = ({item}) => {
    return (
        <div className="order-summary-item">
            <div className="order-summary-desc">
            <p>{item.name}</p>
    <p>Qty: {item.amount }</p>
            </div>
    <p>${item.amount * item.price}</p>
        </div>
    )
}

export default OrderSummaryItem
