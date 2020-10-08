const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();

app.use(cors());

app.get('/api/items', async (req, res) => {
	try {
		const items = await getItemsList(req.query.q)
		res.json(items)
	}
	catch(error) {
		res.status(500).send(error)
	}
});

app.get('/api/items/:id', async (req, res) => {
	try {
		const items = await getItemDetail(req.params.id)
		res.json(items)
	}
	catch(error) {
		res.status(error.status).send(error)
	}
});

app.listen(3001, () => {
    console.log('Server started in port 3001');
});

const requestPromise = (url) => {
	const res = new Promise((resolve, reject) => {
		let body = '';
		https.get(url, (response) => {
			response.on('data', (chunk) => {
				body += chunk;
			});
			response.on('end', () => {
				resolve(JSON.parse(body));
			})
		}).on('error', (error) => reject(error));
	})
	return res;
};

async function getItemsList(query) {
		try {
			const response = await requestPromise(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
			const author = {
				name: 'Favio',
				lastname: 'Dos Santos'
			};

			const categories = response.filters.length && response.filters[0].values ? response.filters[0].values[0].path_from_root.map((elem) => elem.name) : [];
			
			const items = response.results.map((item) => {
				const [amount, decimals] = item.price.toString().split('.');
				return {
					id: item.id,
					title: item.title,
					price: {
						currency: item.currency_id,
						amount: parseInt(amount),
						decimals: parseInt(decimals)
					},
					picture: item.thumbnail,
					condition: item.condition,
					address: item.address.city_name,
					free_shipping: item.shipping.free_shipping
				}
			});

			return {
				author,
				categories,
				items
			}
		}
		catch(error) {
			console.error('Response failed', error);
		}
};

async function getItemDetail(query) {
	try{
		const responses = await Promise.all([requestPromise(`https://api.mercadolibre.com/items/${query}`), requestPromise(`https://api.mercadolibre.com/items/${query}/description`)]);
		responses.forEach(resp => (resp));
		
		const [item, description] = responses;
		const [amount, decimals] = item.price.toString().split('.');
		return {
			author: {
				name: 'Favio',
				lastname: 'Dos Santos'
			},
			item: {
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id,
					amount: parseInt(amount),
					decimals: parseInt(decimals)
				},
				picture: item.thumbnail,
				condition: item.condition,
				free_shipping: item.shipping.free_shipping,
				sold_quantity: item.sold_quantity,
				description: description.plain_text
			}
		}

	}
	catch(error) {
		console.error('Response failed', error);
	}
};