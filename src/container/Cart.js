import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import Navbar from './Navbar';
import Log from '../component/Log';

class Cart extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(firebaseConfig);
        this.state = {
            listProduct: []
        }
    }

    getDataFromServerAPI = () => {
        let ref = firebase.database().ref("/cartLog");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    componentDidMount() {
        this.getDataFromServerAPI();
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="box">
                        <div className="row">
                            {
                                this.state.listProduct.map(product => {
                                    return <Log key={product.uid} title={product.title} description={product.description} price={product.price} idProduct={product.uid} selectItem={this.getSelectedItem} />
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default Cart;