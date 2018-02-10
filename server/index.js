const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const validator = require('validator');
const redis = Promise.promisifyAll(require('redis'));
const shortid = require('shortid');

const app = express();
const client = redis.createClient(6379);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/new', async (req,res) => {
	//let value = await client.getAsync(req.query);
	let results = true;
	let id = shortid.generate();
	let input = req.query.input;

	console.log(id, input);
	if(!validator.isURL(input)) {
		results = false; 
		id = null;
	} else {
		await client.setAsync(id, input)	  	
	}

	res.json({ results, id, input });
});

app.get('/:id', async (req,res) => {
	let URL = await client.getAsync(req.params.id);

	if(!URL) {
		res.send('Not A Valid URL');
		return;
	}

	const hasHyperlink = URL.slice(0,7) === 'http://' || URL.slice(0,8) === 'https://';

	if(!hasHyperlink) {
		URL = 'http://' + URL;
	}
	
	res.statusCode = 302;
	res.setHeader('Location', URL);
	res.end();	
});
app.listen(process.env.PORT || 3000);