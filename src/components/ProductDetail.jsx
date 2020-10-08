import React, {useState, useEffect} from 'react';

import './ProductDetail.scss';

export default function ProductDetail(props) {

	const id = props.match.params.id;
	const [itemInfo, setItemInfo] = useState({});
	const [price, setPrice] = useState([]);

	useEffect(() => {
		async function fetchData(){
			try {
				const response = await fetch(`http://localhost:3001/api/items/${id}`);
				const responseData = await response.json();
				setItemInfo(responseData.item);
				setPrice(responseData.item.price);
			}
			catch (error) {
				 console.error(error);
			 }
		}
		fetchData();
	}, [id]);

	return(
		<div className="container">
			<div className="row">
				<div className="col-md-10 col-md-offset-1 product-item">
					<div className="product-item-detail">

						<div className="row">
							<div className="col-md-8">
								<figure>
									<img src={itemInfo.picture} alt="Product" />
								</figure>
							</div>
							<div className="col-md-4 item-data">
								<p className="product-condition">{itemInfo.condition !== 'new' ? 'Usado' : 'Nuevo'} - {itemInfo.sold_quantity} vendidos</p>
								<h2 className="product-title">{itemInfo.title}</h2>
								<h3 className="product-price">{price.currency !== 'ARS' ? 'U$D' : '$'} {price.amount} {price.decimals}</h3> 
								
								<button>Comprar</button>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12 description">
								<h4>Descripción del producto</h4>
								<p>{itemInfo.description}</p>
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>
	);
};