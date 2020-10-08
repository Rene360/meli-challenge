import React from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import freeShipping from '../clientAssets/ic_shipping.png';
import * as utils from '../utils';

import './ProductItem.scss';


export default function ProductItem({info, categories}) {

  return(
		<div className="product-item">
			<div id={info.id}>
				<Link to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
					<img src={info.picture} className="product-image" alt={info.title} />
				</Link>

				<div className="info-item">
					<p>
						<span>
							{utils.formatPrice(info.price)}
							{info.price.decimals ? <span className="decimal">{info.price.decimals}</span> : null}
						</span>
						{info.free_shipping ? <img src={freeShipping} alt="Icon free shipping" /> : null}
					</p>

					<Link to={{pathname: `/items/${info.id}`, itemInfo: info, categories: categories}}>
						<p className="title">{info.title}</p>
					</Link>
				</div>

				<div className="city">
					<p>{info.address}</p>
				</div>
			</div>
		</div>
	);
}

ProductItem.propTypes = {
	categories: PropTypes.array.isRequired,
};