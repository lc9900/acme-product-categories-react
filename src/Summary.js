import React from 'react';

export default function Summary (props) {
    const {products, categories} = props;
    return (
        <div className='col-sm-3'>
            <div className='panel panel-default'>
                <div className='panel-heading'>Product Summary</div>
                <div className='panel-body'>
                    <ul className='list-group'>
                        <li className='list-group-item'>There are {products.length} products</li>
                        <li className='list-group-item'>
                            Categories:
                            <ul>
                                { categories.map(category => {
                                    return (
                                        <li key={category.id}>
                                            {category.name} has <strong>{category.products.length}</strong> Products
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
