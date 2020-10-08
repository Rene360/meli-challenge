import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../clientAssets/Logo_ML.png';

import './SearchBar.scss';

export function SearchBar(props) {

	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		props.onSubmit(searchValue);
	};

	return(
		<div className="search-bar">
			<div className="container">
				<div className="row">
					<div className="col-md-10 col-md-offset-1">

						<div className="brand-logo">
							<Link to={'/'}>
								<img src={logo} alt="Logo Mercado Libre" />
							</Link>
						</div>

						<div className="search">
							<form onSubmit={(event) => handleSubmit(event)}>
								<input type="text" placeholder="Nunca dejes de buscar" onKeyUp={(e) => setSearchValue(e.target.value)}/>
								<button type="submit"/>
							</form>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}