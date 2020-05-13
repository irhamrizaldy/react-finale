import React, { Component } from 'react';
import Product from '../component/Product';
import firebase from 'firebase';
import firebaseConfig from '../firebase/config';
import { Input } from 'mdbreact';

class Home extends Component {
    constructor(props) {
        super(props);
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.state = {
            listProduct: [],
            search: ''
        }
    }

    getDataFromServerAPI = () => {
        let ref = firebase.database().ref("/product");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    onChange = e => {
        this.setState({ search: e.target.value })
    }

    getSelectedItem = (idProduct) => {
        const { listProduct } = this.state;
        const newState = listProduct.filter(data => {
            return data.uid == idProduct;
        });
        this.setState({ listProduct: newState });
        firebase.database().ref("/cartLog").child('/listProduct').set(newState);
        console.log(newState);
    }

    componentDidMount() {
        this.getDataFromServerAPI();
    }

    render() {
        const { search } = this.state;


        return (
            <div className="container">
                <div class="md-form form-group w-50 mx-auto">
                    <Input hint="Search Product" onChange={this.onChange} />
                </div>
                <div className="box">
                    <div className="row">
                        {
                            this.state.listProduct.map(product => {
                                if (search !== "" && product.title.toLowerCase().indexOf(search.toLowerCase()) === -1) {
                                    return null;
                                }
                                return <Product key={product.uid} title={product.title} description={product.description} price={product.price} idProduct={product.uid} selectItem={this.getSelectedItem} />
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;