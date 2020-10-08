import React from 'react';
import ProductItem from "./ProductItem";
import Breadcrumb from "./Breadcrumb";

import './ProductList.scss';

export default function ProductList(props){
	return(
		<div className="container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<Breadcrumb categories={props.categories}/>
				</div>
				<div className="col-md-10 col-md-offset-1">
					<div className="product-item-list">
						{props.items.slice(0,4).map((item, index) => 
							<ProductItem key={index} info={item} categories={props.categories}/>
						)}
					</div>
				</div>
			</div>
		</div>
	);  
}