import React from 'react'
import img from '../container/item1.jpg';

const Log = (props) => {
    return (
        <div class="container">
            <ul class="list-group">
                <li class="list-group-item">Pesanan sepatu {props.title} seharga {props.price} masih dalam proses.</li>
            </ul>
        </div>
    )
}

export default Log;