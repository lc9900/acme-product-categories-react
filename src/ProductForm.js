import React, {Component} from 'react';
import axios from 'axios';

export default class ProductForm extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            price: 0,
            inStock: true,
            categoryId: ''
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onInStockChange = this.onInStockChange.bind(this);
        this.onProductSubmit = this.onProductSubmit.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        // Since by default, inStock checkbox is checked, thus the inStock value is also true
        let inStock = newProps.inStock === undefined ? this.state.inStock : newProps.inStock;
        // If the upstream passes in the inStock prop, then inStockChecked will be whatever the inStock prop is.
        // If no inStock prop is passed in, inStockCheck retains its initial value, which is true
        this.setState({
            inStock
        });
    }

    componentDidMount(){
        let inStock = this.props.inStock === undefined ? this.state.inStock : this.props.inStock;
        if (this.props.product) {
            this.setState({
                categoryId: this.props.product.categoryId,
                inStock
            });
        }
        else {
            this.setState({
                inStock
            });
        }
        // Since by default, inStock checkbox is checked, thus the inStock value is also true

        // If the upstream passes in the inStock prop, then inStockChecked will be whatever the inStock prop is.
        // If no inStock prop is passed in, inStockCheck retains its initial value, which is true
    }

    onNameChange(event){
        console.log(event.target.name);
        this.setState({name: event.target.value});
    }

    onPriceChange(event){
        console.log(typeof event.target.value);
        this.setState({ price: event.target.value});
    }

    onInStockChange(event){
        if(event.target.checked){
            // console.log('This is in stock');
            this.setState({inStock: true});
        }
        else {
            // console.log('This is NOT in stock');
            this.setState({inStock: false});
        }
    }

    onSelectChange(event){
        this.setState({categoryId: event.target.value});
    }

    onProductSubmit(event){
        event.preventDefault();
        axios('/api/products', this.state)
            .then(result => {
                console.log('Product submitted');
            })
            .catch(err => { throw err; });
    }

    render(){
        const {categories, product} = this.props;
        return (
            <div className='col-sm-3'>
                <div className='panel panel-default'>
                    {
                        product ? <span></span> : (
                            <div className='panel-heading'>Add a Product</div>
                        )
                    }

                    <div className='panel-body'>
                        <form onSubmit={this.onProductSubmit}>
                            <div className='form-group'>
                                <label>Name</label>
                                <input onChange={this.onNameChange} name='name' className='form-control' value={this.state.name}/>
                            </div>
                            <div className='form-group'>
                                <label>Price</label>
                                <input onChange={this.onPriceChange} name='price' className='form-control' value={this.state.price}/>
                            </div>
                            <div className='form-group'>
                                <label>Instock</label>
                                <br/>
                                <input onChange={this.onInStockChange} name='inStock' type='checkbox' value={this.state.inStock} checked={this.state.inStock}/>
                            </div>
                            <div className='form-group'>
                                <label>Category</label>
                                <select onChange={this.onSelectChange} name='categoryId' className='form-control'>
                                    <option>-- none --</option>
                                    {
                                        categories.map(category => {
                                            let checked = this.state.categoryId === category.id ? true:false;
                                            return (
                                                <option key={categoryId} value={category.id} checked={checked}>{category.name}</option>
                                            );
                                        })
                                    }

                                </select>
                            </div>
                            <div className='form-group'>
                                <button className='btn btn-primary btn-block'>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
