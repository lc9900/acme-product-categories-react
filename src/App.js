import React, {Component} from 'react';
import axios from 'axios';
import Summary from './Summary';
import ProductForm from './ProductForm';

export default class App extends Component {
    constructor(){
        super();
        this.state = {
            products: [],
            categories: [],
            retrieved: false
        }
        this.getAll = this.getAll.bind(this);
    }

    getAll(){
        Promise.all([
            axios.get('/api/products'),
            axios.get('/api/categories')
        ])
        .then(results => results.map(result => result.data))
        .then(([products, categories]) => {
            this.setState({ products, categories});
        });
    }

    componentDidMount(){
        Promise.all([
            axios.get('/api/products'),
            axios.get('/api/categories')
        ])
        .then(results => results.map(result => result.data))
        .then(([products, categories]) => {
            this.setState({ products, categories});
        });
    }

    render(){
        console.log(this.state.products);
        return (
            <div className='container'>
                <h1>Acme Product/Categories React</h1>
                <div className='row'>
                    <ProductForm getAll={this.getAll} categories={this.state.categories}/>
                    <Summary products={this.state.products} categories={this.state.categories} />
                </div>
            </div>
        );
    }
}
