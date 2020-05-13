import React from 'react'
import img from '../container/item1.jpg';

const Log = (props) => {
    return (
        <div class="App">
            <p>Pesanan produk {props.title} seharga {props.price} masih dalam proses.</p>
        </div>
    )
}

export default Log;