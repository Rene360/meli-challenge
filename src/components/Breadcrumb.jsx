import React from 'react';
import PropTypes from "prop-types";

import './Breadcrumb.scss';

export default function Breadcrumb({ categories }){
	return(
		<ul className="cnt-breadcrumb">
			{categories ? categories.map((category, index) =>
				<li 
					className="breadcrumb"
					key={index}>
					{category}
					{index !== categories.length - 1 ? <i/> : ''}
				</li>
			) : ''}
		</ul>
	)
}

Breadcrumb.propTypes = {
	categories: PropTypes.array.isRequired,
};