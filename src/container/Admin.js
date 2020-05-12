import React, { Component } from 'react';
import Dashboard from '../component/Dashboard';
import firebase from 'firebase';
import firebaseConfig from '../firebase/config';

class Admin extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(firebaseConfig);

        this.state = {
            listProduct: []
        }
    }

    getDataFromServerAPI = () => {
        let ref = firebase.database().ref("/product");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    saveDataServerAPI = () => {
        firebase.database()
            .ref("/product")
            .set(this.state);
    }

    componentDidMount() {
        this.getDataFromServerAPI();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.saveDataServerAPI();
        }
    }

    handleDeleteItem = (idProduct) => {        // fungsi yang meng-handle button action hapus data
        const { listProduct } = this.state;
        const newState = listProduct.filter(data => {
            return data.uid !== idProduct;
        });
        this.setState({ listProduct: newState });
    }

    handleSave = (event) => {
        let title = this.refs.judulProduk.value;
        let description = this.refs.deskripsiProduk.value;
        let price = this.refs.hargaProduk.value;
        let uid = this.refs.uid.value;

        if (uid && title && description && price) {
            const { listProduct } = this.state;
            const indeksProduk = listProduct.findIndex(data => {
                return data.uid === uid;
            });
            listProduct[indeksProduk].title = title;
            listProduct[indeksProduk].description = description;
            listProduct[indeksProduk].price = price;
            this.setState({ listProduct });
        } else if (title && description && price) {
            const uid = new Date().getTime().toString();
            const { listProduct } = this.state;
            listProduct.push({ uid, title, description, price });
            this.setState({ listProduct });
        }

        this.refs.judulProduk.value = "";
        this.refs.deskripsiProduk.value = "";
        this.refs.hargaProduk.value = "";
        this.refs.uid.value = "";
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Add Product
                            </h3>
                    </div>
                    <div class="panel-body">
                        <form>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" id="title" name="title" placeholder="Title" ref="judulProduk" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textArea class="form-control" id="description" name="description" ref="deskripsiProduk" cols="80" rows="3" />
                            </div>
                            <div class="form-group">
                                <label for="author">Price:</label>
                                <input type="text" class="form-control" id="price" name="price" ref="hargaProduk" placeholder="Price" />
                            </div>
                            <input type="hidden" name="uid" ref="uid" />
                            <button type="submit" class="btn btn-primary" onClick={this.handleSave}>Submit</button>
                        </form>
                    </div>
                </div>
                <h2>List Product</h2>
                {
                    this.state.listProduct.map(product => {
                        return <Dashboard key={product.uid} title={product.title} description={product.description} price={product.price} idProduct={product.uid} deleteItem={this.handleDeleteItem} />
                    })
                }
            </div>

        );
    }
}

export default Admin;