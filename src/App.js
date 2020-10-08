import React, { useState } from 'react';
import { SearchBar } from "./components/SearchBar";
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProductDetail from "./components/ProductDetail";
import Message from "./components/Message";
import ProductList from './components/ProductList';

import './App.scss';

function App() {
	let history = useHistory();
	const [results, setResults] = useState([]);

	async function getResults(query) {
		try {
			const response = await fetch(`http://localhost:3001/api/items?q=${query}`);
			const responseData = await response.json();
			setResults(responseData);
			history.push(`/items?search=${query}`);
		}
		catch (error) {
			console.error(error);
			setResults({error: 'Connection lost'});
		}
	}

	return (
		<div className="App">
			<SearchBar onSubmit={(query) => getResults(query)}/>
			
				<Switch>
					<Route exact path="/items">
					{
						results.error ?
							<Message error={true} message={'No se encontraro el producto.'}/>
							: results.items ? results.items.length ?
							<ProductList categories={results.categories} items={results.items}/>
							: <Message error={false} message={'No se encontraron resultados.'}/>
							: <Redirect to={"/"}/>
					}
					</Route>
					<Route path="/items/:id" component={ProductDetail} />
				</Switch>
		</div>
	);
}

export default App;
