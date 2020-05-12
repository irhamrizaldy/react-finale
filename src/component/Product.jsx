import React from 'react'
import img from '../container/item1.jpg';

const Product = (props) => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src={img} />
            <div className="card-body">
                <h5 className="card-title" style={{ fontFamily: 'arial' }} >{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p><b>{props.price}</b></p>
                <button className="btn btn-light" onClick={() => { props.selectItem(props.idProduct) }}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Product;